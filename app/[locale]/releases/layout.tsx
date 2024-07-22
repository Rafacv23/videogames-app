import React from "react"
import Nav from "@/components/releases/Nav"
import { Metadata, ResolvingMetadata } from "next"
import initTranslations from "@/app/i18n"

type Props = {
  params: { locale: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { t } = await initTranslations(params.locale, ["releases", "common"])
  return {
    title: t("url-title"),
    description: t("description"),
  }
}

export default function ReleasesLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between">
        <div className="max-w-5xl w-full mx-auto">
          <Nav locale={params.locale} />
          {children}
        </div>
      </div>
    </>
  )
}
