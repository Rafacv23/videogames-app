import Link from "next/link"
import Search from "../Search"
import ThemeToggle from "../ThemeToggle"

export default function DesktopHeader() {
  return (
    <nav aria-label="Global" className="hidden md:block">
      <ul className="flex items-center gap-6 text-sm">
        <Search className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75" />
        <li>
          <Link
            className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
            href="/releases"
          >
            Releases
          </Link>
        </li>
        <li>
          <Link
            className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
            href="/conferences"
          >
            Conferences
          </Link>
        </li>
        <li>
          <Link
            className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
            href="/watch"
          >
            Watch
          </Link>
        </li>
        <li>
          <a
            className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
            href="/blog"
          >
            Blog
          </a>
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  )
}
