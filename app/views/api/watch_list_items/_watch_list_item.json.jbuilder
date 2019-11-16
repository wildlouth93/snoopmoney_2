json.set! :watch_list_item do  
  json.extract! watch_list_item, :id, :ticker, :user_id
end

json.set! :company do 
  json.extract! watch_list_item, :price
  json.set! :symbol, watch_list_item.quote.symbol
  json.set! :about, watch_list_item.company_info.description
  json.set! :ceo, watch_list_item.company_info.ceo
  json.set! :employees, watch_list_item.company_info.employees
  json.set! :market_cap, watch_list_item.quote.market_cap
  json.set! :price_to_earnings, watch_list_item.quote.pe_ratio
  json.set! :dividend_yield, watch_list_item.company_key_stats.dividend_yield
  json.set! :average_volume, watch_list_item.quote.avg_total_volume
  json.set! :high_today, watch_list_item.quote.high 
  json.set! :low_today, watch_list_item.quote.low 
  json.set! :open_price, watch_list_item.quote.open 
  json.set! :volume, watch_list_item.quote.latest_volume
  json.set! :latest_price, watch_list_item.quote.latest_price 
  json.set! :company_name, watch_list_item.quote.company_name
  json.set! :week_52_high, watch_list_item.quote.week_52_high
  json.set! :week_52_low, watch_list_item.quote.week_52_low
  json.set! :company_logo_url, watch_list_item.company_logo.url 
end

json.extract! watch_list_item, :company_news 

json.extract! watch_list_item, :company_chart