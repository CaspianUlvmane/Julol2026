import Link from "next/link"
import beers from "@/app/beer.json"
import BeerRating from "@/components/beer-rating"

type Beer = (typeof beers)[number]

export default function BeerPage({ beer }: { beer: Beer }) {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-3xl flex-col gap-6 p-8 text-white">
      <Link href="/" className="w-fit underline underline-offset-4">
        ←Tillbaka till listan
      </Link>

      <article className="flex flex-col gap-6 rounded-2xl bg-primary/40 p-6 shadow-lg backdrop-blur-sm sm:flex-row">
        <img
          src={beer.imageUrl}
          alt={beer.name}
          width={300}
          height={300}
          className="max-h-80 w-full rounded-lg object-contain sm:w-1/2"
        />
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">{beer.name}</h1>
          <p>{beer.brewery}</p>
          <p>{beer.style}</p>
          <p>{beer.abv}% ABV</p>
          <p>{beer.description}</p>
          <BeerRating key={beer.id} beerId={beer.id} />
          <a
            href={beer.link}
            target="_blank"
            rel="noreferrer"
            className="mt-2 w-fit underline underline-offset-4"
          >
            Systembolagets produktsida
          </a>
        </div>
      </article>
    </main>
  )
}
