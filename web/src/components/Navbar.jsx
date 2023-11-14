import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserTab from './UserTab';

const Navbar = () => {

  const navigate = useNavigate()
  const [query, setQuery] = useState('');

  const onSearch = (query) => {
    navigate(`/search?query=${query}`)
  }

  return (
    <div className="navbar bg-secondary-content p-4 justify-between">
      <div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <img src="/moai.svg" alt="SigmaFinance Logo" />
          </button>
        </div>
        <div className='flex flex row items-end'>
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost normal-case text-xl"> SigmaFinance </Link>
          </div>
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost normal-case text-lg"> Account </Link>
          </div>
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost normal-case text-lg"> Social </Link>
          </div>
        </div>
      </div>
      <div className='m-2 flex felx-row gap-2'>
        <input onChange={(e) => setQuery(e.target.value)} onKeyDownCapture={(e) => { if (e.code == "Enter") { onSearch(query) } }} placeholder='Search' className='input input-bordered rounded-md' />
        <button onClick={() => onSearch(query)} className='btn btn-secondary normal-case text-lg'>Search</button>
        <UserTab/>
      </div>
    </div>
  )
}

export default Navbar
