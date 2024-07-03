// components/ConferenceList.tsx

import React from "react"
import VideogameCard from "@/components/VideogameCard"
import { ConferenceListProps } from "@/lib/types"

const ConferenceList: React.FC<ConferenceListProps> = ({
  data,
  year,
  searchTerm,
}) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-5xl w-full mx-auto">
        <h1 className="text-xl font-bold mb-4">Conferences in {year}</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      </div>
    </main>
  )
}

export default ConferenceList
