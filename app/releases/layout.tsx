import React from "react"
import Nav from "@/components/releases/Nav"

export default function ReleasesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Nav />
      {children}
    </>
  )
}
