// components/NavBar.tsx
import React from "react"
import { NavBarProps } from "@/lib/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import ConferencesDropdown from "./ConferencesDropdown"
import ConferenceLink from "./ConferenceLink"
import SearchBar from "./SearchBar"
import SortMenu from "./SortMenu"
import FilterMenu from "./FilterMenu"

const NavBar: React.FC<NavBarProps> = ({
  conferences,
  nextConference,
  searchTerm,
  onSearchChange,
  position,
  setPosition,
  year,
  platforms,
  conferenceYears,
  resetValues,
}) => {
  return (
    <nav
      id="start"
      className="flex flex-col items-center justify-center space-x-4 top-20 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <Card>
        <CardHeader className="md:flex md:flex-row justify-around md:items-end">
          <ConferencesDropdown conferences={conferences} />
          <ConferenceLink nextConference={nextConference} year={year} />
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-2">
          <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
          <SortMenu position={position} setPosition={setPosition} />
          <FilterMenu
            conferences={conferences}
            platforms={platforms}
            conferenceYears={conferenceYears}
            year={year}
          />
          <Button onClick={resetValues}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </CardContent>
      </Card>
    </nav>
  )
}

export default NavBar
