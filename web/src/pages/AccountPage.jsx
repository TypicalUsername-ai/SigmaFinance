import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from 'react'
import { SupabaseContext } from '../supabaseContext'
import { getAllCoins } from '../functions/coins';
import CoinCard from '../components/CoinCard';
export default function AccountPage () {

    const supabase = useContext(SupabaseContext);
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        supabase.auth.getUser().then(
          data => console.log(data)
        )
        getAllCoins().then(
          data => {
            shuffleArray(data)
            setCoins(data)
          }
        )
      }, [])

    return (
        <div  className='h-screen w-screen'>
            <Navbar/>
            <h1>Welcome</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {coins.slice(0, 24).map(
                name => 
                    <div className='col-span-1'>
                    <CoinCard symbol={name[0]} name={name[1]} />
                    </div>
                )}
            </div>
        </div>
    );
}