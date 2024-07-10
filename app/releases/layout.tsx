import React from "react"
import Nav from "@/components/releases/Nav"

export default function ReleasesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between">
        <div className="max-w-5xl w-full mx-auto">
          <Nav />
          {children}
        </div>
      </div>
    </>
  )
}
