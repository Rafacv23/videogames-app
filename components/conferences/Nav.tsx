"use client"

import React, { useEffect } from "react"
import { Input } from "../ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import {
  MessageSquare,
  Filter,
  UserPlus,
  ArrowDownUp,
  RotateCcw,
  Calendar,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card"
import Link from "next/link"
import { getCurrentMonthAndYear } from "@/lib/utils"
import { Conference } from "@/lib/types"

export default function Nav() {
  const [position, setPosition] = React.useState("newest") // Default sorting option
  const [conferences, setConferences] = React.useState([])
  const [nextConference, setNextConference] = React.useState<Conference | null>(
    null
  )
  const year = getCurrentMonthAndYear().year

  useEffect(() => {
    const fetchNextConference = async () => {
      const url = `http://localhost:3000/api/watch/${year}`
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error("Failed to fetch data")
      }
      const data = await res.json()

      setConferences(data.conferences)
      const upcomingConference = data.conferences[data.conferences.length - 1]

      setNextConference(upcomingConference)
    }
    fetchNextConference()
  }, [year])

  return (
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
              {conferences
                ? conferences.map((conference: Conference) => (
                    <DropdownMenuItem key={conference.id}>
                      {conference.name}
                    </DropdownMenuItem>
                  ))
                : null}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href={
              nextConference?.url
                ? `/watch/${year}/${nextConference?.id}`
                : `/watch/${year}`
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
          <Input type="text" placeholder="Search game title..." />
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
                      <DropdownMenuCheckboxItem>
                        Nintendo Direct
                      </DropdownMenuCheckboxItem>
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
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Genre</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuCheckboxItem>
                        Shooter
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Platform</span>
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
  )
}
