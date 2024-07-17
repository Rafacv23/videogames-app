import React, { Suspense } from "react"
import { ConferenceLinkProps } from "@/lib/types"
import { CardDescription } from "@/components/ui/card"
import Link from "next/link"
import MyTimer from "../Countdown"
import { useTranslation } from "react-i18next"
import Loading from "@/app/[locale]/loading"

const ConferenceLink: React.FC<ConferenceLinkProps> = ({
  nextConference,
  year,
  locale,
}) => {
  const { t } = useTranslation(locale)

  return (
    <Suspense fallback={<Loading />}>
      <Link
        href={
          nextConference?.url
            ? `/watch/${year}/${nextConference?.id}`
            : `/watch/${year}`
        }
        className="flex items-center justify-between"
      >
        <div>
          <div className="text-red font-bold flex gap-2 text-sm">
            {t("conferences:next")}
            {nextConference?.release_date ? (
              <MyTimer
                expiryTimestamp={new Date(nextConference.release_date)}
              />
            ) : null}
          </div>
          <CardDescription>{nextConference?.name}</CardDescription>
        </div>
      </Link>
    </Suspense>
  )
}

export default ConferenceLink
