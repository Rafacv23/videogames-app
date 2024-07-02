import VideogameCard from "@/components/VideogameCard"
import { Game } from "@/lib/types"

export default async function Page({
  params,
}: {
  params: { year: string; month: string }
}) {
  async function getData({ year, month }: { year: string; month: string }) {
    // Usar los parámetros pasados para construir la URL de la API
    const url = `http://localhost:3000/api/releases/${year}/${month}`
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
      <div className="max-w-5xl w-full mx-auto">
        <h1 className="text-xl font-bold mb-4">
          Games in {params.year}/{params.month}
        </h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.games.map((game: Game) => (
            <li key={game.id}>
              <VideogameCard game={game} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
