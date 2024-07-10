import React from "react"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { convertYoutubeUrl, generateTimeAndDateLink } from "@/lib/utils"
import { ExternalLink } from "lucide-react"
import { Conference } from "@/lib/types"
export default function Player({
  lastConference,
  conferences,
}: {
  lastConference: Conference
  conferences?: Conference[]
}) {
  const currentDate = new Date()

  const url = convertYoutubeUrl(lastConference.url ? lastConference.url : "")

  return (
    <div className="w-full lg:max-w-2xl mb-8 lg:mb-0 lg:mr-4">
      <Card className="border-none">
        <iframe
          height="315"
          src={`https://www.youtube.com/embed/${url}`}
          className="w-full rounded-t-md"
          title="Conference Video"
        ></iframe>
        <CardHeader>
          <CardTitle>{lastConference.name}</CardTitle>
          <CardDescription>
            <Link
              href={`https://www.youtube.com/embed/${url}`}
              className="flex items-center mt-2 hover:text-white hover:transition-colors"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Open in new tab
            </Link>
          </CardDescription>
        </CardHeader>
      </Card>
      {conferences ? (
        <Table className="mt-8 mb-8 w-full">
          <TableCaption>All Conferences</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Conference</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conferences.map((conference: Conference) => (
              <TableRow
                key={conference.id}
                className={`${
                  new Date(conference.release_date) > currentDate
                    ? ""
                    : "line-through"
                }`}
              >
                <TableCell className="font-medium">{conference.name}</TableCell>
                <TableCell>
                  <Link
                    target="_blank"
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
      ) : null}
    </div>
  )
}
