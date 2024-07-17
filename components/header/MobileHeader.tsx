import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Search from "../Search"
import ThemeToggle from "../ThemeToggle"
import { useTranslation } from "react-i18next"

export default function MobileHeader({ locale }: { locale: string }) {
  const { t } = useTranslation(locale)

  return (
    <div className="block md:hidden space-x-4">
      <ThemeToggle locale={locale} />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span className="sr-only">Open menu</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Search
            locale={locale}
            className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          />
          <Link href="/releases">
            <DropdownMenuItem>{t("releases")}</DropdownMenuItem>
          </Link>
          <Link href="/conferences">
            <DropdownMenuItem>{t("conferences")}</DropdownMenuItem>
          </Link>
          <Link href="/watch">
            <DropdownMenuItem>{t("watch")}</DropdownMenuItem>
          </Link>
          <Link href="/blog">
            <DropdownMenuItem>{t("blog")}</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
