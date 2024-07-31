import { createClient } from "@libsql/client"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from .env file in the root directory
dotenv.config({ path: path.resolve(__dirname, "../.env") })

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

export const tursoWriter = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN_WRITE,
})

export const checkIfGameExists = async (id) => {
  try {
    const result = await tursoWriter.execute({
      sql: "SELECT COUNT(*) AS count FROM Games WHERE id = :id",
      args: { id },
    })

    //dev console.log("Database result:", result)

    // Verifica el formato del resultado
    if (
      result &&
      Array.isArray(result.rows) &&
      result.rows.length > 0 &&
      "count" in result.rows[0]
    ) {
      return result.rows[0].count > 0
    } else {
      throw new Error("Unexpected result format from database")
    }
  } catch (error) {
    console.error("Error checking if game exists:", error)
    throw error
  }
}

export const insertOrUpdateGame = async (game) => {
  try {
    const exists = await checkIfGameExists(game.id)

    if (exists) {
      await tursoWriter.execute({
        sql: `
          UPDATE Games
          SET name = :name,
              description = :description,
              platforms = :platforms,
              release_date = :release_date,
              img = :img,
              trailer = :trailer,
              url = :url
          WHERE id = :id`,
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
    } else {
      await tursoWriter.execute({
        sql: `
          INSERT INTO Games (id, name, description, platforms, release_date, img, trailer, url)
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
  } catch (error) {
    console.error("Error inserting or updating game:", error)
    throw error
  }
}
