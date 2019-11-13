import React from 'react';
import { Link } from 'react-router-dom';

export default ({ currentUser, logout, pathName}) => {
  let sessionLinks; 
  if (pathName === '/login') {
    sessionLinks = (<ul className="out-nav-links">    
      <Link className="btn" to="/signup">Sign Up</Link>
    </ul>);
  } else if (pathName === '/signup') {
    sessionLinks = (<ul className="out-nav-links">
      <Link className="btn" to="/login">Sign In</Link>
    </ul>);
  } else {
    sessionLinks = (<ul className="out-nav-links">
      <Link className="btn" to="/signup">Sign Up</Link>
      <Link className="btn" to="/login">Sign In</Link>
    </ul>);
  }; 

  const display = currentUser ? (
    <div>
      <p>Welcome, {`${currentUser.first_name} ${currentUser.last_name}`}</p>
      <button onClick={logout}>Log Out</button>
    </div>
   ) : (
    <div>
      <ul className="out-nav-bar">
        <img src="" alt="" className="logo"/>
        <li>Products
          <ul className="out-nav-dropdown">
            <li>Stocks and Funds</li>
            <li>Options</li>
            <li>Gold</li>
            <li>Cash Management</li>
            <li>Crypto</li>
          </ul>
        </li>
        <li>Learn</li>
        <li>Support</li>
      </ul>

        {/* <ul className="out-nav-links">    
          <Link className="btn" to="/signup">Sign Up</Link>
          <Link className="btn" to="/login">Sign In</Link>
        </ul> */}
        {sessionLinks}
    </div>
   );

  return (
    <header className="nav-bar">
      <h1 className="logo"></h1>
      <div>
        {display}
      </div>
    </header>
  );
};