"use client"

import React, { Suspense, useEffect, useState } from "react"
import { Conference, Game, Platform } from "@/lib/types"
import Data from "@/components/conferences/Data"
import { sortGamesByReleaseDate } from "@/lib/utils"
import NavBar from "@/components/conferences/NavBar"
import {
  fetchConferences,
  fetchConferencesYears,
  fetchGames,
  fetchPlatforms,
} from "@/lib/fetchs"
import { useRouter } from "next/navigation"
import Loader from "@/components/Loader"
import Loading from "../loading"

const GAMES_PER_PAGE = 20

interface ConferencesPageProps {
  searchParams: {
    page?: string
  }
  params: {
    year: string
    locale: string
  }
}
export default function ConferencePage({
  params,
  searchParams,
}: ConferencesPageProps) {
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
    fetchGames({ year: params.year, setData })
    fetchPlatforms({ setPlatforms })
    fetchConferencesYears({ setYears })
  }, [params.year])

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

  const currentPage = Number(searchParams?.page) || 1
  const totalPages = Math.ceil(sortedGames.length / GAMES_PER_PAGE)

  const displayGames = sortedGames.slice(
    GAMES_PER_PAGE * (currentPage - 1),
    GAMES_PER_PAGE * currentPage
  )

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
        locale={params.locale}
      />
      <Suspense fallback={<Loading />}>
        <Data
          data={displayGames}
          year={params.year}
          searchTerm={searchTerm}
          totalPages={totalPages}
          locale={params.locale}
        />
      </Suspense>
    </>
  )
}
