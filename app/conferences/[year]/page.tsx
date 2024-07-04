"use client"

import React, { useEffect, useState } from "react"
import { Conference, Game, Platform } from "@/lib/types"
import Data from "@/components/conferences/Data"
import { sortGamesByReleaseDate } from "@/lib/utils"
import NavBar from "@/components/conferences/NavBar"
import { fetchConferences, fetchGames, fetchPlatforms } from "@/lib/fetchs"

export default function Page({ params }: { params: { year: string } }) {
  const [position, setPosition] = useState("newest") // Default sorting option
  const [conferences, setConferences] = useState<Conference[]>([])
  const [nextConference, setNextConference] = useState<Conference | null>(null)
  const [data, setData] = useState<Game[]>([]) // State to hold games data
  const [searchTerm, setSearchTerm] = useState("") // State for search term
  const [platforms, setPlatforms] = useState<Platform[]>([])

  useEffect(() => {
    fetchConferences({ year: params.year, setConferences, setNextConference })
    fetchGames({ year: params.year, setData })
    fetchPlatforms({ setPlatforms })
  }, [params.year])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
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
      />
      <Data data={sortedGames} year={params.year} searchTerm={searchTerm} />
    </>
  )
}
