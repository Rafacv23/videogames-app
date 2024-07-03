import React from "react"
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

export default function VideogameCard({ game }: { game: Game }) {
  // Separar las plataformas por comas y limpiar espacios
  const platforms = game.platforms
    ?.split(",")
    .map((platform) => platform.trim())

  return (
    <Card className="w-full max-w-xs mx-auto h-full">
      <CardHeader>
        {game.conference_name && game.conference_url ? (
          <CardDescription>
            <Link href={game.conference_url} target="blank">
              {game.conference_name}
            </Link>
          </CardDescription>
        ) : null}
        <CardTitle>{game.name}</CardTitle>
        <CardDescription>
          {game.release_date ? game.release_date : "TBA"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={game.img}
          alt={`${game.name} logo`}
          className="max-w-full h-auto"
          loading="lazy"
        />
      </CardContent>
      <CardFooter>
        <ul className="mt-2 flex flex-wrap">
          {platforms?.map((platform, index) => (
            <li key={index} className="mr-1.5 mt-2">
              <Badge>{platform}</Badge>
            </li>
          ))}
        </ul>
      </CardFooter>
    </Card>
  )
}
