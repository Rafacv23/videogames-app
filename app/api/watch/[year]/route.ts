import { turso } from "@/lib/turso"
import { NextResponse } from "next/server"

export const revalidate = 60

export async function GET(request: Request, context: any) {
  try {
    let { year } = context.params

    // Ajustamos la consulta SQL para filtrar por año en release_date
    const sql = `
    SELECT * FROM Conferences
    WHERE Conferences.release_date LIKE '${year}%'
    ORDER BY Conferences.release_date
  `

    const data = await turso.execute(sql)

    const response = {
      conferences: data.rows,
    }

    return NextResponse.json(response)
  } catch (err) {
    console.error(err)
    return NextResponse.error()
  }
}
