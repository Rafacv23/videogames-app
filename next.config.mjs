const isDev = process.argv.indexOf("dev") !== -1
const isBuild = process.argv.indexOf("build") !== -1
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = "1"
  const { build } = await import("velite")
  await build({ watch: isDev, clean: !isDev })
}

/** @type {import('next').NextConfig} */
export default {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shared.akamai.steamstatic.com",
        pathname: "/store_item_assets/steam/apps/**",
      },
      {
        protocol: "https",
        hostname: "external-content.duckduckgo.com",
        pathname: "/iu/**",
      },
      {
        protocol: "https",
        hostname: "assets.nintendo.com",
        pathname: "/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "cdn.releases.com",
        pathname: "/img/image/**",
      },
    ],
  },
}
