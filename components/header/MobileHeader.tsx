import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Search from "../Search"
import ThemeToggle from "../ThemeToggle"

export default function MobileHeader() {
  return (
    <div className="block md:hidden space-x-4">
      <ThemeToggle />
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
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Search className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" />
          <Link href="/releases">
            <DropdownMenuItem>Releases</DropdownMenuItem>
          </Link>
          <Link href="/conferences">
            <DropdownMenuItem>Conferences</DropdownMenuItem>
          </Link>
          <Link href="/watch">
            <DropdownMenuItem>Watch</DropdownMenuItem>
          </Link>
          <Link href="/blog">
            <DropdownMenuItem>Blog</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
