import { useContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import { SupabaseContext } from './supabaseContext'
import { getAllCoins } from './functions/coins';
import CoinCard from './components/CoinCard';

function App() {

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

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  return (
    <div className='h-screen w-screen'>
      <Navbar />
      <h1 className='text-3xl text-bold p-4'>
        Some of the <b>{coins.length}</b> supported currencies:
      </h1>
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
