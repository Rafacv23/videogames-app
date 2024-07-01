export default function Page({
  params,
}: {
  params: { year: string; month: string }
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        Games released in {params.year} {params.month}
      </div>
    </main>
  )
}
