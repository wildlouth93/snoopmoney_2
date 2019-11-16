import * as WatchListItemAPIUtil from '../utils/watchlistitems_api_util';

export const RECEIVE_WATCHLIST_ITEMS = 'RECEIVE_WATCHLIST_ITEMS';
export const RECEIVE_WATCHLIST_ITEM = 'RECEIVE_WATCHLIST_ITEM';
export const REMOVE_WATCHLIST_ITEM = 'REMOVE_WATCHLISTITEM';

const receiveWatchListItems = watchlistitems => ({
  type: RECEIVE_WATCHLIST_ITEMS,
  watchlistitems 
});

const receiveWatchListItem = watchlistitem => ({
  type: RECEIVE_WATCHLIST_ITEM, 
  watchlistitem 
})

const removeWatchListItem = ticker => ({
  type: REMOVE_WATCHLIST_ITEM,
  ticker
})

export const requestWatchListItems = () => dispatch => (
  WatchListItemAPIUtil.fetchWatchListItems()
    .then(watchlistitems => dispatch(receiveWatchListItems(watchlistitems)))
)

export const requestWatchListItem = (ticker) => dispatch => (
  WatchListItemAPIUtil.fetchWatchListItem(ticker)
    .then(watchlistitem => dispatch(receiveWatchListItem(watchlistitem)))
)

export const createWatchListItem = (watchlistitem) => dispatch => (
  WatchListItemAPIUtil.createWatchListItem(watchlistitem)
    .then(watchlistitem => dispatch(receiveWatchListItem(watchlistitem)))
)

export const deleteWatchListItem = (ticker) => dispatch => (
  WatchListItemAPIUtil.deleteWatchListItem(ticker)
    .then(() => dispatch(removeWatchListItem(ticker)))
)

