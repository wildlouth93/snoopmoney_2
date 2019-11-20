import * as StockAPIUtil from '../utils/stocks_api_util';

export const RECEIVE_STOCKS = 'RECEIVE_STOCKS';
export const RECEIVE_STOCK = 'RECEIVE_STOCK';

const receiveStocks = stocks => ({
  type: RECEIVE_STOCKS,
  stocks
});

const receiveStock = stock => ({
  type: RECEIVE_STOCK,
  stock
})

export const fetchStocks = () => dispatch => (
  StockAPIUtil.fetchStocks()
    .then(stocks => dispatch(receiveStocks(stocks)))
)

export const fetchStock = (ticker) => dispatch => (
  StockAPIUtil.fetchStock(ticker)
    .then(stock => dispatch(receiveStock(stock)))
)