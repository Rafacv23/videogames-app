import { getCurrentMonthAndYear } from "@/lib/utils"
import { redirect } from "next/navigation"

export default async function Releases() {
  const year = getCurrentMonthAndYear().year
  const month = getCurrentMonthAndYear().month

  if (year && month) {
    redirect(`/releases/${year}/${month}`)
  }
}
