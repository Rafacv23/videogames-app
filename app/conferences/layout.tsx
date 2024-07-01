import React from "react"
import Nav from "@/components/conferences/Nav"

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
