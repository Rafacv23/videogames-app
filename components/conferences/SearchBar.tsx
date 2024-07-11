// components/SearchBar.tsx
import React from "react"
import { Input } from "@/components/ui/input"
import { SearchBarProps } from "@/lib/types"
import { useTranslation } from "react-i18next"

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  locale,
}) => {
  const { t } = useTranslation(locale)

  return (
    <Input
      type="text"
      placeholder={t("releases:search-placeholder")}
      value={searchTerm}
      onChange={onSearchChange}
    />
  )
}

export default SearchBar
