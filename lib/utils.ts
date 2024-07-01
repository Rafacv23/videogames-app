import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentMonthAndYear(): { month: string; year: number } {
  const date = new Date()
  const year = date.getFullYear()
  const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ]
  const month = monthNames[date.getMonth()] // getMonth() returns 0-11

  return { month, year }
}
