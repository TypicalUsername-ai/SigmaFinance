import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from 'react'
import { SupabaseContext } from '../supabaseContext'
import { getAllCoins, getCoinName, getCoinPrice } from '../functions/coins';
import CoinCard from '../components/CoinCard';
import BigCoinCard from "../components/BigCoinCard";
import { getTrackedIndices, getFavouriteIndex } from "../functions/userCoins";

export default function AccountPage() {

  const supabase = useContext(SupabaseContext);
  const [coins, setCoins] = useState([]);
  const [favourite, setFavourite] = useState(null);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    supabase.auth.getUser().then(
      //data => console.log(data)
    )
    getAllCoins().then(
      data => {
        // shuffleArray(data)
        console.log("Dane z GetAllCoins", data)

        filterArray(data).then(
          (filtered) => setCoins(filtered)
        )
      }
    )
    getFavouriteIndex(supabase).then(
      data => {
        getCoinName(data[0].target_id).then(
          coin => {
            setFavourite({name: coin, symbol: data[0].target_id})
          }
        )
      }
    )

  }, [])

  const filterArray = async (array) => {
    console.log("Array", array[1])
    const data = await getTrackedIndices(supabase)
    console.log("Data", data[0].target_id)
    console.log("Array", array[0][0])
    let result = []
    console.log("Result before loop", result)
    for (let i = 0; i < data.length; i++) {
      const tmp = array.filter((element) => data[i].target_id === element[0])[0]
      console.log("tmp", tmp)
      result.push(tmp)
      console.log("Result after iteration", result)
    }
    console.log("Result", result)
    return result
  }


  return (
    <div className='h-screen w-screen '>
      <Navbar />
      {favourite != null ? <section className="m-10">
        <h1 className="text-4xl">Welcome back</h1>
        <h2 className="text-3xl m-auto my-0  w-1/2 mt-20">Your favourite index:</h2>
        <BigCoinCard
          name={favourite.name}
          symbol={favourite.symbol}
        />
      </section> : null }
      <section className="m-10">
        <h1 className="text-4xl">Tracked Indices</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {coins.map(
            name => <div className='col-span-1'>
              <CoinCard symbol={name[0]} name={name[1]} />
            </div>
          )}
        </div>
      </section>


    </div>
  );
}