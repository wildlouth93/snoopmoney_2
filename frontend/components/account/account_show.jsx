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
        <Link to="/">Home</Link>
        <h1>{currentUser.first_name} {currentUser.last_name}</h1>
        <ul>
          <li>Account</li>
          <li>Banking</li>
          <li>History</li>
          <li>Documents</li>
          <li>Free Stocks</li>
          <li>Settings</li>
        </ul>
        <ul>
          <li>
            <label>Stocks / Options</label>
            {1 - (currentUser.account_balance / currentUser.net_worth)} 
          </li>
          <li>
            <label>Cash</label>
            {(currentUser.account_balance / currentUser.net_worth)}
          </li>
        </ul>
      </div>
    )
  }
}

export default AccountShow; 