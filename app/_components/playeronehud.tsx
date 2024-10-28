'use client'


const P1hud = ({ data }) => {

  const turn = ""

  if (!data) {
    data = { turn: "black" }
  }


  return (
    <>
      <div className="sticky bottom-0 bg-red-500 font-black">
        <h1>{data.turn ? data.turn : "hello"}</h1>
      </div>

    </>
  )
}





export default P1hud
