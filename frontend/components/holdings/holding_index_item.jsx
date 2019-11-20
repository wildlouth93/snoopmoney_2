import React from 'react';
import { Link } from 'react-router-dom';
import MiniChart from '../stocks/mini_chart';

const HoldingIndexItem = ({ holding, deleteHolding, updateHolding }) => (
  <li className="side-bar-el">
    <ul>
      <li><Link to={`/stocks/${holding.ticker}`}>{holding.ticker}</Link></li>
      <li><p>{holding.num_shares} Shares</p></li>
      <li><p>${holding.cost_basis}</p></li>
      <li><p>${holding.price}</p></li>
      <li><p>{holding.change_percent_s}</p></li>
      <li><p>${holding.price * holding.num_shares}</p></li>
      <li><MiniChart data={holding.one_day_chart} /></li>
    </ul>
  </li>
)

export default HoldingIndexItem; 