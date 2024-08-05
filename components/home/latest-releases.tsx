import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import VideogameCard from "@/components/VideogameCard"
import Link from "next/link"
import initTranslations from "@/app/i18n"
import { Game } from "@/lib/types"
import { fetchData } from "@/lib/fetchs"
import { siteConfig } from "@/config/site"

export async function LatestReleases({ locale }: { locale: string }) {
  const upcomingReleases = await fetchData(`${siteConfig.url}/api/releases`)

  const { t } = await initTranslations(locale, ["home", "common"])

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:flex gap-4 md:gap-0 justify-between md:items-center mb-4">
        <CardTitle>{t("releases-card")}</CardTitle>
        <Link href={"/releases"}>
          <Button>{t("common:see-more")}</Button>
        </Link>
      </CardHeader>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {upcomingReleases.games.map((game: Game) => (
          <li key={game.id}>
            <VideogameCard locale={locale} game={game} />
          </li>
        ))}
      </ul>
    </Card>
  )
}
