import React from 'react';
import { connect } from 'react-redux';
import Main from './main';
import {fetchStocks} from '../../actions/stock_actions';
import {requestHoldings} from '../../actions/holding_actions';
import {requestWatchListItems} from '../../actions/watchlistitem_actions';

import { logout } from '../../actions/session';

const mapStateToProps = (state, ownProps) => {
  return {
  currentUser: state.entities.users[state.session.currentUserId],
  holdings: Object.values(state.entities.holdings),
  watchlistitems: Object.values(state.entities.watchlistitems)
  }
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  requestHoldings: () => dispatch(requestHoldings()),
  requestWatchListItems: () => dispatch(requestWatchListItems())
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
