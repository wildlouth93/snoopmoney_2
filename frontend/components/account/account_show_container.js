import React from 'react';
import { connect } from 'react-redux';
import { requestHoldings } from '../../actions/holding_actions';
import AccountShow from './account_show';

import { logout } from '../../actions/session';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.entities.users[state.session.currentUserId],
    holdings: Object.values(state.entities.holdings)
  }
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  requestHoldings: () => dispatch(requestHoldings())
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountShow);
