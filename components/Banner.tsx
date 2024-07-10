import { siteConfig } from "@/config/site"
import { Button } from "./ui/button"

export default function Banner() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-pistacho text-3xl font-extrabold text-transparent sm:text-5xl">
            {siteConfig.name}
          </h1>
          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="#">
              <Button>Get started</Button>
            </a>
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
              <Button variant="outline">Github</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
