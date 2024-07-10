import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "../ui/separator"
import { StepBack } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import MyTimer from "../Countdown"
import { Conference } from "@/lib/types"

export default function Rewatch({
  upcomingConference,
  pastConferences,
  year,
}: {
  upcomingConference: Conference
  pastConferences: Conference[]
  year: number | string
}) {
  return (
    <aside className="w-full lg:max-w-md">
      <Card className="mb-8 shadow-md">
        <CardHeader>
          <div className="text-red font-bold flex items-center gap-2">
            <CardDescription className="text-red-500 font-bold">
              COMING UP NEXT -
            </CardDescription>
            <MyTimer
              expiryTimestamp={new Date(upcomingConference.release_date)}
            />
          </div>
          <CardTitle>{upcomingConference.name}</CardTitle>
        </CardHeader>
      </Card>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <StepBack className="mr-2 h-4 w-4" />
            Rewatch
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="mt-8">
          <ul className="list-inside space-y-2">
            {pastConferences.map((conference: Conference) => (
              <li key={conference.id}>
                <Link href={`/watch/${year}/${conference.id}`}>
                  <Button>{conference.name}</Button>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </aside>
  )
}
