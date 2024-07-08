import React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Filter, Calendar, TicketCheck } from "lucide-react"
import { FilterMenuProps } from "@/lib/types"
import Link from "next/link"

const FilterMenu: React.FC<FilterMenuProps> = ({
  conferences,
  year,
  platforms,
  conferenceYears,
}) => {
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
              <TicketCheck className="mr-2 h-4 w-4" />
              <span>Conferences</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup>
                  {conferences.length > 0 ? (
                    conferences.map((conference) => (
                      <DropdownMenuRadioItem
                        value={conference.id}
                        key={conference.id}
                      >
                        <Link href={`/conferences/${year}/${conference.id}`}>
                          {conference.name}
                        </Link>
                      </DropdownMenuRadioItem>
                    ))
                  ) : (
                    <DropdownMenuItem>
                      No conferences planned for this year
                    </DropdownMenuItem>
                  )}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Year</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup>
                  {conferenceYears.map((year: any) => (
                    <DropdownMenuRadioItem value={year.year} key={year.year}>
                      <Link href={`/conferences/${year.year}`}>
                        {year.year}
                      </Link>
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FilterMenu
