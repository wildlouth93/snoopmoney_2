import React from 'react';


const SellForm = ({ stock, holdings, deleteHolding, createHolding }) => (
  <div className="buy-sell-form">
    <form onSubmit={deleteHolding}>
      <label>Shares
      <input type="number" />
      </label>
      <label>Market Price: ${stock.price}
        <input type="hidden" value={stock.price} />
      </label>
      <input type="hidden" value={stock.symbol} />
      <input type="hidden" value={currentUser.id} />
      <input type="submit" value="Buy Stock" />
    </form>
  </div>
)

export default SellForm; 