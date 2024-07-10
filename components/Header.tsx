"use client"

import React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Search from "./Search"
import ThemeToggle from "./ThemeToggle"

export default function Header() {
  return (
    <header className="bg-white sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link className="block text-teal-600 dark:text-teal-300" href="/">
              <span className="sr-only">Home</span>
              <Avatar>
                <AvatarImage src="/logo.avif" />
                <AvatarFallback>Home</AvatarFallback>
              </Avatar>
            </Link>
          </div>
          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <Search className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75" />
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="/releases"
                  >
                    Releases
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="/conferences"
                  >
                    Conferences
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="/watch"
                  >
                    Watch
                  </Link>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="/blog"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <ThemeToggle />
                </li>
              </ul>
            </nav>

            <div className="block md:hidden">
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
                  </Link>{" "}
                  <Link href="/blog">
                    <DropdownMenuItem>Blog</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
