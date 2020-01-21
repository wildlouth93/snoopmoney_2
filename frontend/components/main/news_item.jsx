import React from 'react';
import { Link } from 'react-router-dom';
import watchListItemsReducer from '../../reducers/watchlistitems';

const NewsItem = ({ newsItem, watchlistitem }) => (
  <li className="news-item">
    <Link to={`${newsItem.url}`}>
      <div>
        <div className="news-content">
        <h5>{newsItem.source} 1d</h5>
        {/* <li>{newsItem.datetime}</li> */}
        <h4>{newsItem.headline}</h4>
        <p>{newsItem.summary}</p>
        {/* <h6>{watchlistitem.ticker} {watchlistitem.change_percent_s}</h6> */}
        </div>

        {/* <li><p>Related: {newsItem.related}</p></li> */}
        <div className="news-image">
        {/* <img src={window.images.stock_news_image}/> */}
        <img src={newsItem.image} />
        </div>
      
      </div>
    </Link>
  </li>
)

export default NewsItem; 