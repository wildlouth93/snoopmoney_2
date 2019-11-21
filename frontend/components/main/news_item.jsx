import React from 'react';
import { Link } from 'react-router-dom';
import watchListItemsReducer from '../../reducers/watchlistitems';

const NewsItem = ({ newsItem, watchlistitem }) => (
  <li className="news-item">
    <Link to={`${newsItem.url}`}>
      <div>
        <h5>{newsItem.source} 1d</h5>
        {/* <li>{newsItem.datetime}</li> */}
        <h4>{newsItem.headline}</h4>
        <p>{newsItem.summary}</p>
        <h6>{watchlistitem.ticker} {watchlistitem.change_percent_s}</h6>

        {/* <li><p>Related: {newsItem.related}</p></li> */}
        <img src={window.images.stock_news_image}/>
      
      </div>
    </Link>
  </li>
)

export default NewsItem; 