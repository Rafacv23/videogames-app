// SearchBar.js

import React, { useState } from "react"
import { Game } from "@/lib/types"
import { Input } from "./ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog"
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
      <DialogContent>
        <DialogHeader>
          <Input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search games..."
          />
        </DialogHeader>
        <DialogDescription>
          <ul>
            {results.map((game: Game) => (
              <li key={game.id}>
                <a href={`/game/${game.id}`}>{game.name}</a>
              </li>
            ))}
          </ul>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default Search
