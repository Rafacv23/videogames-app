import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header/Header"
import { cn } from "@/lib/utils"
import { Providers } from "@/components/Providers"
import { siteConfig } from "@/config/site"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-schema: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <Providers>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <Header />
            <main className="min-h-screen flex flex-col items-start justify-center p-6 lg:flex-row lg:gap-4">
              <div className="max-w-5xl w-full mx-auto">{children}</div>
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
