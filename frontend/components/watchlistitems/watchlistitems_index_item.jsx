import React from 'react';
import { Link } from 'react-router-dom';

const WatchListItemsIndexItem = ({ watchlistitem, deleteWatchListItem}) => (
  <li>
    <Link to={`/watchlistitems/${watchlistitem.ticker}`}>{watchlistitem.company_name}</Link>
    <button onClick={() => deleteWatchListItem(ticker)}>Remove from Watchlist</button>
  </li>
)

export default WatchListItemsIndexItem; 