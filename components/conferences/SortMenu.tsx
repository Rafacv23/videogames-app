// components/SortMenu.tsx
import React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ArrowDownUp } from "lucide-react"
import { SortMenuProps } from "@/lib/types"
import { useTranslation } from "react-i18next"

const SortMenu: React.FC<SortMenuProps> = ({
  position,
  setPosition,
  locale,
}) => {
  const { t } = useTranslation(locale)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <ArrowDownUp className="mr-2 h-4 w-4" />
          {t("conferences:sorting")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="newest">
            {t("conferences:newest")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="oldest">
            {t("conferences:oldest")}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SortMenu
