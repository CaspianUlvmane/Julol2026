import Link from "next/link"
import ShareQr from "@/components/share-qr"
import beers from "./beer.json"

const beerList = beers.map((beer) => (
  <Link
    key={beer.id}
    href={`/beers/${beer.id}`}
    className="duration-3000. flex items-center justify-center gap-4 rounded-2xl bg-primary/40 p-4 text-center text-white drop-shadow-lg transition-all hover:scale-105 hover:cursor-pointer hover:opacity-50 hover:shadow-lg hover:backdrop-blur-sm sm:gap-6 hover:[&_img]:scale-105 hover:[&_img]:transition-all hover:[&_img]:duration-500"
  >
    <div className="flex flex-row gap-4">
      <img
        src={beer.imageUrl}
        alt={beer.name}
        style={{ objectFit: "contain", maxHeight: "300px" }}
      />
      <div className="flex w-32 flex-col justify-center gap-1">
        <h3 className="text-xl font-bold text-white">{beer.name}</h3>
        <p className="text-white">{beer.brewery}</p>
        <p className="text-white">{beer.abv}%</p>
      </div>
    </div>
  </Link>
))

export default function Page() {
  return (
    <div className="flex min-h-svh">
      <div className="flex w-full flex-col gap-4 bg-radial from-white/0 via-white/0 via-100% to-white/25 p-8 text-sm leading-loose text-black backdrop-blur-xs sm:via-55%">
        <div className="flex w-full flex-col gap-8">
          <h1 className="text-center font-sans text-4xl font-bold text-white drop-shadow-lg">
            God Julöl!
          </h1>
          <header className="mx-auto max-w-fit">
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {beerList}
            </ul>
          </header>
        </div>
        <footer className="mt-auto text-center text-xs text-white">
          <ShareQr />
        </footer>
      </div>
    </div>
  )
}
