import { useEffect, useState } from "react"
import { getAllCoins } from "../functions/coins"

export const CoinsList = () => {

  let [coins, setCoins] = useState([])

  useEffect(() => {
    getAllCoins().then(
      data => setCoins(data)
    )
  }, [])
  
  return (
    <article>
      {coins.map(
        coin => <a key={coin[0]} href={`/coin/${coin[0]}`} style={{width: '100%'}}>{coin[1]} ({coin[0]})</a>
      )}
    </article>
  )
}

