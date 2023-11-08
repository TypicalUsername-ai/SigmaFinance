import { useContext, useEffect, useState } from 'react'
import './mvp.css'
import { SupabaseContext } from './supabaseContext'

function App() {

  const supabase = useContext(SupabaseContext);

  const [user, setUser] = useState({});

  useEffect(() => {
    supabase.auth.getUser().then(
      data => setUser(data)
    )
  })
  
  return (
    <>
      {JSON.stringify(user)}
    </>
  )
}

export default App
