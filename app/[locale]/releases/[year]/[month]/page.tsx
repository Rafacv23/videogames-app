import initTranslations from "@/app/i18n"
import { Button } from "@/components/ui/button"
import VideogameCard from "@/components/VideogameCard"
import { fetchReleasesMonthYear } from "@/lib/fetchs"
import { Game } from "@/lib/types"
import { MoveUp } from "lucide-react"
import Link from "next/link"

export default async function Page({
  params,
}: {
  params: { year: string; month: string; locale: string }
}) {
  const data = await fetchReleasesMonthYear({
    year: params.year,
    month: params.month,
  })

  const { t } = await initTranslations(params.locale, ["releases", "common"])

  return (
    <>
      <h1 className="text-xl font-bold mb-8 mt-8">
        {t("title")} {params.year}/{params.month}
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {data.games.map((game: Game) => (
          <li key={game.id}>
            <VideogameCard locale={params.locale} game={game} />
          </li>
        ))}
      </ul>
      <Link href={`#start`}>
        <Button variant={"outline"}>
          <MoveUp className="mr-2 h-4 w-4" />
          {t("common:back")}
        </Button>
      </Link>
    </>
  )
}
