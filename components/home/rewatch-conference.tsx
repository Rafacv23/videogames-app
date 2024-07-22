import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Player from "@/components/watch/Player"
import Link from "next/link"
import { fetchData } from "@/lib/fetchs"
import initTranslations from "@/app/i18n"

export async function RewatchConference({ locale }: { locale: string }) {
  const lastConference = await fetchData(`http://localhost:3000/api/watch/last`)

  const { t } = await initTranslations(locale, ["home", "common"])

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:flex gap-4 md:gap-0 justify-between md:items-center mb-4">
        <CardTitle>{t("rewatch-card")}</CardTitle>
        <Link href={"/watch"}>
          <Button>{t("common:see-more")}</Button>
        </Link>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Player
          locale={locale}
          lastConference={lastConference.conferences[0]}
        />
      </CardContent>
    </Card>
  )
}
