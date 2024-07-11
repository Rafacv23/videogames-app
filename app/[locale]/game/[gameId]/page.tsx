import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { fetchGame } from "@/lib/fetchs"
import { Game } from "@/lib/types"
import { convertYoutubeUrl } from "@/lib/utils"
import { CircleCheck, CircleX, ExternalLink } from "lucide-react"
import Link from "next/link"

export default async function GameId({
  params,
}: {
  params: { gameId: string }
}) {
  try {
    const game: Game = await fetchGame({
      gameId: params.gameId,
    })

    const platforms = game.platforms ? game.platforms.split(",") : []

    const url = convertYoutubeUrl(game.trailer ? game.trailer : "")

    return (
      <div className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
        <div className="max-w-5xl w-full mx-auto">
          <Card>
            <CardHeader className="flex md:items-center md:flex-row md:justify-between">
              <div>
                <CardTitle>{game.name}</CardTitle>
                <CardDescription>{game.release_date}</CardDescription>
              </div>
              <div>
                {game.url ? (
                  <Link href={game.url} target="blank">
                    <Button>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Game page
                    </Button>
                  </Link>
                ) : null}
              </div>
            </CardHeader>
            <CardContent>
              <iframe
                height="315"
                src={`https://www.youtube.com/embed/${url}`}
                className="w-full rounded-t-md"
                title="Conference Video"
              ></iframe>
              <p className="mt-8">{game.description}</p>
            </CardContent>
            <CardFooter className="justify-start flex flex-col items-center gap-4">
              <ul className="mt-2 flex flex-wrap mb-4">
                {platforms?.map((platform, index) => (
                  <li key={index} className="mr-1.5 mt-2">
                    <Badge variant="outline">{platform}</Badge>
                  </li>
                ))}
              </ul>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Developer</TableHead>
                    <TableHead>Publisher</TableHead>
                    <TableHead>Early-access</TableHead>
                    <TableHead>DLC</TableHead>
                    <TableHead>Remastered</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow key={game.id}>
                    <TableCell>{game.developer}</TableCell>
                    <TableCell>{game.publisher}</TableCell>
                    <TableCell>
                      {game.early_access ? <CircleCheck /> : <CircleX />}
                    </TableCell>
                    <TableCell>
                      {game.dlc ? <CircleCheck /> : <CircleX />}
                    </TableCell>
                    <TableCell>
                      {game.remaster ? <CircleCheck /> : <CircleX />}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardFooter>
          </Card>
        </div>
      </div>
    ) // Assuming game has a 'name' property
  } catch (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="max-w-5xl w-full mx-auto flex flex-col items-center justify-center gap-2">
          No game for this query: {params.gameId}
          <Link href={`/`}>
            <Button>Try with other one</Button>
          </Link>
        </div>
      </main>
    )
  }
}