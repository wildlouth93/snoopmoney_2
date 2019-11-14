import React from 'react';
import { Link } from 'react-router-dom';

export default ({ currentUser, logout, pathname, clearErrors}) => {
  let sessionLinks; 
  if (pathname === '/login') {
    sessionLinks = (<ul className="out-nav-links">    
      <Link className="btn" to="/signup" onClick={clearErrors}>Sign Up</Link>
    </ul>);
  } else if (pathname === '/signup') {
    sessionLinks = (<ul className="out-nav-links">
      <Link className="btn" to="/login" onClick={clearErrors}>Sign In</Link>
    </ul>);
  } else {
    sessionLinks = (<ul className="out-nav-links">
      <Link className="sign-in-btn" to="/login" onClick={clearErrors}>Sign In</Link>
      <Link className="btn" to="/signup" onClick={clearErrors}>Sign Up</Link>
    </ul>);
  }; 

  const display = currentUser ? (
    <div className="in-nav-bar">
      <li className="logo"><Link to="/" ><img src={window.images.logo_image_with_writing} /></Link></li>
      <li><p>Welcome, {`${currentUser.first_name} ${currentUser.last_name}`}</p></li>
      <li><button className="btn" onClick={logout}>Log Out</button></li>
    </div>
   ) : (
    <div className="out-nav-bar">
      <ul className="left-nav">
        <li className="logo"><Link to="/" ><img src={window.images.logo_image_with_writing}/></Link></li>
        <li>Products</li>
        <li>Learn</li>
        <li>Support</li>
      </ul>
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