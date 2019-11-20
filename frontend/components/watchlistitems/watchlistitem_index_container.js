import { connect } from 'react-redux';
import { requestWatchListItems, deleteWatchListItem} from '../../actions/watchlistitem_actions';
import WatchListItemsIndex from './watchlistitem_index';

const mapStateToProps = state => {
  return {watchlistitems: Object.values(state.entities.watchlistitems)}
}

const mapDispatchToProps = dispatch => ({
  requestWatchListItems: () => dispatch(requestWatchListItems()),
  deleteWatchListItem: ticker => dispatch(deleteWatchListItem(ticker)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchListItemsIndex);