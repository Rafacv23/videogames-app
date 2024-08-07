import React, { Suspense } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card"
import { Badge } from "./ui/badge"
import { Game } from "@/lib/types"
import Link from "next/link"
import { Button } from "./ui/button"
import initTranslations from "@/app/i18n"
import { Skeleton } from "./ui/skeleton"
import Image from "next/image"

export default async function VideogameCard({
  game,
  locale,
}: {
  game: Game
  locale?: string
}) {
  const { t } = await initTranslations(locale, ["common"])

  // Separar las plataformas por comas y limpiar espacios
  const platforms = game.platforms
    ?.split(",")
    .map((platform) => platform.trim())

  return (
    <Card className="w-full max-w-xs mx-auto h-full">
      <CardHeader>
        {game.conference_name && game.conference_url ? (
          <CardDescription className="mb-4">
            <Link href={game.conference_url} target="blank">
              <Button variant={"outline"}>{game.conference_name}</Button>
            </Link>
          </CardDescription>
        ) : null}
        <CardTitle>{game.name}</CardTitle>
        <CardDescription>
          {game.release_date ? game.release_date : "TBA"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton />}>
          <Image
            src={game.img}
            alt={`${game.name} logo`}
            width={324}
            height={151}
          />
        </Suspense>
      </CardContent>
      <CardFooter>
        <ul className="mt-2 flex flex-wrap">
          {platforms?.map((platform, index) => (
            <li key={index} className="mr-1.5 mt-2">
              <Badge variant="outline">{platform}</Badge>
            </li>
          ))}
        </ul>
      </CardFooter>
      <CardFooter>
        <Link href={`/game/${game.id}`}>
          <Button>{t("see-more")}</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
