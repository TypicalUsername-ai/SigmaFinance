import { useState, useContext, useEffect } from "react"
import { SupabaseContext } from "../supabaseContext"
import { Link } from "react-router-dom"
import { getTrackedIndices, makeObjectFavourite } from "../functions/userCoins"

const UserTab = () => {
  const supabase = useContext(SupabaseContext)
  const [data, setData] = useState(null)

  useEffect(() => {
    getTrackedIndices(supabase)
    makeObjectFavourite(supabase, "UAH")
    supabase.auth.getUser().then(
      data => setData(data.data.user)
    )
  }, [])

  const logOut = () => {
    supabase.auth.signOut().then(
      ok => window.location = "/"
    )
  }
  
  if (data == null) {
    return <Link to='/login' className='btn btn-primary'>Log in</Link>
  } else {
    return <div className="flex flex-row p-2 h-full w-fit bg-primary rounded-2xl content-center items-center gap-2">
        <p className="text text-black font-bold text-lg">{data.email.split('@')[0]}</p>
        <button className="btn btn-error" onClick={logOut}> Log out </button>
      </div>
  }
}

export default UserTab
