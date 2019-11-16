import { connect } from 'react-redux';
import { requestHolding } from '../../actions/holding_actions';
import HoldingShow from './holding_show';

const mapStateToProps = (state, ownProps) => ({
  holding: state.holdings[ownProps.match.params.ticker]
})

const mapDispatchToProps = (dispatch) => ({
  requestHolding: ticker => dispatch(requestHolding(ticker))
})

export default connect(mapStateToProps, mapDispatchToProps)(HoldingShow);