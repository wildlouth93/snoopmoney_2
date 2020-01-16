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
  constructor(props) {
    super(props);

    this.state = {
      stockNews: {}
    }

  // this.getNews = this.getNews.bind(this);
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.props.requestHoldings();
      this.props.requestWatchListItems();
      // this.getNews();
    }
  }

  // async getNews() {
    
  //   let stockSymbol = 'AAPL'
  //   let API_Key = 'Hf0MMau5ZrxHPGQ50amdyul8TxL7fixY';

  //   const api_call = await fetch(`https://api.unibit.ai/v2/company/news?tickers=${stockSymbol}&accessKey=${API_Key}`);

  //   const data = await api_call.json();

  //   this.setState({ stockNews: data });

  // }

  render() {
    // console.log(this.state.stockNews);
    const { currentUser, logout, holdings, watchlistitems, stocks} = this.props; 

    if (!currentUser) {
      return <MainOut />
    }

    if (holdings.length === 0) return null; 
    if (watchlistitems.length === 0) return null; 
    let networth = parseInt(currentUser.net_worth).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    let data2 = Array.apply(null, Array(39)).map(function () { return { average: 0 } }); 

    holdings.forEach(holding => {
      holding.one_day_chart.forEach((datapoint, idx) => {
        data2[idx].average += (datapoint.average * holding.num_shares)
      })
    });

    const fakeNewsItem = {};
    fakeNewsItem.url = "google.com";
    fakeNewsItem.source = "Reuters";
    fakeNewsItem.headline = "Apple, Intel file antitrust case vs SoftBank-owned firm over patent practices";
    fakeNewsItem.summary = "SAN FRANCISCO(Reuters) - Apple Inc(AAPL.O) and Intel Corp(INTC.O) on Wednesday filed an antitrust lawsuit against Fortress Investment Group, alleging the SoftBank Group Corp(9984.T) unit stockpiled patents to hold up tech firms with lawsuits demanding as much as $5.1 billion.";

    const main = currentUser ? (
      <div>
        <div className="main-info">
          <h3>${networth}</h3>
          {/* <p>{data2[38] - data2[0]}</p> */}
          <p>{(holdings[0].change_percent_s)}Today</p>
       </div>
       <div className="side-bar-charts">
          <div className="main-charts">
            {/* <StockChart data={holdings[0].one_day_chart} dataKey="average" className="main-chart"/> */}
            { <StockChart data={data2} dataKey="average" className="main-chart"/> }
            
            <ul>
              <li>1D</li>
              <li>1W</li>
              <li>1M</li>
              <li>3M</li>
              <li>1Y</li>
              <li>ALL</li>
            </ul>
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
        </div>
        <br />
        <div className="main-news">
          <h3>News</h3>
          {
            watchlistitems.map((watchlistitem, i) => (
              watchlistitem.news.map((newsItem,j) => (
                <div>
                  <NewsItem 
                    newsItem={fakeNewsItem}
                    key={(i*j)}
                    watchlistitem={watchlistitem}
                  />
                  <NewsItem
                    newsItem={newsItem}
                    key={newsItem.datetime}
                    watchlistitem={watchlistitem}
                    className="news-item"
                  />
                </div>
              ))
            ))
          }
        </div>
      <p className="reference">Stock information received from external API, <a href="https://iexcloud.io">IEX Cloud Console. </a></p>
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