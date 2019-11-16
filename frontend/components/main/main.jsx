import React from 'react';
import MainOut from './main_out'
import HoldingIndexContainer from '../holdings/holding_index_container';

export default ({ currentUser, logout }) => {

  const main = currentUser ? (
    <div>
      <p>This is the first thing on the main page after signed in.</p>
      debugger; 
      <HoldingIndexContainer />
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