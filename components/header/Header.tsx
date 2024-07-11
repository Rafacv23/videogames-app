"use client"

import React from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import MobileHeader from "./MobileHeader"
import DesktopHeader from "./DesktopHeader"
import { useTranslation } from "react-i18next"
import { siteConfig } from "@/config/site"

export default function Header({ locale }: { locale: string }) {
  const { t } = useTranslation(locale)

  return (
    <header className="bg-white sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link className="block text-teal-600 dark:text-teal-300" href="/">
              <span className="sr-only">{t("home")}</span>
              <Avatar>
                <AvatarImage src="/logo.avif" alt={`${siteConfig.name} logo`} />
                <AvatarFallback>{t("home")}</AvatarFallback>
              </Avatar>
            </Link>
          </div>
          <div className="md:flex md:items-center md:gap-12">
            <DesktopHeader locale={locale} />
            <MobileHeader locale={locale} />
          </div>
        </div>
      </div>
    </header>
  )
}
