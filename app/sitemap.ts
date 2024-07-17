import { siteConfig } from "@/config/site"
import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.url}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          es: `${siteConfig.url}/es`,
          en: `${siteConfig.url}`,
        },
      },
    },
    {
      url: `${siteConfig.url}/watch`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: {
        languages: {
          es: `${siteConfig.url}/es/watch`,
          en: `${siteConfig.url}/watch`,
        },
      },
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      alternates: {
        languages: {
          es: `${siteConfig.url}/es/blog`,
          en: `${siteConfig.url}`,
        },
      },
    },
    {
      url: `${siteConfig.url}/conferences`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          es: `${siteConfig.url}/es/conferences`,
          en: `${siteConfig.url}/conferences`,
        },
      },
    },
    {
      url: `${siteConfig.url}/releases`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          es: `${siteConfig.url}/es/releases`,
          en: `${siteConfig.url}/releases`,
        },
      },
    },
  ]
}
