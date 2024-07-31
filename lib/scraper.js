import { chromium } from "playwright"
import { tursoWriter } from "./turso.js"

// Function to convert the game name to snake_case
const generateId = (name) => {
  return name
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9]+/g, "_") // Replace non-alphanumeric characters with underscores
    .replace(/^_+|_+$/g, "") // Remove underscores at the beginning and end
}

;(async () => {
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  const page = await context.newPage()
  const month = "jul"
  const year = 2024 // Change this to the desired month in English format
  const url = `https://www.releases.com/hot/games/${year}-${month}`

  await page.goto(url)

  // Get the games released in the desired month
  const links = await page.evaluate(() => {
    const items = document.querySelectorAll(
      ".RWPCC-CalendarItems-ItemControl-Inner a"
    )
    const linksSet = new Set()

    items.forEach((item) => linksSet.add(item.href))

    return Array.from(linksSet)
  })

  const games = []

  for (let link of links) {
    await page.goto(link)

    const game = await page.evaluate(() => {
      const name = document.querySelector("h1")?.innerText || "No title found"
      const descriptionElement = document.querySelector(
        ".RWP-Product-MainInfoView-SummaryShort"
      )
      const description = descriptionElement
        ? descriptionElement.innerText
        : "No description found"

      const img =
        document.querySelector(".RWP-Product-MainInfoView-Img")?.src || null

      const url =
        document.querySelector(".RWP-Product-MainInfoView-LinksPanel div a")
          ?.href || null

      const trailer =
        document.querySelector(".RWP-Product-MainInfoView-GalleryPanel div")
          ?.dataset.src || null

      const release_date_text =
        document.querySelector(".RWP-Product-ReleaseInfoView-HLPanel h3")
          ?.innerText || null

      // Function to convert the date text to YYYY-MM-DD format
      const formatDate = (dateStr) => {
        if (!dateStr) return null

        const months = {
          January: "01",
          February: "02",
          March: "03",
          April: "04",
          May: "05",
          June: "06",
          July: "07",
          August: "08",
          September: "09",
          October: "10",
          November: "11",
          December: "12",
        }

        const [monthName, day, year] = dateStr.trim().split(" ")
        const monthNumber = months[monthName]
        const dayFormatted = day.replace(",", "").padStart(2, "0")

        return `${year}-${monthNumber}-${dayFormatted}`
      }

      const release_date = formatDate(release_date_text)

      const platformsElements = document.querySelectorAll(
        ".RWP-Product-ReleaseInfoView-Item"
      )
      const platforms = Array.from(platformsElements)
        .map((el) => el.innerText.trim()) // Extract text from each element
        .filter((text) => text) // Filter out empty texts
        .join(", ")

      return {
        name,
        description,
        platforms,
        release_date,
        img,
        trailer,
        url,
      }
    })

    // Generate the game ID based on the name
    const id = generateId(game.name)

    games.push({
      id,
      ...game,
    })
  }

  console.log(games)

  for (const game of games) {
    await tursoWriter.execute({
      sql: `INSERT INTO Games (id, name, description, platforms, release_date, img, trailer, url)
            VALUES (:id, :name, :description, :platforms, :release_date, :img, :trailer, :url)`,
      args: {
        id: game.id,
        name: game.name,
        description: game.description,
        platforms: game.platforms,
        release_date: game.release_date,
        img: game.img,
        trailer: game.trailer,
        url: game.url,
      },
    })
  }

  console.log("Games inserted successfully")

  await context.close()
  await browser.close()
})()
