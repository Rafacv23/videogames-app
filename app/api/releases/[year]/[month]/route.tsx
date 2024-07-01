import { turso } from "@/lib/turso"
import { NextResponse } from "next/server"

export async function GET(request, context) {
  try {
    const { year, month } = context.params
    const sql = `SELECT * FROM Games`

    const data = await turso.execute(sql)

    const response = {
      games: data.rows,
    }

    return NextResponse.json(response)
  } catch (err) {
    return NextResponse.error
  }
}
