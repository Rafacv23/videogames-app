"use client"

import React, { Suspense, useEffect, useState } from "react"
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
import Loading from "../../loading"
import { Button } from "@/components/ui/button"

export default function Page({
  params,
}: {
  params: { year: string; conferenceId: string; locale: string }
}) {
  const [position, setPosition] = useState("newest") // Default sorting option
  const [conferences, setConferences] = useState<Conference[]>([])
  const [nextConference, setNextConference] = useState<Conference | null>(null)
  const [data, setData] = useState<Game[]>([]) // State to hold games data
  const [searchTerm, setSearchTerm] = useState("") // State for search term
  const [years, setYears] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetchConferences({ year: params.year, setConferences, setNextConference })
    fetchGamesByConference({
      year: params.year,
      conferenceId: params.conferenceId,
      setData,
    })
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
        locale={params.locale}
        conferences={conferences}
        nextConference={nextConference}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        position={position}
        setPosition={setPosition}
        year={params.year}
        conferenceYears={years}
        resetValues={resetValues}
      />
      <Suspense fallback={<Loading />}>
        {sortedGames.length !== 0 ? (
          <Data
            data={sortedGames}
            year={params.year}
            searchTerm={searchTerm}
            locale={params.locale}
          />
        ) : (
          <div className="max-w-3xl mx-auto p-6 h-screen flex flex-col justify-center items-center">
            <h2 className="mb-4">Nothing to show yet, come back later.</h2>
            <Button
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => router.push(`/conferences/${params.year}`)
              }
            >
              Try again
            </Button>
          </div>
        )}
      </Suspense>
    </>
  )
}
