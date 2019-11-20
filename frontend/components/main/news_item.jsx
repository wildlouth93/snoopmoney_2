import React from 'react';
import { Link } from 'react-router-dom';
import watchListItemsReducer from '../../reducers/watchlistitems';

const NewsItem = ({ newsItem, watchlistitem }) => (
  <li className="news-item">
    <ul>
      <li><p>Source: {newsItem.source}</p></li>
      <li><p>Date: {newsItem.datetime}</p></li>
      <li><h4>{newsItem.headline}</h4></li>
      <li><p>Summary: {newsItem.summary}</p></li>
      <li><p>{watchlistitem.ticker}</p></li>
      <li><p>{watchlistitem.change_percent_s}</p></li>
      {/* <li><p>Related: {newsItem.related}</p></li> */}
      <li><Link to={`${newsItem.url}`}>Link to Article</Link></li>
    </ul>
  </li>
)

export default NewsItem; 