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

export const createWatchListItem = watch_list_item => {
  return $.ajax({
    url: `api/watch_list_items`,
    method: 'POST',
    data: { watch_list_item }
  })
};

export const deleteWatchListItem = ticker => (
  $.ajax({
    method: 'delete',
    url: `api/watch_list_items/${ticker}`
  })
)

