import { turso } from "@/lib/turso"
import { NextResponse } from "next/server"

export const revalidate = 60

export async function GET(request: Request, context: any) {
  try {
    let { year, month } = context.params

    month = month.padStart(2, "0")

    // Ajustamos la consulta SQL para filtrar por año y mes en release_date
    const sql = `
    SELECT * FROM Games
    WHERE Games.release_date LIKE '${year}-${month}%'
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
