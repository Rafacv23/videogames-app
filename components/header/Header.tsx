"use client"

import React from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import MobileHeader from "./MobileHeader"
import DesktopHeader from "./DesktopHeader"

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
            <DesktopHeader />
            <MobileHeader />
          </div>
        </div>
      </div>
    </header>
  )
}
