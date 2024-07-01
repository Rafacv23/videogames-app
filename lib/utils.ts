import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentMonthAndYear(): { month: string; year: number } {
  const date = new Date()
  const year = date.getFullYear()
  const monthNames = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ]
  const month = monthNames[date.getMonth()] // getMonth() returns 0-11

  return { month, year }
}
