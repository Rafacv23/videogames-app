// components/ConferenceLink.tsx
import React from "react"
import { ConferenceLinkProps } from "@/lib/types"
import { CardDescription } from "@/components/ui/card"
import Link from "next/link"
import MyTimer from "../Countdown"
import { useTranslation } from "react-i18next"

const ConferenceLink: React.FC<ConferenceLinkProps> = ({
  nextConference,
  year,
  locale,
}) => {
  const { t } = useTranslation(locale)

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
        <CardDescription className="text-red font-bold flex gap-2">
          {t("conferences:next")}
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
