// components/SearchBar.tsx
import React from "react"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  searchTerm: string
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <Input
      type="text"
      placeholder="Search game title..."
      value={searchTerm}
      onChange={onSearchChange}
    />
  )
}

export default SearchBar
