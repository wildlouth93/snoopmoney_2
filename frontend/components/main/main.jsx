import React from 'react';
import MainOut from './main_out'
import { Link } from 'react-router-dom';
import { RECEIVE_WATCHLIST_ITEM } from '../../actions/watchlistitem_actions';
import HoldingIndexItem from '../holdings/holding_index_item';
import WatchListItemsIndexItem from '../watchlistitems/watchlistitems_index_item';
import NewsItem from './news_item';
import MainChart from './main_chart';
import StockChart from '../stocks/stock_chart';
import MiniChart2 from '../stocks/mini_chart';


class Main extends React.Component {
  componentDidMount() {
    this.props.requestHoldings();
    this.props.requestWatchListItems();
  }

  render() {
    const { currentUser, logout, holdings, watchlistitems, stocks} = this.props; 
    if (holdings.length === 0) return null; 
    if (watchlistitems.length === 0) return null; 
    const main = currentUser ? (
      <div>
        <div className="main-info">
          <h3>${currentUser.net_worth}</h3>
          <p>{(holdings[0].change_percent_s)}Today</p>
       </div>
        <div className="main-charts">
          <StockChart data={holdings[0].one_day_chart} dataKey="average" className="main-chart"/>
        </div>
        <div className="main-side-bar">
          <div className="side-bar-head">
            <h3>Stocks</h3>
            <img className="ellipsis" src={window.images.ellipsis_image} />
          </div>
          {
            holdings.map(holding => (
                <HoldingIndexItem className="side-bar-el"
                  holding={holding}
                  key={holding.ticker}
                />
                /* <p>{holding.ticker}</p>
                <p>{holding.num_shares}</p>
                {/* <p>{holding.price}</p>
                <p>{holding.quote.change_percent_s}</p>
                <p>{holding.price * holding.num_shares}</p>
                <p>{holding.quote.change}</p> */
            )) 
          }
          {
          
          }
          <div className="side-bar-head">
            <h3>WatchList</h3>
            <img className="ellipsis" src={window.images.ellipsis_image} />
          </div>
          {
            watchlistitems.map(watchlistitem => (
              <WatchListItemsIndexItem className="side-bar-el"
                watchlistitem={watchlistitem}
                key={watchlistitem.ticker}
              />
            ))
          }
        </div>
        <br />
        <div className="main-news">
          <h3>News</h3>
          {
            watchlistitems.map(watchlistitem=> (
              watchlistitem.news.map(newsItem => (
                <NewsItem
                  newsItem={newsItem}
                  key={newsItem.datetime}
                  watchlistitem={watchlistitem}
                />
              ))
            ))
          }
        </div>
      </div>
    ) : (
        <div>
          <MainOut />
        </div>
      )
    return (
      <div>
        {main}
      </div>
    );
  }
};

export default Main; 