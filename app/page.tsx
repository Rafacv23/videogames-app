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
import { siteConfig } from "@/config/site"
import {
  fetchLastConference,
  fetchUpcomingConferences,
  fetchUpcomingGames,
} from "@/lib/fetchs"
import { Conference, Game } from "@/lib/types"
import { generateTimeAndDateLink, sortPosts } from "@/lib/utils"
import Link from "next/link"
import { posts } from "#site/content"
import { PostItem } from "@/components/blog/post-item"

export default async function Home() {
  const upcomingReleases = await fetchUpcomingGames()
  const upcomingConferences = await fetchUpcomingConferences()
  const lastConference = await fetchLastConference()
  const sortedPosts = sortPosts(posts.slice(0, 3))
  const currentDate = new Date()

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-5xl w-full mx-auto">
        <h1 className="inline-block font-black text-4xl lg:text-5xl">
          {siteConfig.name}
        </h1>
        <p className="text-xl text-muted-foreground">
          {siteConfig.description}
        </p>
        <div className="flex flex-col gap-8">
          <section>
            <div className="flex flex-col md:flex-row md:flex gap-4 md:gap-0 justify-between mb-4">
              <h2 className="inline-block text-2xl lg:text-3xl">
                Upcoming Releases
              </h2>
              <Link href={"/releases"}>
                <Button>See more</Button>
              </Link>
            </div>
            <ul className="grid md:grid-cols-2 lg:grid-cols-3">
              {upcomingReleases.map((game: Game) => (
                <li key={game.id}>
                  <VideogameCard game={game} />
                </li>
              ))}
            </ul>
          </section>
          <section>
            <div className="flex flex-col md:flex-row md:flex gap-4 md:gap-0 justify-between mb-4">
              <h2 className="inline-block text-2xl lg:text-3xl">
                Upcoming Conferences
              </h2>
              <Link href={"/conferences"}>
                <Button>See more</Button>
              </Link>
            </div>
            <Table className="mt-8 mb-8 w-full">
              <TableCaption>All Conferences</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Conference</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingConferences.map((conference: Conference) => (
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
                          conference.time ? `| ${conference.time} UTC` : "| TBA"
                        }`}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
          <section>
            <div className="flex flex-col md:flex-row md:flex gap-4 md:gap-0 justify-between mb-4">
              <h2 className="inline-block text-2xl lg:text-3xl">
                Rewatch Conferences
              </h2>
              <Link href={"/watch"}>
                <Button>See more</Button>
              </Link>
            </div>
            <Player lastConference={lastConference} />
          </section>
          <section>
            <div className="flex flex-col md:flex-row md:flex gap-4 md:gap-0 justify-between mb-4">
              <h2 className="inline-block text-2xl lg:text-3xl">
                Latest Posts
              </h2>
              <Link href={"/blog"}>
                <Button>See more</Button>
              </Link>
            </div>
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
          </section>
        </div>
      </div>
    </div>
  )
}
