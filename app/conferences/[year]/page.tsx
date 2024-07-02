import VideogameCard from "@/components/VideogameCard"
import { Game } from "@/lib/types"

export default async function Page({ params }: { params: { year: string } }) {
  async function getData({ year }: { year: string }) {
    // Usar los parámetros pasados para construir la URL de la API
    const url = `http://localhost:3000/api/conferences/${year}`
    const res = await fetch(url)

    if (!res.ok) {
      // Activar el Error Boundary más cercano en caso de fallo
      throw new Error("Failed to fetch data")
    }

    return res.json()
  }

  // Llamar a getData con los parámetros correctos
  const data = await getData(params)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        Conferences in {params.year}
        {data.games.map((game: Game) => (
          <VideogameCard key={game.id} game={game} />
        ))}
      </div>
    </main>
  )
}
