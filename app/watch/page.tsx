import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ExternalLink, StepBack } from "lucide-react"
import Link from "next/link"
import React from "react"

export default function Watch() {
  return (
    <main className="min-h-screen flex-col items-center justify-center p-24 flex lg:grid lg:grid-cols-2 lg:gap-4">
      <div className="grid w-full max-w-xl lg:max-w-2xl">
        <Card>
          <iframe
            height="315"
            src="https://www.youtube.com/embed/tgbNymZ7vqY"
            className="w-full rounded-md"
          ></iframe>
          <CardHeader>
            <CardTitle>Nintendo Direct</CardTitle>
            <CardDescription>
              <Link
                href="https://www.youtube.com/embed/tgbNymZ7vqY"
                className="flex mt-2"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                New tab
              </Link>
            </CardDescription>
          </CardHeader>
        </Card>
        <Table className="mt-8 mb-8">
          <TableCaption>All Conferences</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Conference</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Nintendo E3</TableCell>
              <TableCell>May 23rd, 2024 @ 6:00 PM CEST</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Xbox E3</TableCell>
              <TableCell>May 25th, 2024 @ 10:00 AM CEST</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <aside className="grid w-full max-w-xl lg:max-w-xs">
        <Card className="mb-8">
          <CardHeader>
            <CardDescription className="text-red-500 font-bold">
              COMING UP NEXT
            </CardDescription>
            <CardTitle>Cyberpunk 2077</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <StepBack className="mr-2 h-4 w-4" />
              Rewatch
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="mt-8">
            <ul>
              <li>Episode 1</li>
              <li>Episode 2</li>
              <li>Episode 3</li>
              <li>Episode 4</li>
              <li>Episode 5</li>
            </ul>
          </CardContent>
        </Card>
      </aside>
    </main>
  )
}
