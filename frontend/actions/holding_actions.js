import * as HoldingAPIUtil from '../utils/holdings_api_util';

export const RECEIVE_HOLDINGS = 'RECEIVE_HOLDINGS';
export const RECEIVE_HOLDING = 'RECEIVE_HOLDING';
export const REMOVE_HOLDING = 'REMOVE_HOLDING';

const receiveHoldings = holdings => ({
  type: RECEIVE_HOLDINGS, 
  holdings 
});

const receiveHolding = holding => ({
  type: RECEIVE_HOLDING, 
  holding 
})

const removeHolding = ticker => ({
  type: REMOVE_HOLDING, 
  ticker
})

export const requestHoldings = () => dispatch => (
  HoldingAPIUti.fetchHoldings()
    .then(holdings => dispatch(receiveHoldings(holdings)) )
)

export const requestHolding = (ticker) => dispatch => (
  HoldingAPIUtil.fetchHolding(ticker)
    .then(holding => dispatch(receiveHoldings(holding)))
)

export const createHolding = (holding) => dispatch => (
  HoldingAPIUtil.createHolding(holding)
    .then(holding => dispatch(receiveHoldings(holding)))
)

export const updateHolding = (holding) => dispatch => (
  HoldingAPIUtil.updateHolding(holding)
    .then(holding => dispatch(receiveHoldings(holding)))
)

export const deleteHolding = (ticker) => dispatch => (
  HoldingAPIUtil.deleteHolding(ticker)
    .then(() => dispatch(removeEvent(eventId)))
)

