import { useEffect, useState } from "react"
import { getCoinPrice, getPriceHistory } from "../functions/coins"
import { useParams } from 'react-router-dom'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'
import Navbar from "../components/Navbar"
import { canIndexBeFollowed, makeObjectTracked, makeObjectUnTracked } from "../functions/userCoins"
import { SupabaseContext } from '../supabaseContext'
import { useContext } from "react"

export const CoinDetailsPage = () => {

  const [track, setTrack] = useState();
  const against = 'usdt'
  const { coin } = useParams();
  const [type, setType] = useState('days')
  const [count, setCount] = useState(7)
  const init = [{}]
  init[0][against] = 10
  const [prices, setPrices] = useState(init);
  const [alert, setAlert] = useState(null);
  const supabase = useContext(SupabaseContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPriceHistory(coin, against, type, count);
        setPrices(data);

        const isIndexFollowed = await canIndexBeFollowed(supabase, coin);
        
        if (isIndexFollowed) {
          document.getElementById("button-container").style.display = "block"
          document.getElementById("button-add").style.display = "block"
          document.getElementById("button-delete").style.display = "none"
        } else {
          document.getElementById("button-container").style.display = "block"
          document.getElementById("button-add").style.display = "none"
          document.getElementById("button-delete").style.display = "block"
        }
      } catch (err) {
        console.log(err.message);
        setAlert(err.message);
      }
    };

    fetchData();
  }, [coin, against, type, count, supabase]);
  
  return (
  <article className="max-h-screen ">
    <Navbar/>
    <section className="flex justify-between my-10">
      <section className="basis-3/4">
            <h1> Coin name: {coin} </h1>
            
            <h2> Today's price: 1 {coin} = {prices[0][against]} {against} </h2>
            <h3> Highest price (in range): {Object.values(prices.reduce((prev, curr) => { return prev[against] >= curr[against] ? prev : curr})).join(' at ')} {against}</h3>
            <h3> Lowest price (in range): {Object.values(prices.reduce((prev, curr) => { return prev[against] <= curr[against] ? prev : curr})).join(' at ')} {against}</h3>

              <form>
              <select onChange={e => setType(e.target.value)}>
                  <option value="days">days</option>
                  <option value="weeks">weeks</option>
                  <option value="months">months</option>
              </select>
              <input type="number" value={count} onChange={e => e.target.value >= 0 ? setCount(e.target.value) : 0}/>
            </form>
      </section>
      <div id="button-container">
        <button onClick={() => makeObjectTracked(supabase, true, coin )}  className="btn btn-primary" id="button-add">Add to Tracked</button>
        <button onClick={() => makeObjectUnTracked(supabase, coin)}  className="btn btn-primary" id="button-delete">Remove from Tracked</button>
      </div>

   </section>

      

    <LineChart width={1000} height={300} data={prices} margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
      <Line type="monotone" label="date" dataKey={against} stroke="#8884d8" />    
      <CartesianGrid stroke="#ccc"/>
      <XAxis dataKey="date" />
      <YAxis label="price" type="number" domain={([min, max]) => {
          console.log("ins:", min, max)
          const values = [(min - min * 0.1).toFixed(3), (max + max * 0.1).toFixed(3)]; 
          console.log("outs:", values); 
          return values}}/>
    </LineChart>   
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
