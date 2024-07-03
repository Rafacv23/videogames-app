// components/SearchBar.tsx
import React from "react"
import { Input } from "@/components/ui/input"
import { SearchBarProps } from "@/lib/types"

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
