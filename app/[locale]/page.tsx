import Banner from "@/components/home/Banner"
import { LatestReleases } from "@/components/home/latest-releases"
import { NextConferences } from "@/components/home/next-conferences"
import { RewatchConference } from "@/components/home/rewatch-conference"
import { LatestPosts } from "@/components/home/latest-posts"
export default async function Home({ params }: { params: { locale: string } }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <div className="max-w-5xl w-full mx-auto">
        <Banner locale={params.locale} />
        <div className="flex flex-col gap-8">
          <LatestReleases locale={params.locale} />
          <NextConferences locale={params.locale} />
          <RewatchConference locale={params.locale} />
          <LatestPosts locale={params.locale} />
        </div>
      </div>
    </div>
  )
}
