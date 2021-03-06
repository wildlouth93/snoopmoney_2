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
import MainChartDiv from './main_chart_div';


class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      stockNews: {},
      networth: null,
      stockData: {},
      watchlistData: {},
      timePeriod: '1d'
    }
    
    // this.toggleTimeState = this.toggleTimeState.bind(this);

  // this.getNews = this.getNews.bind(this);

  }

  // toggleTimeState() {
  //   if (this.state.timePeriod === '1d') {
  //     this.setState({timePeriod: '5d'})
  //   }
  //   if (this.state.timePeriod === '5d') {
  //     this.setState({timePeriod: '1d'})
  //   }
  // }

  componentDidMount() {
    if (this.props.currentUser) {
      this.props.requestHoldings()
        .then(() => {
          let networth = parseInt(this.props.currentUser.net_worth).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
          this.getStocks();
          this.setState({networth: networth})
        });
      this.props.requestWatchListItems()
        .then(() => {
          this.getWatchlistItems();
        });
    }
  }  

  getStocks() {
    let symbols = [];
    this.props.holdings.map((holding, i) => {
      symbols.push(holding.ticker.toLowerCase())
    })
    symbols = symbols.join(',');

    fetch(`https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=quote,news,chart,stats&range=1d&last=5&token=pk_c0d9b6069cf349fbb1fc607a8f129ff9`)
      .then((result) => result.json())
      .then((result) => {
        this.setState( { stockData: result, loading: false });
      })
  }

  getWatchlistItems() {
    let symbols = [];
    this.props.watchlistitems.map((watchlistitem, i) => {
      symbols.push(watchlistitem.ticker.toLowerCase())
    })
    symbols = symbols.join(',');

    fetch(`https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=quote,news,chart,stats&range=1d&last=5&token=pk_c0d9b6069cf349fbb1fc607a8f129ff9`)
      .then((result) => result.json())
      .then((result) => {
        this.setState({ watchlistData: result, loading: false });
      })

  }

  // `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=quote,news,chart,stats&range=1d&last=5&token=Tpk_8945ca6a137b40068a66f5257e5ac120`

  // Tpk_8945ca6a137b40068a66f5257e5ac120
  render() {
    const { currentUser, logout, holdings, watchlistitems, stocks } = this.props;
  
    if (!currentUser) {
      return <MainOut />
    }

    if (this.state.loading || !this.state.networth) {
      return <div className="loader-container"><div className="loader"></div></div>
    }

    if (holdings.length === 0) return null;
    if (watchlistitems.length === 0) return null;

    let newsItemsArr = [];
    Object.values(this.state.stockData).forEach((stock, i) => {
      // newsItemsArr.push(stock.news[i])
      stock.news.forEach((newsItem, i) => {
        newsItemsArr.push(newsItem);
      })
    })
    
    

    // let networth = parseInt(currentUser.net_worth).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    let data2 = Array.apply(null, Array(78)).map(function () { return { average: 0 } }); 
    // let miniData = Array.apply(null, Array(78)).map(function () { return { average: 0 } }); 

    Object.values(this.state.watchlistData).map((stock, i) => {
      watchlistitems[i].price = stock.quote.latestPrice.toFixed(2);
      watchlistitems[i].oneDayChange = (stock.quote.changePercent * 100).toFixed(2);
      watchlistitems[i].oneDayChart = Array.apply(null, Array(39)).map(function () { return { average: 0 } });

      if (watchlistitems[i].oneDayChange < 0) {
        watchlistitems[i].stroke = 'red';
      } else {
        watchlistitems[i].stroke = '#21ce99'
      }

      stock.chart.map((datapoint,idx) => {
        if (idx % 10 === 0) {
          watchlistitems[i].oneDayChart[idx/10].average = datapoint.average;
        }
      })
    })

    Object.values(this.state.stockData).map((stock, i) => {
      // holdings[i].oneDayChart = Array.apply(null, Array(78)).map(function () { return { average: 0 } }); 
      holdings[i].price = stock.quote.latestPrice.toFixed(2);
        holdings[i].oneDayChange = (stock.quote.changePercent * 100).toFixed(2);
      holdings[i].oneDayChart = Array.apply(null, Array(39)).map(function () { return { average: 0 } });

      if (holdings[i].oneDayChange < 0) {
        holdings[i].stroke = 'red';
      } else {
        holdings[i].stroke = '#21ce99';
      }

        stock.chart.map((datapoint, idx) => {
        // data2[idx].average += (datapoint.average * holdings[stock.ticker].num_shares)
        if (idx % 5 === 0) {
          data2[idx/5].label = datapoint.label;
          data2[idx/5].average += ((datapoint.average) * holdings[i].num_shares)
        }  
        // holdings[i].oneDayChart[idx] = data.point.average;
        // data2[idx].label = datapoint.label;
        // data2[idx].average += ((datapoint.average) * holdings[i].num_shares)
        if (idx % 10 === 0) {
          holdings[i].oneDayChart[idx/10].average = datapoint.average;
        }
      })
    })


    let data3 = [];
    let sum = 0;
    let sumsq = 0
    data2.map((datapoint, idx) => {
      datapoint.average = datapoint.average + parseInt(currentUser.account_balance);
     
      sum += datapoint.average;
      sumsq += (datapoint.average * datapoint.average)

      let mean = sum / (idx + 1);
      let variance = sumsq / (idx+1) - (mean * mean);
      let sd = Math.sqrt(variance);

      if (datapoint.average > mean - (1 * sd) && datapoint.average < mean + (1 *sd)) {
        datapoint.average = parseInt(datapoint.average).toFixed(2);
        datapoint.label = datapoint.label
        data3.push(datapoint)
      }
    })

    let mainChart;
    let listItems;



    // if (this.state.timePeriod === '1y' || this.state.timePeriod === 'all') {
    //   mainChart = <MainChartDiv currentUser={this.props.currentUser} holdings={this.props.holdings} timePeriod='1y' />
    // }

    // if (this.state.timePeriod === '1d') {
    //   mainChart = <MainChartDiv currentUser={this.props.currentUser} holdings={this.props.holdings} timePeriod='1d' />
    // }

    // if (this.state.timePeriod === '1m') {
    //   mainChart = <MainChartDiv currentUser={this.props.currentUser} holdings={this.props.holdings} timePeriod='1m' />
    // }

    // if (this.state.timePeriod === '5d') {
    //   mainChart = <MainChartDiv currentUser={this.props.currentUser} holdings={this.props.holdings} timePeriod='5d' />
    // }

    mainChart = <MainChartDiv currentUser={this.props.currentUser} holdings={this.props.holdings} />

    const main = currentUser ? (
      <div>
        <div className="main-info">
          <h3>${this.state.networth}</h3>
          {/* <p>{data2[38] - data2[0]}</p> */}
          <p>{(holdings[0].change_percent_s)}Today</p>
       </div>
       <div className="side-bar-charts">
          {/* <div className="main-charts"> */}
            {/* <StockChart data={holdings[0].one_day_chart} dataKey="average" className="main-chart"/> */}
            {/* { <StockChart data={data3} dataKey="average" className="main-chart"/> } */}
            {/* <ul>
              <li className="selected">1D</li>
              <li>5D</li>
              <li>1M</li>
              <li>3M</li>
              <li>1Y</li>
              <li>ALL</li>
            </ul> */}
            {/* {listItems} */}
          {/* </div> */}
          <div> 
            {mainChart}
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
              newsItemsArr.map((newsItem,i) => (
                <div>
                  <NewsItem
                    newsItem={newsItem}
                    key={newsItem.datetime}
                    watchlistitem={newsItem}
                    className="news-item"
                  />
                </div>
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