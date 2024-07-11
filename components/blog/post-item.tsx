import { Calendar } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "../ui/button"
import { cn, formatDate } from "@/lib/utils"
import initTranslations from "@/app/i18n"

interface PostItemProps {
  slug: string
  title: string
  description?: string
  date: string
  locale?: string
}

export async function PostItem({
  slug,
  title,
  description,
  date,
  locale,
}: PostItemProps) {
  const { t } = await initTranslations(locale, ["blog", "common"])

  return (
    <article className="flex flex-col gap-4 border-border border-b py-3">
      <div>
        <h2 className="text-2xl font-bold">
          <Link href={slug}>{title}</Link>
        </h2>
      </div>
      <div className="max-w-none text-muted-foreground">{description}</div>
      <div className="flex justify-between items-center">
        <dl>
          <dt className="sr-only">{t("published-on")}</dt>
          <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={date}>{formatDate(date)}</time>
          </dd>
        </dl>
        <Link
          href={slug}
          className={cn(buttonVariants({ variant: "link" }), "py-0")}
        >
          {t("read-more-btn")}
        </Link>
      </div>
    </article>
  )
}
