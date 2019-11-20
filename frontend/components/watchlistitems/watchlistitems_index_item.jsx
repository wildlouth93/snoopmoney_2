import React from 'react';
import { Link } from 'react-router-dom';
import MiniChart from '../stocks/mini_chart';

const WatchListItemsIndexItem = ({ watchlistitem, deleteWatchListItem}) => (
  <li className="side-bar-el">
    <ul>
      <li className="wl-ticker-li"><Link className="wl-ticker-link" to={`/stocks/${watchlistitem.ticker}`}>{watchlistitem.ticker}</Link></li>
      <li><MiniChart data={watchlistitem.one_day_chart}/></li> 
      <li><p>{watchlistitem.price}</p>
        <p>{watchlistitem.change_percent_s}</p>
      </li>      
    </ul>
  </li>
)

export default WatchListItemsIndexItem; 