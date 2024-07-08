import { turso } from "@/lib/turso"
import { NextResponse } from "next/server"

export const revalidate = 60

export async function GET(request: Request, context: any) {
  try {
    let { year, conferenceId } = context.params

    // Ajustamos la consulta SQL para filtrar por año y mes en release_date
    const sql = `
      SELECT 
        Games.*, 
        GROUP_CONCAT(DISTINCT Platforms.name) as platforms,
        Conferences.name as conference_name,
        Conferences.release_date as conference_date,
        Conferences.url as conference_url
      FROM Games
      LEFT JOIN Games_Platforms ON Games.id = Games_Platforms.game_id
      LEFT JOIN Platforms ON Games_Platforms.platform_id = Platforms.id
      INNER JOIN Games_Conferences ON Games.id = Games_Conferences.game_id
      INNER JOIN Conferences ON Games_Conferences.conference_id = Conferences.id
      WHERE Conferences.release_date LIKE '${year}%' AND Conferences.id LIKE '${conferenceId}%'
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
