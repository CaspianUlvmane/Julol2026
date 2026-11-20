import BeerPage from "@/components/beer-page"
import beers from "@/app/beer.json"
import { notFound } from "next/navigation"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const beer = beers.find((beer) => beer.id === id)

  if (!beer) {
    notFound()
  }

  return <BeerPage beer={beer} />
}
