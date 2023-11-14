import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js'
import UserTab from './UserTab';
import { getAllCoins } from '../functions/coins';

const Navbar = () => {

  const [coins, setCoins] = useState(new Fuse());
  const [queried, setQueried] = useState([]);

  useEffect(() => {
    getAllCoins().then(
      data => setCoins(new Fuse(data.map((d) => { return {symbol: d[0], name: d[1]} }), {keys: ['symbol', 'name']}))
    )
  } , [])

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
        <div class="dropdown">
          <input 
            tabIndex={0}
            onChange={(e) => setQueried(coins.search(e.target.value))}  
            placeholder='Search' className='input input-bordered rounded-md' />
          <div tabIndex={0} class="dropdown-content z-[40] p-2 bg-primary-content flex flex-col">
            {queried.map(
              (entry) => <Link 
                className='p-2 btn btn-ghost rounded'
                to={`/coin/${entry.item.symbol}`}>
                {entry.item.name} (${entry.item.symbol})</Link>
            )}
          </div>
        </div>  
      </div>
      <div className='m-2 flex flex-row gap-2'>
      <UserTab/>
      </div>
    </div>
  )
}

export default Navbar
