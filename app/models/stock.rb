class Stock
  include Api::SessionsHelper 
  include Api::StocksHelper 

  attr_reader :symbol, :price, :quote, :company_info, :company_news, :company_chart, :company_key_stats, :company_earnings, :one_day_chart, :one_month_chart, :one_year_chart

  def self.make_all_stocks 
    SP100_STOCK_SYMBOLS.each do |symbol| 
      STOCK.new(symbol)
    end
  end

  def initialize(symbol)
    client = Client.new 
    @symbol = symbol.upcase 
    @price = client.get_price(symbol)
    @quote = client.get_quote(symbol)
    @company_info = client.get_company_info(symbol)
    @company_news = client.get_company_news(symbol, 5)
    @company_chart = client.get_company_chart(symbol)
    @one_day_chart = client.get_one_day_chart(symbol)
    @one_month_chart = client.get_one_month_chart(symbol)
    @one_year_chart = client.get_one_year_chart(symbol)
    @company_key_stats = client.get_company_key_stats(symbol)
    @company_earnings = client.get_company_earnings(symbol)

    # @company_dividends = client.get_company_dividends(symbol, 1y)
    # @income_statement = client.get_company_income_statement(symbol)
    # @company_info = client.get_company_info(symbol)
    # @company_log = client.get_company_logo(symbol)
  end

  def update(symbol)
    client = Client.new 
 
    @price = client.get_price(symbol)
    @quote = client.get_quote(symbol)

    # @company_info = client.get_company_info(symbol)
    @company_news = client.get_company_news(symbol, 5)
    @company_chart = client.get_company_chart(symbol)
    @one_day_chart = client.get_one_day_chart(symbol)
    @one_month_chart = client.get_one_month_chart(symbol)
    @one_year_chart = client.get_one_year_chart(symbol)
    @company_key_stats = client.get_company_key_stats(symbol)
    @company_earnings = client.get_company_earnings(symbol)

    # self.company_logo = client.get_company_logo(symbol)
     # self.company_dividends = client.get_company_dividends(symbol)
    # self.income_statement = client.get_company_income_statement(symbol)
  end
 
end