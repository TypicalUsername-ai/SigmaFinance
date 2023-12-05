import { Link } from 'react-router-dom'

const BigCoinCard = (props) => {
  var name = props.name
  var symbol = props.symbol

  return (
    <div className="card w-1/2 m-auto my-10 h-48 max-h-full max-w-full bg-secondary text-primary-content shadow-md image-full m-4">
      <figure><p className="text-center text-[10em] overflow-hidden">${symbol.toUpperCase()}</p></figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="card-actions justify-end">
          <Link to={`/coin/${symbol}`} className="btn">See more</Link>
        </div>       
      </div>
    </div>)
}

export default BigCoinCard