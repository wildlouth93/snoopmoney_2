import React from 'react';
import { Link } from 'react-router-dom';
import { RECEIVE_WATCHLIST_ITEM } from '../../actions/watchlistitem_actions';
import HoldingIndexItem from '../holdings/holding_index_item';

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
    let networth = parseInt(currentUser.net_worth).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    let percentStock = parseInt(100 * (1 - (currentUser.account_balance / currentUser.net_worth))).toFixed(2);
    let stockValue = parseInt(currentUser.net_worth - currentUser.account_balance).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    let percentCash = parseInt(100 * (currentUser.account_balance / currentUser.net_worth)).toFixed(2);
    let cashValue = parseInt(currentUser.account_balance).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

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
                <img src={window.images.donut_chart_image}/>
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
                    holdings.map(holding => {
                      let price = parseInt(holding.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                      let averageCost = parseInt(holding.cost_basis).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                      let totalReturn = parseInt((holding.price - holding.cost_basis) * holding.num_shares).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                      let equity = parseInt((holding.price * holding.num_shares)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                      return <tr key={holding.ticker}>
                        <th>{holding.ticker}</th>
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
              <img src={window.images.donut_chart_image} />
            </div>
          </div>
        </div>
        <p className="reference">Stock information received from external API, <a href="https://iexcloud.io">IEX Cloud Console. </a></p>
      </div>
    )
  }
}

export default AccountShow; 