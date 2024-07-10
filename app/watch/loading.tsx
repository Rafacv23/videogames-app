import Loader from "@/components/Loader"

export default function loading() {
  return (
    <main className="max-w-3xl mx-auto p-6 h-screen flex flex-col justify-center items-center">
      <Loader />
    </main>
  )
}
