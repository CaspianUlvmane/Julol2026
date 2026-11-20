import Link from "next/link"
import ShareQr from "@/components/share-qr"
import beers from "./beer.json"

const beerList = beers.map((beer) => (
  <Link
    key={beer.id}
    href={`/beers/${beer.id}`}
    className="duration-3000. flex items-center justify-center gap-4 rounded-2xl bg-primary/40 p-4 text-center text-white drop-shadow-lg transition-all hover:scale-105 hover:cursor-pointer hover:opacity-50 hover:shadow-lg hover:backdrop-blur-sm hover:[&_img]:scale-110 hover:[&_p]:translate-y-0"
  >
    <div className="flex flex-col">
      <h3 className="font-bold text-white">{beer.name}</h3>
      <img
        src={beer.imageUrl}
        alt={beer.name}
        style={{ objectFit: "contain", maxHeight: "300px" }}
      />
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
          <header className="flex justify-center">
            <ul className="grid max-w-md justify-center gap-4 align-middle md:grid-cols-2 lg:grid-cols-3">
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
