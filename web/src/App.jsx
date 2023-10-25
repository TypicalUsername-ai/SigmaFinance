import { useContext, useEffect, useState } from 'react'
import './mvp.css'
import { SupabaseContext } from './supabaseContext'
import { getAllCoins } from './functions/coins';

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
    <article>
      {JSON.stringify(user)}
      <h1> We support the following coins: </h1>
      {coins.slice(0, 24).map(
        name => <a key={name[0]} style={{width:'25%', padding: '20px'}} href={`/coin/${name[0]}`}>{name[1]}</a>
      )}
      <h2> and more...</h2>
    </article>
  )
}

export default App
