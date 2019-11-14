import React from 'react';
import { connect } from 'react-redux';
import NavBar from './nav_bar';

import { logout, clearErrors } from '../../actions/session';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.currentUserId],
  pathname: ownProps.location.pathname, 
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  clearErrors: () => dispatch(clearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);