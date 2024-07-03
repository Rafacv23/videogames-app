// components/ConferenceLink.tsx
import React from "react"
import { ConferenceLinkProps } from "@/lib/types"
import { CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

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
        <span>COMING UP NEXT</span>
        <CardDescription>{nextConference?.name}</CardDescription>
      </div>
      <div>
        <ArrowRight className="mr-2 h-4 w-4" />
      </div>
    </Link>
  )
}

export default ConferenceLink
