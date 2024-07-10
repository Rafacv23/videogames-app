import { turso } from "@/lib/turso"
import { NextResponse } from "next/server"

export const revalidate = 60

export async function GET(request: Request, context: any) {
  try {
    const currentDate = new Date().toISOString().split("T")[0]

    const sql = `
    SELECT * FROM Conferences
    WHERE Conferences.release_date >= '${currentDate}'
    GROUP BY Conferences.id
    ORDER BY Conferences.release_date
    LIMIT 3
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
