// SearchBar.js

import React, { useState } from "react"
import { Game } from "@/lib/types"
import { Input } from "./ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Separator } from "./ui/separator"
const Search = ({ className }: { className?: string }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState([])

  const handleChange = async (event: any) => {
    const value = event.target.value
    setSearchTerm(value)

    try {
      const response = await fetch(`/api/search?query=${value}`)
      const data = await response.json()
      setResults(data.games)
    } catch (error) {
      console.error("Error fetching search results:", error)
      setResults([])
    }
  }

  return (
    <Dialog>
      <DialogTrigger className={className}>Search</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>Find your favourite game</DialogDescription>
        </DialogHeader>
        <Input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search games..."
        />
        <ul className="flex flex-col gap-4 mt-4">
          {results.map((game: Game) => (
            <>
              <li key={game.id}>
                <a
                  className="hover:text-pistacho hover:transition-colors"
                  href={`/game/${game.id}`}
                >
                  {game.name}
                </a>
              </li>
              <Separator />
            </>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}

export default Search
