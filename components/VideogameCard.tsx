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

export default function VideogameCard({ game }: { game: Game }) {
  // Separar las plataformas por comas y limpiar espacios
  const platforms = game.platforms
    ?.split(",")
    .map((platform) => platform.trim())

  return (
    <Card className="w-full max-w-xs mx-auto h-full">
      <CardHeader>
        <CardTitle>{game.name}</CardTitle>
        <CardDescription>{game.release_date}</CardDescription>
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
        <ul className="grid grid-cols-2 gap-4">
          {platforms?.map((platform, index) => (
            <li key={index}>
              <Badge>{platform}</Badge>
            </li>
          ))}
        </ul>
      </CardFooter>
    </Card>
  )
}
