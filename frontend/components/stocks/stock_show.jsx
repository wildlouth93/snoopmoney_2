import React from 'react';
import { Link } from 'react-router-dom';
import StockChart from './stock_chart';
import NewsItem from '../main/news_item';


class StockShow extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchStock(this.props.match.params.symbol)
  }

  render(){ 
    return (
      <div className="stock-show">
        <Link to="/">Home</Link>
        <p>{this.props.stock.price}</p>
        <div className="stock-charts">
          <StockChart data={this.props.stock.one_day_chart} dataKey="average"/>
          <br/>
          <StockChart data={this.props.stock.one_month_chart} dataKey="close"/>
          <br/>
          <StockChart data={this.props.stock.one_month_chart} dataKey="close"/>
        </div>
        <div className="stock-about">
          <h3>About {this.props.stock.symbol}</h3>
          <p>{this.props.stock.about}</p>
          <ul>
            <li><label>CEO </label>
            <br/>
            {this.props.stock.ceo}</li>
            <li><label>Employees </label>
            <br/>
              {this.props.stock.employees}</li>
            <li><label>Market Cap </label>
            <br/>
              {this.props.stock.market_cap}</li>
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
              {this.props.stock.week_52_high}</li>
            <li><label>52 Week Low </label>
            <br/>
              {this.props.stock.week_52_low}</li>

          </ul>
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
      </div>
    )
  }
}


export default StockShow; 