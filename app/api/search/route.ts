// pages/api/searchGames.js

import { turso } from "@/lib/turso"

export async function GET(request: any) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (!query) {
    return new Response(JSON.stringify({ games: [] }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  try {
    const sql = `
      SELECT 
        Games.*, 
        GROUP_CONCAT(DISTINCT Platforms.name) as platforms
      FROM Games
      LEFT JOIN Games_Platforms ON Games.id = Games_Platforms.game_id
      LEFT JOIN Platforms ON Games_Platforms.platform_id = Platforms.id
      WHERE Games.name LIKE '%${query}%'
      GROUP BY Games.id
      LIMIT 10
    `

    const data = await turso.execute(sql)

    return new Response(JSON.stringify({ games: data.rows }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error fetching games:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
