export const fetchStocks = () => (
  $.ajax({
    url: `api/stocks`,
    method: 'GET',
  })
);

export const fetchStock = ticker => {
  return $.ajax({
    url: `api/stocks/${ticker}`,
    method: 'GET'
  })
}