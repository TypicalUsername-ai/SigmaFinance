import { useContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import { SupabaseContext } from './supabaseContext'
import { getAllCoins } from './functions/coins';
import CoinCard from './components/CoinCard';

function App() {

  const supabase = useContext(SupabaseContext);

  const [user, setUser] = useState({});
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    supabase.auth.getUser().then(
      data => setUser(data)
    )
    getAllCoins().then(
      data => setCoins(data)
    )
  }, [])

  return (
    <div className='h-screen w-screen'>
      <Navbar />
      <h1> We support the following coins: </h1>
      <div className='grid grid-cols-3'>
        {coins.slice(0, 24).map(
          name => <div className='col-span-1'>
            <CoinCard symbol={name[0]} name={name[1]} />
          </div>
        )}
      </div>
      <h2> and more...</h2>
    </div>
  )
}

export default App
