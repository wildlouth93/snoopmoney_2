import React from 'react';
import { Link } from 'react-router-dom';

const HoldingIndexItem = ({ holding, deleteHolding, updateHolding }) => (
  <li>
    <Link to={`/holdings/${holding.ticker}`}>{holding.company_name}</Link>
    <button onClick={(holding) => updateHolding(holding)}>Buy More</button>
    <button onClick={() => deleteHolding(ticker)}>Sell Stock</button>
  </li>
)

export default HoldingIndexItem; 