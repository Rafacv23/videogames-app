import { Conference, Game, Platform } from "./types"

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
  const url = `http://localhost:3000/api/watch/${year}`
  try {
    const res = await fetch(url)
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
  const url = `http://localhost:3000/api/conferences/${year}`
  try {
    const res = await fetch(url)
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
  const url = `http://localhost:3000/api/platforms`
  try {
    const res = await fetch(url)
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
  const url = `http://localhost:3000/api/watch/${year}`

  try {
    const res = await fetch(url)

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
  const url = `http://localhost:3000/api/releases/${year}/${month}`

  try {
    const res = await fetch(url)

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
