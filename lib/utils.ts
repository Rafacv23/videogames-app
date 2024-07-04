import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Game } from "./types"

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
export function convertYoutubeUrl(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  return match && match[2].length === 11 ? match[2] : null
}

export function generateTimeAndDateLink(
  dateString: string,
  timeString?: string
) {
  if (!dateString) return ""

  // Obtener año, mes y día de la fecha
  const [year, month, day] = dateString.split("-")

  // Obtener hora y minutos de la hora si está presente
  let isoDate = `${year}${month}${day}`
  if (timeString) {
    const [hours, minutes] = timeString.split(":")
    isoDate += `T${hours}${minutes}`
  }

  // Construir el enlace completo
  const link = `https://www.timeanddate.com/worldclock/fixedtime.html?iso=${isoDate}`

  return link
}

// Function to sort games based on release date
export const sortGamesByReleaseDate = (games: Game[], order: string) => {
  const sortedGames = [...games]

  sortedGames.sort((a, b) => {
    const dateA = new Date(a.release_date).getTime()
    const dateB = new Date(b.release_date).getTime()

    if (order === "newest") {
      return dateB - dateA
    } else if (order === "oldest") {
      return dateA - dateB
    } else {
      return 0
    }
  })

  return sortedGames
}
