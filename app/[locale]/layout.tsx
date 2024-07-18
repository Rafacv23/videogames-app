import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header/Header"
import { cn } from "@/lib/utils"
import { Providers } from "@/components/Providers"
import { siteConfig } from "@/config/site"
import Footer from "@/components/Footer"
import { TranslationsProvider } from "@/components/TranslationsProvider"
import initTranslations from "../i18n"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const i18nNamespaces = [
  "header",
  "releases",
  "conferences",
  "common",
  "watch",
  "blog",
]

export const metadata: Metadata = {
  applicationName: siteConfig.name,
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
  category: "videogames",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      es: "/es",
    },
  },
  keywords: [
    "Videogames",
    "Videogames releases",
    "Videogame news",
    "Open source",
  ],
  authors: { name: siteConfig.author },
  creator: siteConfig.author,
  publisher: siteConfig.author,
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.name,
    siteName: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} OG Image`,
      },
    ],
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@rafa_canosa",
    title: siteConfig.name,
    description: siteConfig.description,
    images: `${siteConfig.url}/twitter-image.jpg`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/public/logo.avif",
    apple: "/public/logo.avif",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-schema: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const { t, resources } = await initTranslations(params.locale, i18nNamespaces)

  return (
    <html lang={params.locale}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={params.locale}
          resources={resources}
        >
          <Providers>
            <div className="relative flex min-h-dvh flex-col bg-background">
              <Header locale={params.locale} />
              <main className="min-h-screen flex flex-col items-start justify-center p-6 lg:flex-row lg:gap-4">
                <div className="max-w-5xl w-full mx-auto">{children}</div>
              </main>
              <Footer />
            </div>
          </Providers>
        </TranslationsProvider>
      </body>
    </html>
  )
}
