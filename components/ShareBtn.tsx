"use client"

import { Instagram, Share2 } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {
  FacebookShareButton,
  EmailShareButton,
  InstapaperShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditIcon,
  TelegramIcon,
  WhatsappIcon,
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
} from "react-share"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"

export default function ShareBtn() {
  const pathname = usePathname()
  const url = `${siteConfig.url}${pathname}`
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>
          <Share2 className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Share</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="items-center justify-center flex">
        <DropdownMenuItem>
          <EmailShareButton url={url}>
            <EmailIcon size={32} round={true} />
          </EmailShareButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FacebookShareButton url={url}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <InstapaperShareButton url={url}>
            <Instagram size={32} />
          </InstapaperShareButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <RedditShareButton url={url}>
            <RedditIcon size={32} round={true} />
          </RedditShareButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <TwitterShareButton url={url}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <TelegramShareButton url={url}>
            <TelegramIcon size={32} round={true} />
          </TelegramShareButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <WhatsappShareButton url={url}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
