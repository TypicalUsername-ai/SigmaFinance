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
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React haha</h1>
      <div className="w-10 card btn">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
