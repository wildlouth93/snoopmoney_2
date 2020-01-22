import React from 'react';
import { Link } from 'react-router-dom';
import MiniChart from '../stocks/mini_chart';

const WatchListItemsIndexItem = ({ watchlistitem, deleteWatchListItem}) => (
  <li className="side-bar-el">
    <Link className="wl-ticker-link" to={`/stocks/${watchlistitem.ticker}`}>
    <ul>
      <li className="wl-ticker-li">{watchlistitem.ticker}</li>
      <li><MiniChart data={watchlistitem.oneDayChart} stroke={watchlistitem.stroke} /></li> 
      <li><p>{watchlistitem.price}</p>
        <p style={{ color: watchlistitem.stroke }}>{watchlistitem.oneDayChange}%</p>
      </li>      
    </ul>
    </Link>
  </li>
)

export default WatchListItemsIndexItem; 