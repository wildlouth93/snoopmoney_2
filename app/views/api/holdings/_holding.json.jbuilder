json.set! :holding do  
  json.extract! holding, :id, :ticker, :user_id, :num_shares, :cost_basis
end

json.set! :company do 
  json.extract! holding, :price
  json.set! :symbol, holding.quote.symbol
  json.set! :about, holding.company_info.description
  json.set! :ceo, holding.company_info.ceo
  json.set! :employees, holding.company_info.employees
  json.set! :market_cap, holding.quote.market_cap
  json.set! :price_to_earnings, holding.quote.pe_ratio
  json.set! :dividend_yield, holding.company_key_stats.dividend_yield
  json.set! :average_volume, holding.quote.avg_total_volume
  json.set! :high_today, holding.quote.high 
  json.set! :low_today, holding.quote.low 
  json.set! :open_price, holding.quote.open 
  json.set! :volume, holding.quote.latest_volume
  json.set! :latest_price, holding.quote.latest_price 
  json.set! :company_name, holding.quote.company_name
  json.set! :week_52_high, holding.quote.week_52_high
  json.set! :week_52_low, holding.quote.week_52_low
  json.set! :company_logo_url, holding.company_logo.url 
end

json.extract! holding, :company_news 

json.extract! holding, :company_chart
