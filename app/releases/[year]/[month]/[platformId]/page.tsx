import { Button } from "@/components/ui/button"
import VideogameCard from "@/components/VideogameCard"
import { fetchReleasesMonthYearPlatform } from "@/lib/fetchs"
import { Game } from "@/lib/types"
import { MoveUp } from "lucide-react"
import Link from "next/link"

export default async function Page({
  params,
}: {
  params: { year: string; month: string; platformId: string }
}) {
  const data = await fetchReleasesMonthYearPlatform({
    year: params.year,
    month: params.month,
    platformId: params.platformId,
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-5xl w-full mx-auto">
        <h1 className="text-xl font-bold mb-4">
          Games in {params.year}/{params.month} for the {params.platformId}
        </h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {data.games.map((game: Game) => (
            <li key={game.id}>
              <VideogameCard game={game} />
            </li>
          ))}
        </ul>
        <Link href={`#start`}>
          <Button variant={"outline"}>
            <MoveUp className="mr-2 h-4 w-4" />
            Back to top
          </Button>
        </Link>
      </div>
    </main>
  )
}
