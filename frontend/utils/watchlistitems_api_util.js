export const fetchWatchListItems = () => (
  $.ajax({
    url: `api/watch_list_items`,
    method: 'GET',
  })
);

export const fetchWatchListItem = ticker => {
  return $.ajax({
    url: `api/watch_list_items/${ticker}`,
    method: 'GET'
  })
}

export const createWatchListItem = watchlistitem => {
  return $.ajax({
    url: `api/watch_list_items`,
    method: 'POST',
    data: { watchlistitem }
  })
};

export const deleteWatchListItem = ticker => (
  $.ajax({
    method: 'delete',
    url: `api/watch_list_items/${ticker}`
  })
)

