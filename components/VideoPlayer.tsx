"use client"

import LiteYouTubeEmbed from "react-lite-youtube-embed"
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"

export const VideoPlayer = ({ url, title }: { url: string; title: string }) => {
  return <LiteYouTubeEmbed id={url} title={title} />
}
