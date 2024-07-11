import { getCurrentMonthAndYear } from "@/lib/utils"
import { redirect } from "next/navigation"

export default async function Watch() {
  const year = getCurrentMonthAndYear().year

  if (year) {
    redirect(`/watch/${year}`)
  }
}
