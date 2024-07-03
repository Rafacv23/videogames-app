import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Conference } from "@/lib/types"
import { convertYoutubeUrl, generateTimeAndDateLink } from "@/lib/utils"
import { ExternalLink, StepBack } from "lucide-react"
import Link from "next/link"
import React from "react"

export default async function Watch({
  params,
}: {
  params: { year: string; conferenceId: string }
}) {
  async function getData({ year }: { year: string }) {
    const url = `http://localhost:3000/api/watch/${year}`
    const res = await fetch(url)

    if (!res.ok) {
      throw new Error("Failed to fetch data")
    }

    const data = await res.json()

    // Obtener la última y próxima conferencia
    const currentDate = new Date()

    const selectedConference = data.conferences.filter(
      (conference: Conference) => conference.id === params.conferenceId
    )[0]

    console.log(selectedConference)

    const pastConferences = data.conferences.filter(
      (conference: Conference) =>
        new Date(conference.release_date) < currentDate
    )
    const upcomingConference = data.conferences[data.conferences.length - 1]

    return {
      conferences: data.conferences,
      upcomingConference,
      pastConferences,
      selectedConference,
    }
  }

  const {
    conferences,
    upcomingConference,
    pastConferences,
    selectedConference,
  } = await getData(params)

  const currentDate = new Date()
  const url = convertYoutubeUrl(selectedConference.url)

  return (
    <main className="min-h-screen flex-col items-center justify-center p-24 flex lg:grid lg:grid-cols-2 lg:gap-4">
      <div className="grid w-full max-w-xl lg:max-w-2xl">
        <Card>
          <iframe
            height="315"
            src={`https://www.youtube.com/embed/${url}`}
            className="w-full rounded-md"
          ></iframe>
          <CardHeader>
            <CardTitle>{selectedConference.name}</CardTitle>
            <CardDescription>
              <Link
                href={`https://www.youtube.com/embed/${url}`}
                className="flex mt-2"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                New tab
              </Link>
            </CardDescription>
          </CardHeader>
        </Card>
        <Table className="mt-8 mb-8">
          <TableCaption>All Conferences</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Conference</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conferences.map((conference: Conference) => (
              <TableRow
                key={conference.id}
                className={
                  new Date(conference.release_date) > currentDate
                    ? ""
                    : "line-through"
                }
              >
                <TableCell className="font-medium">{conference.name}</TableCell>
                <TableCell>
                  <Link
                    target="blank"
                    href={generateTimeAndDateLink(
                      conference.release_date,
                      conference.time
                    )}
                  >
                    {`${conference.release_date} ${
                      conference.time ? `| ${conference.time} UTC` : "| TBA"
                    }`}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <aside className="grid w-full max-w-xl lg:max-w-xs">
        <Card className="mb-8">
          <CardHeader>
            <CardDescription className="text-red-500 font-bold">
              COMING UP NEXT
            </CardDescription>
            <CardTitle>{upcomingConference?.name}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <StepBack className="mr-2 h-4 w-4" />
              Rewatch
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="mt-8">
            <ul>
              {pastConferences.map((conference: Conference) => (
                <li key={conference.id}>
                  <Link href={`/watch/${params.year}/${conference.id}`}>
                    {conference.name}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </aside>
    </main>
  )
}
