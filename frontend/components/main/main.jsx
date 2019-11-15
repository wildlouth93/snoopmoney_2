import React from 'react';
import MainOut from './main_out'

export default ({ currentUser, logout }) => {

  const main = currentUser ? (
    <div>
      <p>This is the first thing on the main page after signed in.</p>
      <p>User Name: {`${currentUser.first_name}`} </p>
      <p>{`${currentUser.last_name}`}</p>
      <p>Emai: {`${currentUser.email}`}</p>
      <p>Account Balance: ${`${currentUser.account_balance}`}</p>
      {/* <p>{`${holdings}`}</p>
      <p>{`${watch_list_items}`}</p> */}
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