import { useEffect, useMemo, useState } from "react"
import { getAvailableTickers, getPriceHistory } from "../functions/coins"
import { useParams } from 'react-router-dom'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'
import Navbar from "../components/Navbar"
import { canIndexBeFollowed, makeObjectTracked, makeObjectUnTracked, getFavouriteIndex, makeObjectFavourite, makeObjectUnFavourite } from "../functions/userCoins"
import { SupabaseContext } from '../supabaseContext'
import { useContext } from "react"

export const CoinDetailsPage = () => {
  const [against, setAgainst] = useState('usd')
  const [againstList, setAgainstList] = useState([])
  const { coin } = useParams();
  // Selector types
  const [type, setType] = useState('days')
  const [count, setCount] = useState(7)

  // Data states
  const [prices, setPrices] = useState([{ [against]: 1 }]);
  const max = useMemo(() => {
    return prices.reduce((prev, curr) => { return prev[against] >= curr[against] ? prev : curr })
  }, [prices])
  const min = useMemo(() => {
    return prices.reduce((prev, curr) => { return prev[against] >= curr[against] ? prev : curr })
  }, [prices])
  const change = useMemo(() => {
    const initial = prices[0][against] ?? 1;
    const final = prices[prices.length - 1][against] ?? 1;
    const change = (final - initial) / initial * 100;
    return change;
  }, [prices])
  const [canFollow, setCanFollow] = useState(true)
  const [canFavourite, setCanFavourite] = useState(true)
  const [alert, setAlert] = useState(null);
  const supabase = useContext(SupabaseContext);

  useEffect(() => {
    getPriceHistory(coin, against, type, count).then(
      data => setPrices(data),
      err => {
        console.log(err.message)
        setAlert(err.message)
      }
    ),
      getAvailableTickers(coin).then(
        data => setAgainstList(data)
      )

    canIndexBeFollowed(supabase, coin).then(
      (b) => setCanFollow(b)
    )

    getFavouriteIndex(supabase).then(
      data => {
        if (data[0].target_id === coin) {
          setCanFavourite(false);
        } else {
          setCanFavourite(true);
        }
      }
    )
  }, [coin, against, type, count])

  const favouriteAdd = async () => {
    const indexF = await getFavouriteIndex(supabase)
    console.log("indexF ", indexF)
    if(indexF[0] != null){
      if (indexF[0].target_id === coin){
        await makeObjectUnFavourite(supabase, coin);
      } else {
        await makeObjectUnFavourite(supabase, indexF[0].target_id);
        await makeObjectFavourite(supabase, coin);
      }
    } else {
      await makeObjectFavourite(supabase, coin);
    }
    setCanFavourite(!canFavourite);
  }

  return (
    <article className="max-h-screen flex flex-col items-center gap-4">
      <Navbar />
      <div className="w-4/5 h-5/6">
        <div className="flex flex-row w-full justify-between">
          <h1 className="text-primary font-bold text-3xl"> Coin name: {coin} </h1>
          <button className="btn btn-primary rounded-xl"
            onClick={() => {
              if (canFollow) {
                makeObjectTracked(supabase, true, coin);
              } else {
                makeObjectUnTracked(supabase, coin);
              }
            }}
          > {canFollow ? 'Add to tracked' : 'remove index tracking'} </button>
          <button  className="btn btn-primary rounded-xl"
          onClick={favouriteAdd}
          >
            {canFavourite ? 'Add to Favourite' : 'Remove from favourite'}
          </button>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <h2 className="stat-title"> Today's price </h2>
            <h2 className="stat-value">  1 {coin} = {prices[0][against]?.toFixed(3) ?? 'loading...'} {against} </h2>
          </div>
          <div className="stat">
            <h2 className="stat-title"> Highest price </h2>
            <h2 className="stat-value">  {max[against]?.toFixed(3) ?? 'loading...'} {against}</h2>
            <p className="stat-desc"> at {max['date']}</p>
          </div>
          <div className="stat">
            <h2 className="stat-title"> Lowest price </h2>
            <h2 className="stat-value"> {min[against]?.toFixed(3) ?? 'loading...'} {against}</h2>
            <p className="stat-desc"> at {min['date']}</p>
          </div>
          <div className="stat">
            <h2> Price change </h2>
            <h2 className={`stat-value ${change >= 0 ? 'text-success' : 'text-error'}`}> {change >= 0 ? '+' : null}{change.toFixed(2)} %</h2>
            <p className="stat-desc"> since last {count} {type}</p>
          </div>
          <div className="stat">
            <h2> Compared </h2>
            <select value={against} onChange={e => setAgainst(e.target.value)} className="stat-value select select-ghost border-none">
              {againstList.map(
                (entry) => <option key={entry}> {entry} </option>
              )}
            </select>
            <p className="stat-desc"> since last {count} {type}</p>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row gap-3 items-center p-4">
            <p>Last {count}</p>
            <select className="select select-bordered rounded-lg" onChange={e => setType(e.target.value)}>
              <option value="days">days</option>
              <option value="weeks">weeks</option>
              <option value="months">months</option>
            </select>
          </div>
          <input type="range" min="2" max="10" value={count} onChange={e => setCount(e.target.value)} className="range m-4" step="1" />

          <LineChart width={1000} height={300} data={prices} margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
            <Line type="monotone" label="date" dataKey={against} stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis label="price" type="number" domain={([min, max]) => {
              console.log("ins:", min, max)
              if (!isFinite(min) || !isFinite(max)) {
                return [0, 0]
              }
              const values = [(min - min * 0.1).toFixed(3), (max + max * 0.1).toFixed(3)];
              console.log("outs:", values);
              return values
            }} />
          </LineChart>
        </div>
      </div>

      {alert ?
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Error! Task failed successfully.</span>
        </div>
        : null
      }
    </article>
  )
}
