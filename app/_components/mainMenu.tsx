import Link from "next/link";

export default function MainMenu() {




  return (


    <div className="flex flex-col items-center">
      <h1 className="text-5xl m-10"> Gomoku!</h1>

      <Link href={""} className="m-3">
        Single player
      </Link>
      <Link href={"../2playerlocal/"} className="m-3">
        Local multiplayer
      </Link>
      <Link href={""} className="m-3">
        Online multiplayer</Link>
    </div>
  )
}
