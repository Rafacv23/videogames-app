import { turso } from "@/lib/turso"
import { NextResponse } from "next/server"

export const revalidate = 60

export async function GET(request: Request, context: any) {
  try {
    let { year, month, platformId } = context.params

    platformId = platformId.toLowerCase()

    month = month.padStart(2, "0")

    // Ajustamos la consulta SQL para filtrar por año y mes en release_date
    const sql = `
    SELECT Games.*, GROUP_CONCAT(Platforms.name) as platforms
    FROM Games
    LEFT JOIN Games_Platforms ON Games.id = Games_Platforms.game_id
    LEFT JOIN Platforms ON Games_Platforms.platform_id = Platforms.id
    WHERE Platforms.id LIKE '${platformId}' AND Games.release_date LIKE '${year}-${month}%'
    GROUP BY Games.id
    ORDER BY Games.release_date
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
