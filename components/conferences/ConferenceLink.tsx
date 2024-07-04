// components/ConferenceLink.tsx
import React from "react"
import { ConferenceLinkProps } from "@/lib/types"
import { CardDescription, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import MyTimer from "../Countdown"

const ConferenceLink: React.FC<ConferenceLinkProps> = ({
  nextConference,
  year,
}) => {
  return (
    <Link
      href={
        nextConference?.url
          ? `/watch/${year}/${nextConference?.id}`
          : `/watch/${year}`
      }
      className="flex items-center"
    >
      <div>
        <CardDescription className="text-red-500 font-bold flex gap-2">
          COMING UP NEXT
          {nextConference?.release_date ? (
            <MyTimer expiryTimestamp={new Date(nextConference.release_date)} />
          ) : null}
        </CardDescription>
        <CardDescription>{nextConference?.name}</CardDescription>
      </div>
      <div>
        <ArrowRight className="mr-2 h-4 w-4" />
      </div>
    </Link>
  )
}

export default ConferenceLink
