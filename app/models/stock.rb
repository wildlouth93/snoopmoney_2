class Stock
  include Api::SessionsHelper 
  include Api::StocksHelper 

  attr_reader :symbol, :price, :quote, :company_info, :company_news, :company_chart, :company_key_stats, :company_earnings, :one_day_chart, :one_month_chart, :one_year_chart, :change_percent_s

  def self.make_all_stocks 
    SP100_STOCK_SYMBOLS.each do |symbol| 
      STOCK.new(symbol)
    end
  end

  def initialize(symbol)
    puts "New stock inialized"
    client = Client.new(symbol)
    @symbol = symbol.upcase 
    @price = client.get_price(symbol)
    # @quote = client.get_quote(symbol)
    # @company_info = client.get_company_info();
    # @company_chart = client.get_company_chart();
    # @one_day_chart = client.get_one_day_chart(symbol)
    # @one_month_chart = client.get_one_month_chart();
    # @one_year_chart = client.get_one_year_chart();
    # @company_key_stats = client.get_company_key_stats();
    # @change_percent_s = @quote.change_percent_s;

  end

  def update(symbol)
    client = Client.new(symbol)
 
    @price = client.get_price(symbol)
    # @quote = client.get_quote(symbol)
    # @company_chart = client.get_company_chart();
    # @one_day_chart = client.get_one_day_chart(symbol);
    # @one_month_chart = client.get_one_month_chart();
    # @one_year_chart = client.get_one_year_chart();
    # @company_key_stats = client.get_company_key_stats();  
    # @change_percent_s = @quote.change_percent_s;

  end
 
end
