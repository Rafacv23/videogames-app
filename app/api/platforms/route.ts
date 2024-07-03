import { turso } from "@/lib/turso"
import { NextResponse } from "next/server"

export const revalidate = 3600

export async function GET() {
  try {
    const sql = `SELECT * FROM Platforms`

    const data = await turso.execute(sql)

    if (data.rows.length === 0) {
      return NextResponse.json({ message: "No platforms found" })
    }

    const processedData = data.rows.map((platform) => {
      return {
        id: platform.id,
        name: platform.name,
        img: platform.img,
        url: platform.url,
        release_date: platform.release_date,
        manufacturer: platform.manufacturer,
      }
    })

    const response = {
      platforms: processedData,
    }

    return NextResponse.json(response)
  } catch (err) {
    console.error(err)
    return NextResponse.error()
  }
}
