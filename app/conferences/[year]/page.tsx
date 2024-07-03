"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Conference, Game } from "@/lib/types"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import {
  ArrowDownUp,
  ArrowRight,
  Calendar,
  Filter,
  MessageSquare,
  RotateCcw,
  UserPlus,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Data from "@/components/conferences/Data"

export default function Page({ params }: { params: { year: string } }) {
  const [position, setPosition] = useState("newest") // Default sorting option
  const [conferences, setConferences] = useState<Conference[]>([])
  const [nextConference, setNextConference] = useState<Conference | null>(null)
  const [data, setData] = useState<Game[]>([]) // State to hold games data
  const [searchTerm, setSearchTerm] = useState("") // State for search term

  useEffect(() => {
    // Function to fetch conferences data
    const fetchConferences = async () => {
      const url = `http://localhost:3000/api/watch/${params.year}`
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
    const fetchGames = async () => {
      const url = `http://localhost:3000/api/conferences/${params.year}`
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

    fetchConferences()
    fetchGames()
  }, [params.year])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  // Function to sort games based on release date
  const sortGamesByReleaseDate = (games: Game[], order: string) => {
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

  // Apply sorting based on current position state
  const sortedGames = sortGamesByReleaseDate(data, position)

  return (
    <>
      <nav className="flex flex-col items-center justify-center space-x-4 sticky top-20 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Card>
          <CardHeader className="flex flex-row justify-around items-end">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Calendar
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Conferences</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {conferences.map((conference: Conference) => (
                  <DropdownMenuItem key={conference.id}>
                    {conference.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href={
                nextConference?.url
                  ? `/watch/${params.year}/${nextConference?.id}`
                  : `/watch/${params.year}`
              }
              className="flex items-center"
            >
              <div>
                <span>COMING UP NEXT</span>
                <CardDescription>{nextConference?.name}</CardDescription>
              </div>
              <div>
                <ArrowRight className="mr-2 h-4 w-4" />
              </div>
            </Link>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Input
              type="text"
              placeholder="Search game title..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <ArrowDownUp className="mr-2 h-4 w-4" />
                  Sorting
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup
                  value={position}
                  onValueChange={setPosition}
                >
                  <DropdownMenuRadioItem value="newest">
                    Newest
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="oldest">
                    Oldest
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Conferences</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {conferences.map((conference) => (
                          <DropdownMenuCheckboxItem key={conference.id}>
                            {conference.name}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Platform</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuCheckboxItem>PC</DropdownMenuCheckboxItem>
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span>Xbox</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Release</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuCheckboxItem>
                          Q1 2024
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span>TBA</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </CardContent>
        </Card>
      </nav>
      <Data data={sortedGames} year={params.year} searchTerm={searchTerm} />
    </>
  )
}
