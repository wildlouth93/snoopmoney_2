import React from 'react';
import { Link } from 'react-router-dom';
import { RECEIVE_WATCHLIST_ITEM } from '../../actions/watchlistitem_actions';
import HoldingIndexItem from '../holdings/holding_index_item';
import AccountPieChart from './account_pie_chart';
import AccountPieChart2 from './account_pie_chart_2';


class AccountShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: true };
  }

  componentDidMount() {
    this.props.requestHoldings()
      .then(() => this.setState({ loading: false }));
  }

  render(){
    const { currentUser, logout, holdings} = this.props; 
    let userNetWorth = currentUser.net_worth;
    let userAccountBalance = currentUser.account_balance;
    let networth = parseInt(userNetWorth).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    let percentStock = parseInt(100 * (1 - (userAccountBalance / userNetWorth))).toFixed(2);
    let stockValue = parseInt(userNetWorth - userAccountBalance).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    let percentCash = parseInt(100 * (userAccountBalance / userNetWorth)).toFixed(2);
    let cashValue = parseInt(userAccountBalance).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    let data3 = [
      { name: "Stock Value", value: (userNetWorth - userAccountBalance) },
      { name: "Cash Value", value: parseFloat(userAccountBalance) },
    ];

    let data4 = [];

    holdings.map((holding, i) => {
      data4[i] = { name: holding.ticker, value: (holding.price * holding.num_shares)}
    });

    if (this.state.loading) {
      return <div className="loader-container"><div className="loader"></div></div>
    }

    return (
      <div className="account-show">
        <div className="account-bar">
        <h1>{currentUser.first_name} {currentUser.last_name}</h1>
          <ul>
            <li>Account</li>
            <li>Banking</li>
            <li>History</li>
            <li>Documents</li>
            <li>Free Stocks</li>
            <li>Settings</li>
          </ul>
        </div>
        <div className="scrollable">
          <h3>Total Portfolio Value</h3>
          <h1>${networth}</h1>
        
          <div className="account-top">
            <div className="top-content">
              <ul>
                <li>
                  <label>Stocks / Options </label>
                  <div>
                    <p>{percentStock}%</p>
                    <p>${(stockValue)}</p>
                  </div>
                </li>
                <li>
                  <label>Cash </label>
                  <div>
                    <p>{percentCash}%</p>
                    <p>${cashValue}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="top-chart">
             {/* <TestPieChart /> */}
              <AccountPieChart data={data3} dataKey={"value"}/>
                {/* <img src={window.images.donut_chart_image}/> */}
            </div>
          </div>
          <h3>Stocks</h3>
          <div className="account-bottom">
            <div className="bottom-content">
              <table>
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Shares</th>
                    <th>Price</th>
                    <th>Average Cost</th>
                    <th>Total Return</th>
                    <th>Equity</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    holdings.map((holding, i) => {
                      let price = parseInt(holding.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                      let averageCost = parseInt(holding.cost_basis).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                      let totalReturn = parseInt((holding.price - holding.cost_basis) * holding.num_shares).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                      let equity = parseInt((holding.price * holding.num_shares)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  
                      return <tr key={holding.ticker}>
                        <th><Link className="account-stock-link" to={`/stocks/${holding.ticker}`}>{holding.ticker}</Link></th>
                        <td>{holding.num_shares}</td>
                        <td>${price}</td>
                        <td>${averageCost}</td>
                        <td>${totalReturn}</td>
                        <td>${equity}</td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>

            <div className="bottom-chart">
              {/* <img src={window.images.donut_chart_image} /> */}
              <AccountPieChart2 data={data4} dataKey={"value"} />
            </div>
          </div>
        </div>
        <p className="reference">Stock information received from external API, <a href="https://iexcloud.io">IEX Cloud Console. </a></p>
      </div>
    )
  }
}

export default AccountShow; 