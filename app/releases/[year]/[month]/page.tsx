export default function Page({
  params,
}: {
  params: { year: string; month: string }
}) {
  return (
    <div>
      Games released in {params.year} {params.month}
    </div>
  )
}
