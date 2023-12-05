import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from 'react'
import { SupabaseContext } from '../supabaseContext'
import { getAllCoins } from '../functions/coins';
import CoinCard from '../components/CoinCard';
import BigCoinCard from "../components/BigCoinCard";
import { getTrackedIndices } from "../functions/userCoins";

export default function AccountPage () {

    const supabase = useContext(SupabaseContext);
    const [coins, setCoins] = useState([]);
    const [filterData, setFilterData] = useState([]); 

    useEffect(() => {
        supabase.auth.getUser().then(
          //data => console.log(data)
        )
        getAllCoins().then(
          data => {
            shuffleArray(data)
            console.log("Dane z GetAllCoins", data)
             
            let filteredArray = filterArray(data)
            setCoins(coins) 
          }
        )
      }, [])

      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (array.length));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }

      function filterArray(array){
       console.log("Array", array[1])
       getTrackedIndices(supabase).then(
          data => {
            console.log("Data", data[0].target_id)
            console.log("Array", array[0][0])
            let result = []
            console.log("Result before loop", result)
            for (let i = 0; i<data.length; i++){
              const tmp = array.filter((element) => data[i].target_id === element[0])
              console.log("tmp", tmp)
              result.push(tmp)
              console.log("Result after iteration", result)
            }
            console.log("Result", result)
        } 
       )
      }

    return (
        <div  className='h-screen w-screen '>
            <Navbar/>
            <section className="m-10">
              <h1 className="text-4xl">Welcome back</h1>
                <h2  className="text-3xl m-auto my-0  w-1/2 mt-20">Your favourite index:</h2>
                <BigCoinCard
                name="TEST"
                symbol="TEST"
              />              
            </section>
            <section className="m-10">
              <h1 className="text-4xl">Tracked Indices</h1>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                  {coins.slice(0, 24).map(
                    name => <div className='col-span-1'>
                      <CoinCard symbol={name[0]} name={name[1]} />
                    </div>
                  )}
              </div>
            </section>
            

        </div>
    );
}