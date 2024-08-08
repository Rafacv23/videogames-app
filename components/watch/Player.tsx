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
import initTranslations from "@/app/i18n"
import { Button } from "../ui/button"
import { VideoPlayer } from "../VideoPlayer"

export default async function Player({
  lastConference,
  conferences,
  locale,
}: {
  lastConference: Conference
  conferences?: Conference[]
  locale: string
}) {
  const currentDate = new Date()
  const { t } = await initTranslations(locale, ["watch", "common"])

  const videoId = convertYoutubeUrl(
    lastConference.url ? lastConference.url : ""
  )

  return (
    <div className="w-full lg:max-w-2xl mb-8 lg:mb-0 lg:mr-4">
      <Card className="border-none">
        {videoId ? (
          <VideoPlayer url={videoId} title={lastConference.name} />
        ) : null}
        <CardHeader>
          <CardTitle>{lastConference.name}</CardTitle>
          <CardDescription>
            <Link
              href={`https://www.youtube.com/embed/${videoId}`}
              className="flex items-center mt-2 hover:text-white hover:transition-colors"
            >
              <Button variant="outline">
                <ExternalLink className="mr-2 h-4 w-4" />
                {t("new-tab-btn")}
              </Button>
            </Link>
          </CardDescription>
        </CardHeader>
      </Card>
      {conferences ? (
        <Table className="mt-8 mb-8 w-full">
          <TableCaption>{t("common:conference-table-caption")}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>
                {t("common:conference-table-head-conference")}
              </TableHead>
              <TableHead>{t("common:conference-table-head-date")}</TableHead>
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
