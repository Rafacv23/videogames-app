import { turso } from "@/lib/turso"
import { NextResponse } from "next/server"

export const revalidate = 60

export async function GET(request: Request, context: any) {
  try {
    const { gameId } = context.params

    const sql = `
            SELECT * FROM Games
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

    console.log(response)

    return NextResponse.json(response)
  } catch (err) {
    console.error("Database query failed:", err)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
