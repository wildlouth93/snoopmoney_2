import React from 'react';
import WatchListItemsIndexItem from './watchlistitems_index_item';
import { Link } from 'react-router-dom';

class WatchListItemsIndex extends React.Component {
  componentDidMount() {
    this.props.requestWatchListItems();
  }

  render() {
    const { watchlistitems, deleteWatchListItem } = this.props;
    return (
      <div>
        <ul>
          {
            
            watchlistitems.map(watchlistitem => (
              <WatchListItemsIndexItem
                watchlistitem={watchlistitem}
                deleteWatchListItem={deleteWatchListItem}
                key={watchlistitem.ticker}
              />
            ))
          }
        </ul>
        <Link to="/">Home</Link>
      </div>
    )
  }
}

export default WatchListItemsIndex; 