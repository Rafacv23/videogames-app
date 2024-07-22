import { posts } from "#site/content"
import initTranslations from "@/app/i18n"
import { PostItem } from "@/components/blog/post-item"
import { QueryPagination } from "@/components/blog/query-pagination"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { sortPosts } from "@/lib/utils"
import { Metadata } from "next"
import Link from "next/link"

const POSTS_PER_PAGE = 5

export const metadata: Metadata = {
  title: "Blog | Videogames App",
  description: "My thoughts on the videogames industry",
}

interface BlogPageProps {
  searchParams: {
    page?: string
  }
  params: {
    locale: string
  }
}

export default async function BlogPage({
  searchParams,
  params,
}: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1
  const sortedPosts = sortPosts(posts.filter((post) => post.published))

  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  )

  const { t } = await initTranslations(params.locale, ["blog", "common"])

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">Blog</h1>
          <p className="text-xl text-muted-foreground">{t("subheader")}</p>
        </div>
      </div>
      <Separator className="mt-8" />
      {displayPosts?.length > 0 ? (
        <ul className="flex flex-col">
          {displayPosts.map((post) => {
            const { slug, date, title, description } = post
            return (
              <li key={slug}>
                <PostItem
                  slug={slug}
                  date={date}
                  title={title}
                  description={description}
                  locale={params.locale}
                />
              </li>
            )
          })}
        </ul>
      ) : (
        <>
          <p className="mt-8 mb-8">{t("nothing")}</p>
          <Link href={"/"}>
            <Button variant="outline">{t("common:back")}</Button>
          </Link>
        </>
      )}
      <QueryPagination totalPages={totalPages} className="justify-end mt-4" />
    </div>
  )
}
