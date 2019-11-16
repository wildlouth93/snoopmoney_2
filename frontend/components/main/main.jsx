import React from 'react';
import MainOut from './main_out'
import { Link } from 'react-router-dom';

export default ({ currentUser, logout }) => {

  const main = currentUser ? (
    <div>
      <p>This is the first thing on the main page after signed in.</p>
      <Link to="/holdings">Holdings</Link>
      <br/>
      <Link to="/watchlistitems">WatchList</Link>
    </div>
  ) : (
    <div>
      <MainOut />
    </div>
  )
  return (
    <div>
      {main}
    </div>
  );
};