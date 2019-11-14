import React from 'react';

export default () => {
  return (
    <div>
      <section className="main-out">
        <div className="main-out-left">
          <h1>It's Time To Do Money</h1>
          <p>Robinhood, a pioneer of commission-free investing, gives you 
          acces to investing and more ways to make your money work harder.</p>
        </div>
        <div className="main-out-right">
          <img className="intro-pic" src={window.images.intro_image}/>
        </div>
      </section>
    </div>
  );
};