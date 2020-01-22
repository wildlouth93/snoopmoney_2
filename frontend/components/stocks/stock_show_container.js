import { connect } from "react-redux"; 
import { fetchStock } from '../../actions/stock_actions';
import StockShow from './stock_show';
import { requestHoldings, createHolding, deleteHolding } from '../../actions/holding_actions';
import { requestWatchListItems, createWatchListItem, deleteWatchListItem } from '../../actions/watchlistitem_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    stock: state.entities.stocks[ownProps.match.params.symbol] || {},
    holdings: Object.values(state.entities.holdings),
    watchlistitems: Object.values(state.entities.watchlistitems)
  }
}

const mapDispatchToProps = dispatch => ({
  fetchStock: symbol => dispatch(fetchStock(symbol)),
  requestHoldings: () => dispatch(requestHoldings()),
  requestWatchListItems: () => dispatch(requestWatchListItems()),
  createHolding: holding => dispatch(createHolding(holding)),
  createWatchListItem: watchlistitem => dispatch(createWatchListItem(watchlistitem)),
  deleteHolding: ticker => dispatch(deleteHolding(ticker)),
  deleteWatchListItem: ticker => dispatch(deleteWatchListItem(ticker))
})


export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(StockShow);