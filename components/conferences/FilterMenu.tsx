// components/FilterMenu.tsx

import React, { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuPortal,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Filter, UserPlus, MessageSquare } from "lucide-react"
import { FilterMenuProps } from "@/lib/types"

const FilterMenu: React.FC<FilterMenuProps> = ({ conferences, platforms }) => {
  const [selectedConferences, setSelectedConferences] = useState<Set<string>>(
    new Set()
  )
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<string>>(
    new Set()
  )
  const [showQ12024, setShowQ12024] = useState(false)

  const handleConferenceChange = (id: string) => {
    setSelectedConferences((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handlePlatformChange = (id: string) => {
    setSelectedPlatforms((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Conferences</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {conferences.map((conference) => (
                  <DropdownMenuCheckboxItem
                    key={conference.id}
                    checked={selectedConferences.has(conference.id)}
                    onCheckedChange={() =>
                      handleConferenceChange(conference.id)
                    }
                  >
                    {conference.name}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Platforms</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {platforms.map((platform) => (
                  <DropdownMenuCheckboxItem
                    key={platform.id}
                    checked={selectedPlatforms.has(platform.id)}
                    onCheckedChange={() => handlePlatformChange(platform.id)}
                  >
                    {platform.name}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Release</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuCheckboxItem
                  checked={showQ12024}
                  onCheckedChange={setShowQ12024}
                >
                  Q1 2024
                </DropdownMenuCheckboxItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>TBA</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FilterMenu
