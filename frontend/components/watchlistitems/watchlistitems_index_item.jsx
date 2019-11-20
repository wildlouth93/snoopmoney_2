import React from 'react';
import { Link } from 'react-router-dom';
import MiniChart from '../stocks/mini_chart';

const WatchListItemsIndexItem = ({ watchlistitem, deleteWatchListItem}) => (
  <li className="side-bar-el">
    <ul>
      <li><Link to={`/stocks/${watchlistitem.ticker}`}>{watchlistitem.ticker}</Link></li>
      <li><p>{watchlistitem.price}</p></li>
      <li><p>{watchlistitem.change_percent_s}</p></li>
      <li><MiniChart data={watchlistitem.one_day_chart} /></li> 
    </ul>
  </li>
)

export default WatchListItemsIndexItem; 