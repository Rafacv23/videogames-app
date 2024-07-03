// components/ConferencesDropdown.tsx
import React from "react"
import { Conference } from "@/lib/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Calendar } from "lucide-react"

interface ConferencesDropdownProps {
  conferences: Conference[]
}

const ConferencesDropdown: React.FC<ConferencesDropdownProps> = ({
  conferences,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center">
        <Calendar className="mr-2 h-4 w-4" />
        Calendar
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Conferences</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {conferences.map((conference: Conference) => (
          <DropdownMenuItem key={conference.id}>
            {conference.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ConferencesDropdown
