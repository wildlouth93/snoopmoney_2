import { connect } from 'react-redux';
import { requestHoldings, deleteHolding, updateHolding } from '../../actions/holding_actions';
import HoldingIndex from './holding_index';

const mapStateToProps = state => ({
  holdings: Object.values(state.entities.holdings)
})

const mapDispatchToProps = dispatch => ({
  requestHoldings: () => dispatch(requestHoldings()),
  deleteHolding: ticker => dispatch(deleteHolding(ticker)),
  updateHolding: holding => dispatch(updateHolding(holding))
})

export default connect(mapStateToProps, mapDispatchToProps)(HoldingIndex);