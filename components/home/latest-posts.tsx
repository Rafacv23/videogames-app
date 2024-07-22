import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { sortPosts } from "@/lib/utils"
import { posts } from "@/.velite"
import initTranslations from "@/app/i18n"
import { PostItem } from "../blog/post-item"

export async function LatestPosts({ locale }: { locale: string }) {
  const sortedPosts = sortPosts(
    posts.slice(0, 3).filter((post) => post.published)
  )
  const { t } = await initTranslations(locale, ["home", "common"])

  return (
    <>
      {sortedPosts.length === 0 ? null : (
        <Card>
          <CardHeader className="flex flex-col md:flex-row md:flex gap-4 md:gap-0 justify-between md:items-center mb-4">
            <CardTitle>{t("posts-card")}</CardTitle>
            <Link href={"/blog"}>
              <Button>{t("common:see-more")}</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <ul>
              {sortedPosts.map((post) => (
                <li key={post.slug}>
                  <PostItem
                    locale={locale}
                    slug={post.slug}
                    date={post.date}
                    title={post.title}
                    description={post.description}
                  />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </>
  )
}
