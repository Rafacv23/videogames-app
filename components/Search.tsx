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
import { useTranslation } from "react-i18next"

const Search = ({
  className,
  locale,
}: {
  className?: string
  locale: string
}) => {
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

  const { t } = useTranslation(locale)

  return (
    <Dialog>
      <DialogTrigger className={className}>{t("search")}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("search")}</DialogTitle>
          <DialogDescription>{t("search-dialog")}</DialogDescription>
        </DialogHeader>
        <Input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={t("search-placeholder")}
        />
        <ul className="flex flex-col gap-4 mt-4">
          {results.length > 0 && searchTerm.length >= 3
            ? results.map((game: Game) => (
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
              ))
            : searchTerm.length >= 3 && <li>{t("search-error")}</li>}
        </ul>
      </DialogContent>
    </Dialog>
  )
}

export default Search
