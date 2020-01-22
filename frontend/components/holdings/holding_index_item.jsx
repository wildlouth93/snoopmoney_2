import React from 'react';
import { Link } from 'react-router-dom';
import MiniChart from '../stocks/mini_chart';

const HoldingIndexItem = ({ holding, deleteHolding, updateHolding }) => (
  <li className="side-bar-el">
    <Link to={`/stocks/${holding.ticker}`}>
    <ul>
      <li className="dropdown-name">{holding.ticker}
        <p>{holding.num_shares} Shares</p>
      </li>
      <li><MiniChart data={holding.oneDayChart} stroke={holding.stroke} /></li>
      {/* <li><p>${holding.cost_basis}</p></li> */}
      <li><p>${holding.price}</p>
        <p style={{ color: holding.stroke}}>{holding.oneDayChange}%</p>
      </li>
      {/* <li><p>${holding.price * holding.num_shares}</p></li> */}
     
    </ul>
    </Link>
  </li>
)

export default HoldingIndexItem; 