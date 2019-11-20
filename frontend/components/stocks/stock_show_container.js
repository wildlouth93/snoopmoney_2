import { connect } from "react-redux"; 
import { fetchStock } from '../../actions/stock_actions';
import StockShow from './stock_show';

const mapStateToProps = (state, ownProps) => {
  return {
    stock: state.entities.stocks[ownProps.match.params.symbol] || {}
  }
}

const mapDispatchToProps = dispatch => ({
  fetchStock: symbol => dispatch(fetchStock(symbol))
})


export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(StockShow);