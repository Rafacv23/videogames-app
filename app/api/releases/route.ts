import { turso } from "@/lib/turso"
import { NextResponse } from "next/server"

export const revalidate = 60

export async function GET(request: Request, context: any) {
  try {
    const currentDate = new Date().toISOString().split("T")[0]

    const sql = `
    SELECT * FROM Games
    WHERE Games.release_date >= '${currentDate}'
    GROUP BY Games.id
    ORDER BY Games.release_date
    LIMIT 3
  `

    const data = await turso.execute(sql)

    const response = {
      games: data.rows,
    }

    return NextResponse.json(response)
  } catch (err) {
    console.error(err)
    return NextResponse.error()
  }
}
