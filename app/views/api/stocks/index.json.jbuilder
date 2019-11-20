@stocks.each do |stock|
  json.set! stock.quote.symbol do
    json.partial! 'stock', stock: stock
  end
end