import React from 'react';
import StockChart from '../stocks/stock_chart';

class MainChartDiv extends React.Component {
  constructor(props) {
    super(props);

    // this._isMounted = false;

    this.state = {
      loading: true,
      stockData2: {},
      oneDay: false,
      fiveDay: false, 
      oneMonth: false, 
      oneYear: true
    }

    this.toggleOneDay = this.toggleOneDay.bind(this);
    this.toggleFiveDay = this.toggleFiveDay.bind(this);
    this.toggleOneMonth = this.toggleOneMonth.bind(this);
    this.toggleOneYear = this.toggleOneYear.bind(this);
    this.getStocks = this.getStocks.bind(this);
  }

  toggleOneDay() {
    if (this.state.oneDay === false) {
      this.setState(
        {oneDay: true, fiveDay: false, oneMonth: false, oneYear: false, loading: true},
        () => this.getStocks()
        );
    }

    // this.getStocks()
    //   .then(() => this.forceUpdate())
  }

  toggleFiveDay() {
    if (this.state.fiveDay === false) {
      this.setState(
        { oneDay: false, fiveDay: true, oneMonth: false, oneYear: false, loading: true},
        () => this.getStocks()
        );
    }
    // this.getStocks()
    //   .then(() => this.forceUpdate())
  }

  toggleOneMonth() {
    if (this.state.oneMonth === false) {
      this.setState(
        { oneDay: false, fiveDay: false, oneMonth: true, oneYear: false, loading: true},
        () => this.getStocks()
        );
    }
    // this.getStocks()
    //   .then(() => this.forceUpdate())    
  }

  toggleOneYear() {
    if (this.state.oneYear === false) {
      this.setState(
        { oneDay: false, fiveDay: false, oneMonth: false, oneYear: true, loading: true},
        () => this.getStocks()
        );
    }
    // this.getStocks()
    //   .then(() => this.forceUpdate())
  }

  componentDidMount() {
    // this._isMounted = true;
    this.getStocks();
  }

  // shouldComponentUpdate() {
  //   return true;
  // }

  // componentWillUnmount() {
  //   this._isMounted = false;
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.oneDay !== prevState.oneDay) {
  //     this.getStocks()
  //   }
  //   if (this.state.fiveDay !== prevState.fiveDay) {
  //     this.getStocks()
  //   }
  //   if (this.state.oneMonth !== prevState.oneMonth) {
  //     this.getStocks()
  //   }
  //   if (this.state.oneYear !== prevState.oneYear) {
  //     this.getStocks()
  //   }
  // }

  // componentDidUpdate() {
  //   this.getStocks();
  // }

  getStocks() {
    let symbols = [];
    this.props.holdings.map((holding, i) => {
      symbols.push(holding.ticker.toLowerCase())
    })
    symbols = symbols.join(',');
    // console.log(symbols);
    let timePeriod;
    if (this.state.oneDay) {
      timePeriod = '1d'
    }

    if (this.state.fiveDay) {
      timePeriod = '5d'
    }

    if (this.state.oneMonth) {
      timePeriod = '1m'
    }

    if (this.state.oneYear) {
      timePeriod = '1y'
    }

    // console.log("API start")

    fetch(`https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=chart&range=${timePeriod}&token=pk_c0d9b6069cf349fbb1fc607a8f129ff9`)
      .then((result) => result.json())
      .then((result) => {
        this.setState({ stockData2: result, loading: false });
      })
  }

  render() {

    // console.log(this.props);

    if (this.state.loading) {
      return <div className="main-charts">
        <div className="loader-container"><div className="loader"></div></div>
      </div>
    }

    // console.log(this.state);
    // console.log(this.state.stockData2);

    const { holdings, currentUser } = this.props;


    let data2 = Array.apply(null, Array(5)).map(function () { return { average: 0 } }); 

    if (this.state.oneDay) {
      data2 = Array.apply(null, Array(78)).map(function () { return { average: 0} }); 
    }

    // 78
    // 253
    // 22
    // 5

    if (this.state.oneYear) {
      data2 = Array.apply(null, Array(253)).map(function () { return { average: 0} }); 
    }

    if (this.state.oneMonth) {
      data2 = Array.apply(null, Array(22)).map(function () { return { average: 0} }); 
    }

    // if (this.state.fiveDay) {
    //   data2 = Array.apply(null, Array(5)).map(function () { return { average: 0} }); 
    // }
    

    // console.log('data2');
    // console.log(data2)

    // let data2 = Array.apply(null, Array(78)).map(function () { return { average: 0 } }); 

    // debugger;
    console.log(Object.values(this.state.stockData2));

    Object.values(this.state.stockData2).map((stock, i) => {

      // console.log(stock);
      stock.chart.map((datapoint, idx) => {
        // data2[idx].average += (datapoint.average * holdings[stock.ticker].num_shares)
        if (this.state.oneDay && idx % 5 === 0) {
          data2[idx/5].label = datapoint.label;
          data2[idx/5].average += ((datapoint.average) * holdings[i].num_shares);
        }   
        if (this.state.oneYear) {
          data2[idx].label = datapoint.label;
          data2[idx].average += ((datapoint.close) * holdings[i].num_shares);
        }
        if (this.state.oneMonth) {
          data2[idx].label = datapoint.label;
          data2[idx].average += ((datapoint.close) * holdings[i].num_shares);
        }
        if (this.state.fiveDay) {
          // debugger;
          if (!data2[idx]) {
            debugger;
          }
          data2[idx].label = datapoint.label;
          data2[idx].average += ((datapoint.close) * holdings[i].num_shares);
        }
      })
    })

    // console.log(data2);

    let data4 = [];
    let sum = 0;
    let sumsq = 0
    data2.map((datapoint, idx) => {
      // debugger;
      // console.log(typeof datapoint.average);
      // console.log(typeof currentUser.account_balance);
      datapoint.average = datapoint.average + parseInt(currentUser.account_balance);
     
      sum += datapoint.average;
      sumsq += (datapoint.average * datapoint.average)

      let mean = sum / (idx + 1);
      let variance = sumsq / (idx+1) - (mean * mean);
      let sd = Math.sqrt(variance);

      let sdValue = 3;

      if (this.state.oneDay) {
        sdValue = 1;
      } 

      if (this.state.fiveDay) {
        sdValue = 20;
      }

      // console.log(mean);

      if (datapoint.average > mean - (sdValue * sd) && datapoint.average < mean + (sdValue *sd)) {
        datapoint.average = parseInt(datapoint.average).toFixed(2); 
        datapoint.label = datapoint.label
        data4.push(datapoint)
      }
    })

    // if (this.state.timePeriod === '5d') {
    //   console.log(data2);
    //   console.log(data4);
    //   // data4 = data2;
    // }

    // console.log('data4');
    // console.log(data4);

    let stockChart;
    let listItems;

    if (this.state.oneDay) {
      listItems = <ul>
        <li onClick={this.toggleOneDay} className="selected">1D</li>
        <li onClick={this.toggleFiveDay}>5D</li>
        <li onClick={this.toggleOneMonth}>1M</li>
        <li>3M</li>
        <li onClick={this.toggleOneYear}>1Y</li>
        <li>ALL</li>
      </ul>
    }

    if (this.state.fiveDay) {
      listItems = <ul>
        <li onClick={this.toggleOneDay}>1D</li>
        <li onClick={this.toggleFiveDay} className="selected">5D</li>
        <li onClick={this.toggleOneMonth}>1M</li>
        <li>3M</li>
        <li onClick={this.toggleOneYear}>1Y</li>
        <li>ALL</li>
      </ul>
        }
    
    if (this.state.oneMonth) {
      listItems = <ul>
        <li onClick={this.toggleOneDay}>1D</li>
        <li onClick={this.toggleFiveDay}>5D</li>
        <li onClick={this.toggleOneMonth} className="selected">1M</li>
        <li>3M</li>
        <li onClick={this.toggleOneYear}>1Y</li>
        <li>ALL</li>
      </ul>
    }


    if (this.state.oneYear) {
      listItems = <ul>
        <li onClick={this.toggleOneDay}>1D</li>
        <li onClick={this.toggleFiveDay}>5D</li>
        <li onClick={this.toggleOneMonth}>1M</li>
        <li>3M</li>
        <li onClick={this.toggleOneYear} className="selected">1Y</li>
        <li>ALL</li>
      </ul>
    }

    let stroke = '#21ce99'
    if (data4[0].average > data4[data4.length-1].average) {
      stroke = 'red'
    }

    stockChart = <StockChart data={data4} dataKey="average" className="test-chart" stroke={stroke} name="Portfolio Value" />

    return (
    <div className="main-charts">
      {stockChart}
      {listItems}
    </div>
    )
  }

}

export default MainChartDiv;

