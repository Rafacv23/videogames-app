// components/ConferenceList.tsx

import React from "react"
import VideogameCard from "@/components/VideogameCard"
import { ConferenceListProps } from "@/lib/types"
import Link from "next/link"
import { Button } from "../ui/button"
import { MoveUp } from "lucide-react"
import { QueryPagination } from "@/components/blog/query-pagination"

const ConferenceList: React.FC<ConferenceListProps> = ({
  data,
  year,
  searchTerm,
  totalPages,
}) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-5xl w-full mx-auto">
        <h1 className="text-xl font-bold mb-4">Conferences in {year}</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {data
            .filter((game) =>
              game.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((game) => (
              <li key={game.id}>
                <VideogameCard game={game} />
              </li>
            ))}
        </ul>
        <div>
          <Link href={`#start`}>
            <Button variant={"outline"}>
              <MoveUp className="mr-2 h-4 w-4" />
              Back to top
            </Button>
          </Link>
          <QueryPagination
            totalPages={totalPages}
            className="justify-end mt-4"
          />
        </div>
      </div>
    </main>
  )
}

export default ConferenceList
