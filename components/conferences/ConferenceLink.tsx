// components/ConferenceLink.tsx
import React from "react"
import { ConferenceLinkProps } from "@/lib/types"
import { CardDescription } from "@/components/ui/card"
import Link from "next/link"
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
      className="flex items-center justify-between"
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
    </Link>
  )
}

export default ConferenceLink
