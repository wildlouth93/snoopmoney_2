import React from 'react';
import { connect } from 'react-redux';
import Main from './main';

import { logout } from '../../actions/session';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.currentUserId],
  holdings: state.entities.holdings,
  watchlistitems: state.entities.watchlistitems
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
