const { chromium } = require("playwright")

;(async () => {
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  const page = await context.newPage()
  const month = "jul"
  const year = 2024 // Cambia esto al mes deseado en formato inglés
  const url = `https://www.releases.com/hot/games/${year}-${month}`

  await page.goto(url)

  // Obtener los juegos lanzados en el mes deseado
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

      const release_date =
        document.querySelector(".RWP-Product-ReleaseInfoView-HLPanel h3")
          ?.innerText || null // TBA release

      const platformsElements = document.querySelectorAll(
        ".RWP-Product-ReleaseInfoView-Item"
      )
      const platforms = Array.from(platformsElements)
        .map((el) => el.innerText.trim()) // Extraer el texto de cada elemento
        .filter((text) => text) // Filtrar posibles textos vacíos
        .join(", ")

      console.log(url)
      return {
        name,
        description,
        // developer,
        // publisher,
        platforms,
        release_date,
        img,
        trailer,
        url,
      }
    })

    games.push(game)
  }

  console.log(games)

  await context.close()
  await browser.close()
})()