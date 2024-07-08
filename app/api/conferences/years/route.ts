import { turso } from "@/lib/turso"
import { NextResponse } from "next/server"

export const revalidate = 60

export async function GET(request: Request, context: any) {
  try {
    // Ajustamos la consulta SQL para filtrar por año y mes en release_date
    const sql = `
      SELECT DISTINCT strftime('%Y', release_date) as year
      FROM Conferences
      ORDER BY year ASC
    `

    const data = await turso.execute(sql)

    const response = {
      years: data.rows,
    }

    return NextResponse.json(response)
  } catch (err) {
    console.error(err)
    return NextResponse.error()
  }
}
