import { siteConfig } from "@/config/site"
import { Conference, Game, Platform } from "./types"

const devURL = "http://localhost:3000"

const productionURL = siteConfig.url

// Function to fetch conferences data
export const fetchConferences = async ({
  year,
  setConferences,
  setNextConference,
}: {
  year: string
  setConferences: React.Dispatch<React.SetStateAction<Conference[]>>
  setNextConference: React.Dispatch<React.SetStateAction<Conference | null>>
}) => {
  const endpoint = `${productionURL}/api/watch/${year}`
  try {
    const res = await fetch(endpoint)
    if (!res.ok) {
      throw new Error("Failed to fetch conferences")
    }
    const data = await res.json()
    setConferences(data.conferences)
    setNextConference(data.conferences[data.conferences.length - 1])
  } catch (error) {
    console.error("Error fetching conferences:", error)
  }
}

// Function to fetch games data
export const fetchGames = async ({
  year,
  setData,
}: {
  year: string
  setData: React.Dispatch<React.SetStateAction<Game[]>>
}) => {
  const endpoint = `${productionURL}/api/conferences/${year}`
  try {
    const res = await fetch(endpoint)
    if (!res.ok) {
      throw new Error("Failed to fetch games")
    }
    const data = await res.json()
    setData(data.games)
  } catch (error) {
    console.error("Error fetching games:", error)
  }
}

export const fetchGamesByConference = async ({
  year,
  conferenceId,
  setData,
}: {
  year: string
  conferenceId: string
  setData: React.Dispatch<React.SetStateAction<Game[]>>
}) => {
  const endpoint = `${productionURL}/api/conferences/${year}/${conferenceId}`
  try {
    const res = await fetch(endpoint)
    if (!res.ok) {
      throw new Error("Failed to fetch games")
    }
    const data = await res.json()
    setData(data.games)
  } catch (error) {
    console.error("Error fetching games:", error)
  }
}

export const fetchGamesByConferenceAndPlatform = async ({
  year,
  conferenceId,
  platformId,
  setData,
}: {
  year: string
  conferenceId: string
  platformId: string
  setData: React.Dispatch<React.SetStateAction<Game[]>>
}) => {
  const endpoint = `${productionURL}/api/conferences/${year}/${conferenceId}/${platformId}`
  try {
    const res = await fetch(endpoint)
    if (!res.ok) {
      throw new Error("Failed to fetch games")
    }
    const data = await res.json()
    setData(data.games)
  } catch (error) {
    console.error("Error fetching games:", error)
  }
}

export const fetchPlatforms = async ({
  setPlatforms,
}: {
  setPlatforms: React.Dispatch<React.SetStateAction<Platform[]>>
}) => {
  const endpoint = `${productionURL}/api/platforms`
  try {
    const res = await fetch(endpoint)
    if (!res.ok) {
      throw new Error("Failed to fetch platforms")
    }
    const data = await res.json()
    setPlatforms(data.platforms)
  } catch (error) {
    console.error("Error fetching platforms:", error)
  }
}

export const fetchWatch = async ({
  year,
  conferenceId,
}: {
  year: string
  conferenceId?: string
}) => {
  const endpoint = `${productionURL}/api/watch/${year}`

  try {
    const res = await fetch(endpoint)

    if (!res.ok) {
      throw new Error("Failed to fetch data")
    }

    const data = await res.json()

    const currentDate = new Date()
    const upcomingConference = data.conferences[data.conferences.length - 1]

    const pastConferences = data.conferences.filter(
      (conference: Conference) =>
        new Date(conference.release_date) < currentDate
    )

    const lastConference = pastConferences[pastConferences.length - 1]

    if (conferenceId) {
      const selectedConference = data.conferences.find(
        (conference: Conference) => conference.id === conferenceId
      )

      return {
        conferences: data.conferences,
        upcomingConference,
        pastConferences,
        selectedConference,
        lastConference,
      }
    } else {
      return {
        conferences: data.conferences,
        upcomingConference,
        pastConferences,
        lastConference,
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

export const fetchReleasesMonthYear = async ({
  year,
  month,
}: {
  year: number | string
  month: number | string
}) => {
  const endpoint = `${productionURL}/api/releases/${year}/${month}`

  try {
    const res = await fetch(endpoint)

    if (!res.ok) {
      throw new Error("Failed to fetch releases")
    }

    const data = await res.json()

    return data
  } catch (error) {
    console.error("Error fetching releases:", error)
    throw error
  }
}

export const fetchReleasesMonthYearPlatform = async ({
  year,
  month,
  platformId,
}: {
  year: number | string
  month: number | string
  platformId: string
}) => {
  const endpoint = `${productionURL}/api/releases/${year}/${month}/${platformId}`

  try {
    const res = await fetch(endpoint)

    if (!res.ok) {
      throw new Error("Failed to fetch releases")
    }

    const data = await res.json()

    return data
  } catch (error) {
    console.error("Error fetching releases:", error)
    throw error
  }
}

export const fetchGame = async ({ gameId }: { gameId: string }) => {
  const endpoint = `${productionURL}/api/game/${gameId}`

  try {
    const res = await fetch(endpoint)

    if (!res.ok) {
      throw new Error("Failed to fetch game")
    }

    const data = await res.json()

    return data.games[0]
  } catch (error) {
    console.error("Error fetching game:", error)
    throw error
  }
}

export const fetchConferencesYears = async ({
  setYears,
}: {
  setYears: React.Dispatch<React.SetStateAction<never[]>>
}) => {
  const endpoint = `${productionURL}/api/conferences/years`

  try {
    const res = await await fetch(endpoint)

    if (!res.ok) {
      throw new Error("Failed to fetch years")
    }

    const data = await res.json()
    setYears(data.years)
  } catch (error) {
    console.error("Error fetching years:", error)
    throw error
  }
}

export const fetchData = async (url: string) => {
  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Failed to fetch from ${url}`)
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error)
    throw error
  }
}
