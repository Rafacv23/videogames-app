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
import { useTranslation } from "react-i18next"

const FilterMenu: React.FC<FilterMenuProps> = ({
  conferences,
  year,
  platforms,
  conferenceYears,
  locale,
}) => {
  const { t } = useTranslation(locale)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          {t("conferences:filters")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <TicketCheck className="mr-2 h-4 w-4" />
              <span>{t("conferences:conferences")}</span>
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
                      {t("conferences:conferences-error")}
                    </DropdownMenuItem>
                  )}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Calendar className="mr-2 h-4 w-4" />
              <span>{t("conferences:year")}</span>
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
