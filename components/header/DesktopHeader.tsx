import Link from "next/link"
import Search from "../Search"
import ThemeToggle from "../ThemeToggle"
import { useTranslation } from "react-i18next"

export default function DesktopHeader({ locale }: { locale: string }) {
  const { t } = useTranslation(locale)

  return (
    <nav aria-label="Global" className="hidden md:block">
      <ul className="flex items-center gap-6 text-sm">
        <Search
          locale={locale}
          className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
        />
        <li>
          <Link
            className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
            href="/releases"
          >
            {t("releases")}
          </Link>
        </li>
        <li>
          <Link
            className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
            href="/conferences"
          >
            {t("conferences")}
          </Link>
        </li>
        <li>
          <Link
            className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
            href="/watch"
          >
            {t("watch")}
          </Link>
        </li>
        <li>
          <a
            className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
            href="/blog"
          >
            {t("blog")}
          </a>
        </li>
        <li>
          <ThemeToggle locale={locale} />
        </li>
      </ul>
    </nav>
  )
}
