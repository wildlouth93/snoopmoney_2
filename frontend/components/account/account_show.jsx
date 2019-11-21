import React from 'react';
import { Link } from 'react-router-dom';
import { RECEIVE_WATCHLIST_ITEM } from '../../actions/watchlistitem_actions';
import HoldingIndexItem from '../holdings/holding_index_item';

class AccountShow extends React.Component {
  componentDidMount() {
    this.props.requestHoldings();
  }

  render(){
    const { currentUser, logout, holdings} = this.props; 
    return (
      <div>
        <h1>{currentUser.first_name} {currentUser.last_name}</h1>
        <ul>
          <li>Account</li>
          <li>Banking</li>
          <li>History</li>
          <li>Documents</li>
          <li>Free Stocks</li>
          <li>Settings</li>
        </ul>
        <h3>Total Portfolio Value</h3>
        <h1>${currentUser.net_worth}</h1>
        <ul>
          <li>
            <label>Stocks / Options </label>
            <p>{1 - (currentUser.account_balance / currentUser.net_worth)}</p>
            <p>{(currentUser.net_worth - currentUser.account_balance)}</p>
            
          </li>
          <li>
            <label>Cash </label>
            <p>{(currentUser.account_balance / currentUser.net_worth)}</p>
            <p>{currentUser.account_balance}</p>
          </li>
        </ul>

        <h3>Stocks</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>Average Cost</th>
              <th>Total Return</th>
              <th>Equity</th>
            </tr>
          </thead>
          <tbody>
            {
              holdings.map(holding => (
                <tr key={holding.ticker}>
                  <td>{holding.ticker}</td>
                  <td>{holding.num_shares}</td>
                  <td>{holding.price}</td>
                  <td>{holding.cost_basis}</td>
                  <td>{(holding.price - holding.cost_basis) * holding.num_shares }</td>
                  <td>{(holding.price * holding.num_shares)}</td>
                </tr>
              ))
            }
          </tbody>
         
        </table>
      </div>
    )
  }
}

export default AccountShow; 