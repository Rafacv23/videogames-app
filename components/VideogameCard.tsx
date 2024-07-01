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

export default function VideogameCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cyberpunk 2077</CardTitle>
        <CardDescription>25 Jun</CardDescription>
      </CardHeader>
      <CardContent>
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftwistedvoxel.com%2Fwp-content%2Fuploads%2F2020%2F12%2Fcyberpunk-2077-review.jpg&f=1&nofb=1&ipt=9b3b6ce72f3e6b45f86f92c8fa7cc4e6e8fe647f5d60aa2ce9da6e6b4d341c31&ipo=images" />
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
