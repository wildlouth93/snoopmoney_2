export const fetchHoldings = () => (
  $.ajax({
    url: `api/holdings`,
    method: 'GET', 
  })
);

export const fetchHolding = ticker => {
  return $.ajax({
    url: `api/holdings/${ticker}`,
    method: 'GET'
  })
}

export const createHolding = holding => {
  return $.ajax({
    url: `api/holdings`,
    method: 'POST',
    data: { holding }
  })
};

export const updateHolding = holding => {
  return $.ajax({
    url: `api/holdings/${holding.ticker}`,
    method: 'PATCH',
    data: { holding }
  })
}

export const deleteHolding = ticker => (
  $.ajax({
    method: 'delete', 
    url: `api/holdings/${ticker}`
  })
)

