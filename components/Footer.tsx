import { siteConfig } from "@/config/site"
import { Github, Mail } from "lucide-react"
import { LanguageChanger } from "@/components/LanguageChanger"

export default async function Footer() {
  return (
    <footer>
      <div className="mb-6 mt-14 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <a target="_blank" rel="noreferrer" href={siteConfig.links.mail}>
            <span className="sr-only">Mail</span>
            <Mail className="h-6 w-6" />
          </a>
          <a target="_blank" rel="noreferrer" href={siteConfig.links.github}>
            <span className="sr-only">Github</span>
            <Github className="h-6 w-6" />
          </a>
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-muted-foreground">
          <a target="_blank" href={siteConfig.links.personalSite}>
            {siteConfig.author}
          </a>
        </div>
        <LanguageChanger />
      </div>
    </footer>
  )
}
