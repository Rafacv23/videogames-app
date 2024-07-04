import { turso } from "@/lib/turso"
import { NextResponse } from "next/server"

export const revalidate = 60

export async function GET(request: Request, context: any) {
  try {
    const { gameId } = context.params

    const sql = `
            SELECT Games.*, GROUP_CONCAT(Platforms.name) as platforms
    FROM Games
    LEFT JOIN Games_Platforms ON Games.id = Games_Platforms.game_id
    LEFT JOIN Platforms ON Games_Platforms.platform_id = Platforms.id
    WHERE Games.id = '${gameId}'
    GROUP BY Games.id
    `
    const data = await turso.execute(sql)

    if (!data.rows.length) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 })
    }

    const response = {
      games: data.rows,
    }

    return NextResponse.json(response)
  } catch (err) {
    console.error("Database query failed:", err)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
