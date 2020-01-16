import React from 'react';
import { Link } from 'react-router-dom';
import StockChart from './stock_chart';
import NewsItem from '../main/news_item';
import BuyForm from './buy_form';
import SellForm from './sell_form';


class StockShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true, 
      oneDay: false,
      oneWeek: false, 
      oneMonth: false,
      threeMonth: false, 
      oneYear: true, 
      all: false
    };
    this.toggleDayState = this.toggleDayState.bind(this);
    this.toggleWeekState = this.toggleWeekState.bind(this);
    this.toggleMonthState = this.toggleMonthState.bind(this);
    this.toggleThreeMonthState = this.toggleThreeMonthState.bind(this);
    this.toggleYearState = this.toggleYearState.bind(this);
    this.toggleAllState = this.toggleAllState.bind(this);
  }

  componentDidMount() {
    this.props.fetchStock(this.props.match.params.symbol)
      .then(() => this.setState({loading: false}));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.symbol !== this.props.match.params.symbol) {
      this.props.fetchStock(this.props.match.params.symbol)
        .then(() => this.setState({ loading: false }));
    }
  }

  toggleDayState() {
    if (this.state.oneDay === false) {
      this.setState({
        oneDay: true,  
        oneWeek: false, 
        oneMonth: false, 
        threeMonth: false,
        oneYear: false, 
        all: false
      })
    }
  }

  toggleWeekState() {
    if (this.state.oneWeek === false) {
      this.setState({
        oneDay: false,
        oneWeek: true,
        oneMonth: false,
        threeMonth: false,
        oneYear: false, 
        all: false
      })
    }
  }

  toggleMonthState() {
    if (this.state.oneMonth === false) {
      this.setState({
        oneDay: false,
        oneWeek: false,
        oneMonth: true,
        threeMonth: false,
        oneYear: false, 
        all: false
      })
    }
  }

  toggleThreeMonthState() {
    if (this.state.threeMonth === false) {
      this.setState({
        oneDay: false,
        oneWeek: false,
        oneMonth: false,
        threeMonth: true,
        oneYear: false, 
        all: false
      })
    }
  }

  toggleYearState() {
    if (this.state.oneYear === false) {
      this.setState({
        oneDay: false,
        oneWeek: false,
        oneMonth: false,
        threeMonth: false,
        oneYear: true, 
        all: false
      })
    }
  }

  toggleAllState() {
    if (this.state.all === false) {
      this.setState({
        oneDay: false,
        oneWeek: false,
        oneMonth: false,
        threeMonth: false,
        oneYear: false,
        all: true
      })
    }
  }



  render(){ 
    let employees = parseInt(this.props.stock.employees).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    let marketCap = parseInt(this.props.stock.market_cap).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    // let divYield = parseInt(this.props.stock.dividend_yield * 100)).toFixed(2);
    if (this.state.loading || Object.values(this.props.stock).length === 0) {
      return <div className="loader-container"><div className="loader"></div></div>
    }

    let threeMonth = this.props.stock.one_year_chart.slice(200) || null;
    let oneWeek = this.props.stock.company_chart.slice(this.props.stock.company_chart.length - 5) || null;

    let stockChart;
    let list; 

    if (this.state.oneDay) {
      stockChart = <StockChart data={this.props.stock.one_day_chart} dataKey="average" />
      list = <ul>
        <li className="selected" onClick={this.toggleDayState}>1D</li>
        <li onClick={this.toggleWeekState}>1W</li>
        <li onClick={this.toggleMonthState}>1M</li>
        <li onClick={this.toggleThreeMonthState}>3M</li>
        <li onClick={this.toggleYearState}>1Y</li>
        <li onClick={this.toggleAllState}>ALL</li>
      </ul>
    }

    if (this.state.oneWeek) {
      stockChart = <StockChart data={oneWeek} dataKey="close" />
      list = <ul>
        <li onClick={this.toggleDayState}>1D</li>
        <li className="selected" onClick={this.toggleWeekState}>1W</li>
        <li onClick={this.toggleMonthState}>1M</li>
        <li onClick={this.toggleThreeMonthState}>3M</li>
        <li onClick={this.toggleYearState}>1Y</li>
        <li onClick={this.toggleAllState}>ALL</li>
      </ul>
    }

    if (this.state.oneMonth) {
      stockChart = <StockChart data={this.props.stock.one_month_chart} dataKey="close" />
      list = <ul>
        <li onClick={this.toggleDayState}>1D</li>
        <li onClick={this.toggleWeekState}>1W</li>
        <li className="selected" onClick={this.toggleMonthState}>1M</li>
        <li onClick={this.toggleThreeMonthState}>3M</li>
        <li onClick={this.toggleYearState}>1Y</li>
        <li onClick={this.toggleAllState}>ALL</li>
      </ul>
    }

    if (this.state.threeMonth) {
      stockChart = <StockChart data={threeMonth} dataKey="close" />
      list = <ul>
        <li onClick={this.toggleDayState}>1D</li>
        <li onClick={this.toggleWeekState}>1W</li>
        <li onClick={this.toggleMonthState}>1M</li>
        <li className="selected" onClick={this.toggleThreeMonthState}>3M</li>
        <li onClick={this.toggleYearState}>1Y</li>
        <li onClick={this.toggleAllState}>ALL</li>
      </ul>
    }

    if (this.state.oneYear) {
      stockChart = <StockChart data={this.props.stock.one_year_chart} dataKey="close" />
      list = <ul>
        <li onClick={this.toggleDayState}>1D</li>
        <li onClick={this.toggleWeekState}>1W</li>
        <li onClick={this.toggleMonthState}>1M</li>
        <li onClick={this.toggleThreeMonthState}>3M</li>
        <li className="selected" onClick={this.toggleYearState}>1Y</li>
        <li onClick={this.toggleAllState}>ALL</li>
      </ul>
    }

    if (this.state.all) {
      stockChart = <StockChart data={this.props.stock.one_year_chart} dataKey="close" />
      list = <ul>
        <li onClick={this.toggleDayState}>1D</li>
        <li onClick={this.toggleWeekState}>1W</li>
        <li onClick={this.toggleMonthState}>1M</li>
        <li onClick={this.toggleThreeMonthState}>3M</li>
        <li onClick={this.toggleYearState}>1Y</li>
        <li className="selected" onClick={this.toggleAllState}>ALL</li>
      </ul>
    }

    console.log(this.props.holdings);
    return (
      <div className="stock-show">
        <div className="main-info">
          <h3>${this.props.stock.price}</h3>
          <p>{(this.props.stock.change_percent_s)}Today</p>
        </div>
        <div className="main-charts" className="stock-charts">
          {/* <StockChart data={this.props.stock.one_day_chart} dataKey="average"/> */}
          {/* <br/> */}
          {/* <StockChart data={this.props.stock.one_month_chart} dataKey="close"/> */}
          {stockChart}
          <br/>
          {/* <StockChart data={this.props.stock.one_year_chart} dataKey="close"/>  */}
          {/* <ul>
            <li>1D</li>
            <li>1W</li>
            <li>1M</li>
            <li>3M</li>
            <li>1Y</li>
            <li>ALL</li>
          </ul> */}
          {list}
        </div>
        <div className="stock-about">
          <div className="about">
            <h3>About {this.props.stock.symbol}</h3>
            {/* <p>{this.props.stock.about}</p> */}
            <p>Apple, Inc. engages in the design, manufacture, and sale of 
              smartphones, personal computers, tablets, wearables and 
              accessories, and other variety of related services. It operates 
              through the following geographical segments: Americas, Europe, 
              Greater China, Japan, and Rest of Asia Pacific. The Americas 
              segment includes North and South America. The Europe segment 
              consists of European countries, as well as India, the Middle East,
              and Africa. The Greater China segment comprises of China, Hong 
              Kong, and Taiwan. The Rest of Asia Pacific segment includes 
              Australia and Asian countries. Its products and services include 
              iPhone, Mac, iPad, AirPods, Apple TV, Apple Watch, Beats products, 
              Apple Care, iCloud, digital content stores, streaming, and 
              licensing services. The company was founded by Steven Paul Jobs, 
              Ronald Gerald Wayne, and Stephen G. Wozniak on April 1, 1976 
              and is headquartered in Cupertino, CA.</p>
          </div>
          <div className="stats">
            <ul>
              <li><label>CEO </label>
              <br/>
              Bill Gates</li>
              {/* {this.props.stock.ceo}</li> */}
              <li><label>Employees </label>
              <br/>
                {employees}</li>
              <li><label>Market Cap </label>
              <br/>
                ${marketCap}</li>
              <li><label>Price-Earnings Ratio </label>
              <br/>
                {this.props.stock.price_to_earnings}</li>
              <li><label>Dividend Yield </label>
              <br/>
                {this.props.stock.dividend_yield}</li>
              <li><label>Average Volume </label>
              <br/>
                {this.props.stock.average_volume}</li>
              <li><label>High Today </label>
              <br/>
                {this.props.stock.high_today}</li>
              <li><label>Low Today </label>
              <br/>
                {this.props.stock.low_today}</li>
              <li><label>Open Price </label>
              <br/>
                {this.props.stock.open_price}</li>
              <li><label>Volume </label>
              <br/>
                {this.props.stock.volume}</li>
              <li><label>52 Week High </label>
              <br/>
                ${this.props.stock.week_52_high}</li>
              <li><label>52 Week Low </label>
              <br/>
                ${this.props.stock.week_52_low}</li>

            </ul>
          </div>
          <p className="reference">Stock information received from external API, <a href="https://iexcloud.io">IEX Cloud Console. </a></p>
        </div>
        {/* <div className="stock-news">
          {
            this.props.stock.company_news.map(newsItem => (
              <NewsItem
                newsItem={newsItem}
                key={newsItem.datetime}
                watchlistitem={stock}
              />
            ))
          }
        </div> */}
        <div className="stock-interaction">
          {
            <div>
              {/* <BuyForm stock={this.props.stock} holdings={this.props.holdings} createHolding={this.props.createHolding} deleteHolding={this.props.deleteHolding} currentUser={currentUser} />
              <SellForm stock={this.props.stock} holdings={this.props.holdings} createHolding={this.props.createHolding} deleteHolding={this.props.deleteHolding} currentUser={currentUser} /> */}
             {/* <WatchListButton stock={this.props.stock} watchlistitems={this.props.watchlistitems} createWatchListItem={this.props.createWatchListItem} deleteWatchListItem={this.props.deleteWatchListItem}/> */}
            </div>
          }
        </div>
      </div>
    )
  }
}


export default StockShow; 