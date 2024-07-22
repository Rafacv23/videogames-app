import initTranslations from "@/app/i18n"
import { Metadata, ResolvingMetadata } from "next"
import React from "react"

type Props = {
  params: { locale: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { t } = await initTranslations(params.locale, ["conferences"])
  return {
    title: t("url-title"),
    description: t("description"),
  }
}

export default function ReleasesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
