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
  return (
    <Card>
      <CardHeader>
        <CardTitle>{game.name}</CardTitle>
        <CardDescription>{game.release_date}</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={game.img}
          alt={`${game.name} logo`}
          className="max-w-sm"
          loading="lazy"
        />
      </CardContent>
      <CardFooter>
        <ul className="flex gap-4">
          <li>
            <Badge>PC</Badge>
          </li>{" "}
          <li>
            <Badge>Xbox</Badge>
          </li>{" "}
          <li>
            <Badge>PS5</Badge>
          </li>
        </ul>
      </CardFooter>
    </Card>
  )
}
