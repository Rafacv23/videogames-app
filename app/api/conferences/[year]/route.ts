import { turso } from "@/lib/turso"
import { NextResponse } from "next/server"

export const revalidate = 60

export async function GET(request: Request, context: any) {
  try {
    let { year } = context.params

    // Ajustamos la consulta SQL para filtrar por año y mes en release_date
    const sql = `
      SELECT * FROM Games
      INNER JOIN Games_Conferences ON Games.id = Games_Conferences.game_id
      INNER JOIN Conferences ON Games_Conferences.conference_id = Conferences.id
      WHERE Conferences.release_date LIKE '${year}%'
      GROUP BY Games.id, Games.name, Games.release_date, Games.publisher, Games.developer, Games.description, Conferences.name, Conferences.release_date, Conferences.url
      ORDER BY Conferences.release_date DESC
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
