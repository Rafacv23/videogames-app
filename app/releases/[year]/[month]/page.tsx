export default async function Page({
  params,
}: {
  params: { year: string; month: string }
}) {
  async function getData() {
    const res = await fetch("http://localhost:3000/api/releases/2024/10")
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data")
    }

    return res.json()
  }

  const data = await getData()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        Games released in {params.year} {params.month}
        {data.games.map((game) => (
          <div key={game.id}>{game.name}</div>
        ))}
      </div>
    </main>
  )
}
