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
      all: false, 
      stockData: {},
      stockChartData: {},
      stockLoaded: false, 
      chartLoaded: false,
      number: 0
    };

    this.getStock = this.getStock.bind(this);
    this.getChart = this.getChart.bind(this);
    this.toggleDayState = this.toggleDayState.bind(this);
    this.toggleWeekState = this.toggleWeekState.bind(this);
    this.toggleMonthState = this.toggleMonthState.bind(this);
    // this.toggleThreeMonthState = this.toggleThreeMonthState.bind(this);
    this.toggleYearState = this.toggleYearState.bind(this);
    // this.toggleAllState = this.toggleAllState.bind(this);
    this.handleBuySubmit = this.handleBuySubmit.bind(this);
    this.handleSellSubmit = this.handleSellSubmit.bind(this);
    this.handleAddWLI = this.handleAddWLI.bind(this);
    this.handleRemoveWLI = this.handleRemoveWLI.bind(this);
  }

  componentDidMount() {
    // this.props.fetchStock(this.props.match.params.symbol)
      // .then(() => this.setState({loading: false}));
    this.props.requestHoldings()
      .then(() => {
        this.props.requestWatchListItems()
      })
      .then(() => {
        this.getStock();
        this.getChart();
        this.setState({ loading: false})
      })
    // this.getStock()
    // this.getChart()
    // this.setState({ loading: false })
  }

  // componentDidMount() {
  //   if (this.props.currentUser) {
  //     this.props.requestHoldings()
  //       .then(() => {
  //         let networth = parseInt(this.props.currentUser.net_worth).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  //         this.getStocks();
  //         this.setState({ networth: networth })
  //       });
  //     this.props.requestWatchListItems()
  //       .then(() => {
  //         this.getWatchlistItems();
  //       });
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.symbol !== this.props.match.params.symbol) {
      // this.props.fetchStock(this.props.match.params.symbol)
      //   .then(() => this.setState({ loading: false }));
      this.getStock();
    }

  //   if (this.state.oneDay !== prevState.oneDay) {
  //     this.getStock()

  //   }
  //   if (this.state.oneWeek !== prevState.oneWeek) {
  //     this.getStock()
  //   }
  //   if (this.state.oneMonth !== prevState.oneMonth) {
  //     this.getStock()
  //   }
  //   if (this.state.oneYear !== prevState.oneYear) {
  //     this.getStock()
  //   }
    
  }

  toggleDayState() {
    if (this.state.oneDay === false) {
      this.setState({
        oneDay: true,  
        oneWeek: false, 
        oneMonth: false, 
        threeMonth: false,
        oneYear: false, 
        all: false,
        chartLoaded: false
      },
      () => this.getChart())
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
        all: false,
        chartLoaded: false
      },
      () => this.getChart()
      )
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
        all: false,
        chartLoaded: false
      },
      () => this.getChart()
      )
    }
  }

  // toggleThreeMonthState() {
  //   if (this.state.threeMonth === false) {
  //     this.setState({
  //       oneDay: false,
  //       oneWeek: false,
  //       oneMonth: false,
  //       threeMonth: true,
  //       oneYear: false, 
  //       all: false,
  //       loading: true
  //     })
  //   }
  // }

  toggleYearState() {
    if (this.state.oneYear === false) {
      this.setState({
        oneDay: false,
        oneWeek: false,
        oneMonth: false,
        threeMonth: false,
        oneYear: true, 
        all: false,
        chartLoaded: false
      },
      () => this.getChart()
      )
    }
  }

  // handleBuySubmit(e) {
  //   e.preventDefault();
  //   this.props.createHolding(this.state)
  //     .then(() => this.props.history.push('/'))
  // }

  handleInput(type) {
    return (e) => {
      this.setState({ [type]: e.currentTarget.value })
    }
  }

  handleBuySubmit(e) {
    e.preventDefault();
    // console.log(this.state);
    let info1 = e.currentTarget.form.elements[0];
    let info2 = e.currentTarget.form.elements[1];
    let info3 = e.currentTarget.form.elements[2];
    console.log(info1)
    console.log(info2)
    console.log(info3)

    let potentialHolding = { num_shares: parseInt(info3.value),
      ticker: info2.value ,
      cost_basis: parseFloat(info1.value),
    }
    console.log(potentialHolding)
    // debugger;
    this.props.createHolding(potentialHolding)
  }

  handleSellSubmit(e) {
    e.preventDefault();
    // console.log(this.state);
    let info1 = e.currentTarget.form.elements[0];
    let info2 = e.currentTarget.form.elements[1];
    let info3 = e.currentTarget.form.elements[2];
    console.log(info1)
    console.log(info2)
    console.log(info3)

    let potentialHolding = {
      num_shares: parseInt(info3.value),
      ticker: info2.value,
      cost_basis: parseFloat(info1.value),
    }
    console.log(potentialHolding)
    // debugger;
    this.props.deleteHolding(potentialHolding.ticker)
  }

  handleAddWLI(e) {
    e.preventDefault();

    // let info2 = e.currentTarget.form.elements;
    let info1 = e.currentTarget.form.elements[0];
    let potentialWLI = {
        ticker: info1.value
    }
    console.log(potentialWLI);
    // console.log(info2);
    this.props.createWatchListItem(potentialWLI)
  }

  handleRemoveWLI(e) {
    e.preventDefault();
    let info1 = e.currentTarget.form.elements[0];
    let potentialWLI = {
      ticker: info1.value
    }
    console.log(potentialWLI)
    this.props.deleteWatchListItem(potentialWLI.ticker)
  }

  // toggleAllState() {
  //   if (this.state.all === false) {
  //     this.setState({
  //       oneDay: false,
  //       oneWeek: false,
  //       oneMonth: false,
  //       threeMonth: false,
  //       oneYear: false,
  //       all: true,
  //       loading: true
  //     },
  //     () => this.getChart()
  //     )
  //   }
  // }

  getChart() {
    let symbol = this.props.match.params.symbol.toLowerCase();

    let timePeriod;
    if (this.state.oneDay) {
      timePeriod = '1d'
    }

    if (this.state.oneWeek) {
      timePeriod = '5d'
    }

    if (this.state.oneMonth) {
      timePeriod = '1m'
    }

    if (this.state.oneYear) {
      timePeriod = '1y'
    }

    fetch(`https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbol}&types=chart,stats&range=${timePeriod}&token=pk_c0d9b6069cf349fbb1fc607a8f129ff9`)
      .then((result) => result.json())
      .then((result) => {
        this.setState({ stockChartData: result, chartLoaded: true});
      })

  }

  getStock() {
    let symbol = this.props.match.params.symbol.toLowerCase();

    let timePeriod;
    if (this.state.oneDay) {
      timePeriod = '1d'
    }

    if (this.state.oneWeek) {
      timePeriod = '5d'
    }

    if (this.state.oneMonth) {
      timePeriod = '1m'
    }

    if (this.state.oneYear) {
      timePeriod = '1y'
    }

    fetch(`https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbol}&types=quote,news,stats,company&range=${timePeriod}&last=5&token=pk_c0d9b6069cf349fbb1fc607a8f129ff9`)
      .then((result) => result.json())
      .then((result) => {
        this.setState({ stockData: result, stockLoaded: true });
      })
  }



  render(){ 

    // console.log(this.props);
    
    console.log(this.state);
    let stockChart;
    let list;

    if (!this.state.chartLoaded) {
      stockChart = <div className="loader-container"><div className="loader"></div></div>
    }
    // let divYield = parseInt(this.props.stock.dividend_yield * 100)).toFixed(2);
    if (this.state.loading || !this.state.stockLoaded) {
      return <div className="loader-container"><div className="loader"></div></div>
    }



    // console.log(this.state);

    let chart = this.state.stockChartData[this.props.match.params.symbol];
    let stock = this.state.stockData[this.props.match.params.symbol];
    let quote = this.state.stockData[this.props.match.params.symbol].quote;
    let stats = this.state.stockData[this.props.match.params.symbol].stats;
    let company = this.state.stockData[this.props.match.params.symbol].company;
    let news = stock.news;
    // console.log(this.state.stockData[this.props.match.params.symbol].quote);
    // console.log(stock);
    let employees = company.employees.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // let employees = parseInt(company.employees).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    let marketCap = parseFloat((quote.marketCap) / 1000000000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    let avgVol = (quote.avgTotalVolume / 1000000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    let lateVol = (quote.latestVolume / 1000000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    // let threeMonth = this.props.stock.one_year_chart.slice(200) || null;
    // let oneWeek = this.props.stock.company_chart.slice(this.props.stock.company_chart.length - 5) || null;
    let data2;

    if (this.state.oneDay) {
      data2 = Array.apply(null, Array(78)).map(function () { return { average: 0 } }); 
    }

    if (this.state.oneYear) {
      data2 = Array.apply(null, Array(253)).map(function () { return { average: 0 } }); 
    }

    if (this.state.oneMonth) {
      data2 = Array.apply(null, Array(22)).map(function () { return { average: 0} }); 
    } 

    if (this.state.oneWeek) {
      data2 = Array.apply(null, Array(5)).map(function () { return { average: 0} }); 
    }

    // console.log(stock);
    // console.log(chart);
    // console.log(news);

    if (this.state.chartLoaded) {
      if (this.state.oneDay) {
        chart.chart.forEach((datapoint, i) => {
          if (i % 5 === 0) {
            data2[i / 5].label = datapoint.label;
            data2[i / 5].average = datapoint.average;
          }
        })
      } else {
        chart.chart.forEach((datapoint, i) => {
          data2[i].label = datapoint.label;
          data2[i].average = datapoint.close;
        })
      }

    }
 

    let stroke = '#21ce99';

    // console.log(data2);
    let data4 = [];
    if (this.state.chartLoaded) {
      let sum = 0;
      let sumsq = 0
      data2.map((datapoint, idx) => {
        // debugger;
        // console.log(typeof datapoint.average);
        // console.log(typeof currentUser.account_balance);
        // datapoint.average = datapoint.average;

        sum += datapoint.average;
        sumsq += (datapoint.average * datapoint.average)

        let mean = sum / (idx + 1);
        let variance = sumsq / (idx + 1) - (mean * mean);
        let sd = Math.sqrt(variance);

        let sdValue = 3;

        if (this.state.oneDay) {
          sdValue = 1;
        }

        if (this.state.oneWeek) {
          sdValue = 5;
        }

        // console.log(mean);

        if (datapoint.average > mean - (sdValue * sd) && datapoint.average < mean + (sdValue * sd)) {
          datapoint.average = parseInt(datapoint.average).toFixed(2);
          datapoint.label = datapoint.label
          data4.push(datapoint)
        }
      })

      if (data4[0].average > data4[data4.length - 1].average) {
        stroke = 'red'
      }
    }
    

    console.log(data2);
    console.log(data4);

    // let stockChart;
    // let list; 

    // if (!this.state.chartLoaded) {
    //   stockChart = <div className="loader-container"><div className="loader"></div></div>
    // }


    if (this.state.oneDay) {
      stockChart = <StockChart data={data4} dataKey="average" stroke={stroke} name="Price"/>
      list = <ul>
        <li className="selected" onClick={this.toggleDayState}>1D</li>
        <li onClick={this.toggleWeekState}>1W</li>
        <li onClick={this.toggleMonthState}>1M</li>
        <li>3M</li>
        <li onClick={this.toggleYearState}>1Y</li>
        <li>ALL</li>
      </ul>
    }

    if (this.state.oneWeek) {
      stockChart = <StockChart data={data4} dataKey="average" stroke={stroke} name="Price" />
      list = <ul>
        <li onClick={this.toggleDayState}>1D</li>
        <li className="selected" onClick={this.toggleWeekState}>1W</li>
        <li onClick={this.toggleMonthState}>1M</li>
        <li>3M</li>
        <li onClick={this.toggleYearState}>1Y</li>
        <li>ALL</li>
      </ul>
    }

    if (this.state.oneMonth) {
      stockChart = <StockChart data={data4} dataKey="average" stroke={stroke} name="Price"/>
          list = <ul>  
        <li onClick={this.toggleDayState}>1D</li>
        <li onClick={this.toggleWeekState}>1W</li>
        <li className="selected" onClick={this.toggleMonthState}>1M</li>
        <li>3M</li>
        <li onClick={this.toggleYearState}>1Y</li>
        <li>ALL</li>
      </ul>
    }

    // if (this.state.threeMonth) {
    //   stockChart = <StockChart data={data2} dataKey="close" />
    //   list = <ul>
    //     <li onClick={this.toggleDayState}>1D</li>
    //     <li onClick={this.toggleWeekState}>1W</li>
    //     <li onClick={this.toggleMonthState}>1M</li>
    //     <li className="selected" onClick={this.toggleThreeMonthState}>3M</li>
    //     <li onClick={this.toggleYearState}>1Y</li>
    //     <li onClick={this.toggleAllState}>ALL</li>
    //   </ul>
    // }

    if (this.state.oneYear) {
      stockChart = <StockChart data={data4} dataKey="average" stroke={stroke} name="Price"/>
          list = <ul>  
        <li onClick={this.toggleDayState}>1D</li>
        <li onClick={this.toggleWeekState}>1W</li>
        <li onClick={this.toggleMonthState}>1M</li>
        <li>3M</li>
        <li className="selected" onClick={this.toggleYearState}>1Y</li>
        <li>ALL</li>
      </ul>
    }

    // if (this.state.all) {
    //   stockChart = <StockChart data={this.props.stock.one_year_chart} dataKey="close" />
    //   list = <ul>
    //     <li onClick={this.toggleDayState}>1D</li>
    //     <li onClick={this.toggleWeekState}>1W</li>
    //     <li onClick={this.toggleMonthState}>1M</li>
    //     <li onClick={this.toggleThreeMonthState}>3M</li>
    //     <li onClick={this.toggleYearState}>1Y</li>
    //     <li className="selected" onClick={this.toggleAllState}>ALL</li>
    //   </ul>
    // }

    let inHoldings = false;
    let stockHolding = null;
    let inWatchList = false;
    let stockWLI = null;

    this.props.holdings.forEach((holding, i) => {
      if (holding.ticker === this.props.match.params.symbol) {
        inHoldings = true;
        stockHolding = holding;
      }
    })

    this.props.watchlistitems.forEach((watchlistitem, i) => {
      if (watchlistitem.ticker === this.props.match.params.symbol) {
        inWatchList = true;
        stockWLI = watchlistitem;
      }
    })

    console.log(inHoldings);
    // console.log(stockHolding);
    console.log(inWatchList);
    // console.log(stockWLI);

    let holdingForm;
    let watchlistForm;

    if (!inHoldings) {
      holdingForm = <form>
         <label>
          Current Price:
          <p> ${parseFloat(quote.latestPrice).toFixed(2)} </p>
          </label>
        {/* <h4>Current Price: ${parseFloat(quote.latestPrice).toFixed(2)}</h4> */}
        <input    
          type="hidden" 
          value={stock.quote.latestPrice}
          placeholder={stock.quote.latestPrice}>
        </input>
        <input 
          // type="hidden"
          type="hidden"
          value={this.props.match.params.symbol}
          placeholder={this.props.match.params.symbol}
          >
        </input>
        <label># of Shares
          <input
          type="number"
          value={this.state.number}
          onChange={this.handleInput('number')}
          placeholder=""
        />
          {/* <input 
            type="number"
            // value="0"
            placeholder="0">
          </input> */}
        </label>
        <button onClick={this.handleBuySubmit}>Buy Stock</button>
      </form>
    } else {
      holdingForm = <form>
        <label>
          Current Price:
              <p> ${parseFloat(quote.latestPrice).toFixed(2)} </p>
        </label>
        <label>
          # of Shares: 
            <p>{stockHolding.num_shares}</p>
        </label>
        {/* <h4>Current Price: ${parseFloat(quote.latestPrice).toFixed(2)}</h4>
         <h4># of Shares: {stockHolding.num_shares}</h4> */}

        <input
          type="hidden"
          value={stockHolding.cost_basis}
          placeholder={stock.quote.latestPrice}>
        </input>
        <input
          // type="hidden"
          type="hidden"
          value={stockHolding.ticker}
        >
        </input>
          <input
            type="hidden"
            value={stockHolding.num_shares}
            // onChange={this.handleInput('number')}
            placeholder=""
          />
          {/* <input 
            type="number"
            // value="0"
            placeholder="0">
          </input> */}
        <button onClick={this.handleSellSubmit}>Sell Stock</button>
      </form>
    }

    if (!inWatchList) {
      watchlistForm = <form>
        <input
          // type="hidden"
          type="hidden"
          value={this.props.match.params.symbol}
        >
        </input>
        <button onClick={this.handleAddWLI}>Add to WatchList</button>
      </form>
    } else {
      watchlistForm = <form>
        <input 
          type="hidden"
          value={this.props.match.params.symbol}
        ></input>
        <button onClick={this.handleRemoveWLI}>Remove from WatchList</button>
      </form>
    }

    // window.holdings = this.props.holdings;
    // console.log(this.props.holdings);
    // console.log(this.props.watchlistitems);

    return (
      <div className="stock-show">
        <div className="main-info">
          <h3>${quote.latestPrice}</h3>
          <p>{(quote.changePercent.toFixed(2))}Today</p>
        </div>
        <div className="main-charts" className="stock-charts">
          {/* <StockChart data={this.props.stock.one_day_chart} dataKey="average"/> */}
          {/* <br/> */}
          {/* <StockChart data={this.props.stock.one_month_chart} dataKey="close"/> */}
          {stockChart}
          <br/>
          {list}
        </div>
        <div className="stock-about">
          <div className="about">
            <h3>About {company.symbol}</h3>
            <p>{company.description}</p>
            {/* <p>Apple, Inc. engages in the design, manufacture, and sale of 
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
              and is headquartered in Cupertino, CA.</p> */}
          </div>
          <div className="stats">
            <ul>
              <li><label>CEO </label>
              {/* <br/>
              Bill Gates</li> */}
              <br />
              {company.CEO}</li>
              <li><label>Employees </label>
              <br/>
                {employees}</li>
              <li><label>Market Cap </label>
              <br/>
                ${marketCap} B</li>
              <li><label>Price-Earnings Ratio </label>
              <br/>
                {stats.peRatio}</li>
              <li><label>Dividend Yield </label>
              <br/>
                {stats.dividendYield}</li>
              <li><label>Average Volume </label>
              <br/>
                {avgVol}m</li>
              <li><label>High Today </label>
              <br/>
                $ {quote.high}</li>
              <li><label>Low Today </label>
              <br/>
                $ {quote.low}</li>
              <li><label>Open Price </label>
              <br/>
                ${quote.open}</li>
              <li><label>Volume </label>
              <br/>
                {lateVol}m</li>
              <li><label>52 Week High </label>
              <br/>
                $ {quote.week52High}</li>
              <li><label>52 Week Low </label>
              <br/>
                $ {quote.week52Low}</li>

            </ul>
          </div>
          <p className="reference">Stock information received from external API, <a href="https://iexcloud.io">IEX Cloud Console. </a></p>
        </div>
        <div className="main-news">
          <h3>{company.symbol} News</h3>
          {
            news.map(newsItem => (
              <NewsItem
                newsItem={newsItem}
                key={newsItem.datetime}
                watchlistitem={stock}
              />
            ))
          }
        </div>
        <div className="stock-interaction">
          {
            <div>
              {/* <BuyForm stock={this.props.stock} holdings={this.props.holdings} createHolding={this.props.createHolding} deleteHolding={this.props.deleteHolding} currentUser={currentUser} />
              <SellForm stock={this.props.stock} holdings={this.props.holdings} createHolding={this.props.createHolding} deleteHolding={this.props.deleteHolding} currentUser={currentUser} /> */}
             {/* <WatchListButton stock={this.props.stock} watchlistitems={this.props.watchlistitems} createWatchListItem={this.props.createWatchListItem} deleteWatchListItem={this.props.deleteWatchListItem}/> */}
             {holdingForm}
            </div>
          }
        </div>
        <div className="stock-interaction-2">
           {watchlistForm}
        </div>
      </div>
    )
  }
}


export default StockShow; 