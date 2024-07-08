"use client"

import React, { useEffect, useState } from "react"
import { Conference, Game, Platform } from "@/lib/types"
import Data from "@/components/conferences/Data"
import { sortGamesByReleaseDate } from "@/lib/utils"
import NavBar from "@/components/conferences/NavBar"
import {
  fetchConferences,
  fetchConferencesYears,
  fetchGamesByConference,
  fetchPlatforms,
} from "@/lib/fetchs"
import { useRouter } from "next/navigation"

export default function Page({
  params,
}: {
  params: { year: string; conferenceId: string }
}) {
  const [position, setPosition] = useState("newest") // Default sorting option
  const [conferences, setConferences] = useState<Conference[]>([])
  const [nextConference, setNextConference] = useState<Conference | null>(null)
  const [data, setData] = useState<Game[]>([]) // State to hold games data
  const [searchTerm, setSearchTerm] = useState("") // State for search term
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [years, setYears] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetchConferences({ year: params.year, setConferences, setNextConference })
    fetchGamesByConference({
      year: params.year,
      conferenceId: params.conferenceId,
      setData,
    })
    fetchPlatforms({ setPlatforms })
    fetchConferencesYears({ setYears })
  }, [params.year, params.conferenceId])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const resetValues = () => {
    setPosition("newest")
    setSearchTerm("")
    router.push(`/conferences`)
  }

  // Apply sorting based on current position state
  const sortedGames = sortGamesByReleaseDate(data, position)

  return (
    <>
      <NavBar
        conferences={conferences}
        nextConference={nextConference}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        position={position}
        setPosition={setPosition}
        year={params.year}
        platforms={platforms}
        conferenceYears={years}
        resetValues={resetValues}
      />
      <Data data={sortedGames} year={params.year} searchTerm={searchTerm} />
    </>
  )
}
