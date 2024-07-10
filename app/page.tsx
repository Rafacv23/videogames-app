import { Button } from "@/components/ui/button"
import {
  TableCaption,
  TableHead,
  TableHeader,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import VideogameCard from "@/components/VideogameCard"
import Player from "@/components/watch/Player"
import { fetchData } from "@/lib/fetchs"
import { Conference, Game } from "@/lib/types"
import { generateTimeAndDateLink, sortPosts } from "@/lib/utils"
import Link from "next/link"
import { posts } from "#site/content"
import { PostItem } from "@/components/blog/post-item"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Banner from "@/components/Banner"

export default async function Home() {
  const upcomingReleases = await fetchData("http://localhost:3000/api/releases")
  const upcomingConferences = await fetchData(
    "http://localhost:3000/api/conferences"
  )
  const lastConference = await fetchData("http://localhost:3000/api/watch/last")
  const sortedPosts = sortPosts(posts.slice(0, 3))
  const currentDate = new Date()

  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <div className="max-w-5xl w-full mx-auto">
        <Banner />
        <div className="flex flex-col gap-8">
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:flex gap-4 md:gap-0 justify-between md:items-center mb-4">
              <CardTitle>Upcoming Releases</CardTitle>
              <Link href={"/releases"}>
                <Button>See more</Button>
              </Link>
            </CardHeader>
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {upcomingReleases.games.map((game: Game) => (
                <li key={game.id}>
                  <VideogameCard game={game} />
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:flex gap-4 md:gap-0 justify-between md:items-center mb-4">
              <CardTitle>Upcoming Conferences</CardTitle>
              <Link href={"/conferences"}>
                <Button>See more</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <Table className="mt-8 mb-8 w-full">
                <TableCaption>All Conferences</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Conference</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingConferences.conferences.map(
                    (conference: Conference) => (
                      <TableRow
                        key={conference.id}
                        className={`${
                          new Date(conference.release_date) > currentDate
                            ? ""
                            : "line-through"
                        }`}
                      >
                        <TableCell className="font-medium">
                          {conference.name}
                        </TableCell>
                        <TableCell>
                          <Link
                            target="_blank"
                            href={generateTimeAndDateLink(
                              conference.release_date,
                              conference.time
                            )}
                          >
                            {`${conference.release_date} ${
                              conference.time
                                ? `| ${conference.time} UTC`
                                : "| TBA"
                            }`}
                          </Link>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:flex gap-4 md:gap-0 justify-between md:items-center mb-4">
              <CardTitle>Rewatch Conferences</CardTitle>
              <Link href={"/watch"}>
                <Button>See more</Button>
              </Link>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Player lastConference={lastConference.conferences[0]} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:flex gap-4 md:gap-0 justify-between md:items-center mb-4">
              <CardTitle>Latest Posts</CardTitle>
              <Link href={"/blog"}>
                <Button>See more</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <ul>
                {sortedPosts.map((post) => (
                  <li key={post.slug}>
                    <PostItem
                      slug={post.slug}
                      date={post.date}
                      title={post.title}
                      description={post.description}
                    />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
