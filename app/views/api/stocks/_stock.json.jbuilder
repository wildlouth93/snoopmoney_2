json.extract! stock, :price
json.set! :symbol, stock.quote.symbol
json.set! :about, stock.company_info.description
json.set! :ceo, stock.company_info.ceo
json.set! :employees, stock.company_info.employees
json.set! :market_cap, stock.quote.market_cap
json.set! :price_to_earnings, stock.quote.pe_ratio
json.set! :dividend_yield, stock.company_key_stats.dividend_yield
json.set! :average_volume, stock.quote.avg_total_volume
json.set! :high_today, stock.quote.high 
json.set! :low_today, stock.quote.low 
json.set! :open_price, stock.quote.open 
json.set! :volume, stock.quote.latest_volume
json.set! :latest_price, stock.quote.latest_price 
json.set! :company_name, stock.quote.company_name
json.set! :week_52_high, stock.quote.week_52_high
json.set! :week_52_low, stock.quote.week_52_low


json.extract! stock, :company_news 

json.extract! stock, :company_chart
json.extract! stock, :one_day_chart
json.extract! stock, :one_month_chart
json.extract! stock, :one_year_chart 

json.extract! stock, :change_percent_s