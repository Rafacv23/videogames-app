import { getCurrentMonthAndYear } from "@/lib/utils"
import { redirect } from "next/navigation"

export default async function Conferences() {
  const year = getCurrentMonthAndYear().year

  if (year) {
    redirect(`/conferences/${year}`)
  }
}
