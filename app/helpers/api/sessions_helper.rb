module Api::SessionsHelper
    class Client 
      include HTTParty
      
      attr_reader :client 

      def initialize(ticker = nil)
        @client = IEX::Api::Client.new(
          publishable_token: 'pk_c0d9b6069cf349fbb1fc607a8f129ff9',
          endpoint: 'https://cloud.iexapis.com/v1/'
        )

        # @client2 = IEX::Api::Client.new(
        #   publishable_token: 'pk_c0d9b6069cf349fbb1fc607a8f129ff9',
        #   endpoint: 'https://cloud.iexapis.com/stable/stock/market/batch?symbols=aapl,fb&types=price'
        # )

        # https://cloud.iexapis.com
        # 'pk_c0d9b6069cf349fbb1fc607a8f129ff9'

        # Tsk_3578bacb68084209a84895ac7995e209
       

        puts "API inialized"
      
        # if (ticker != nil)
        #   @company_info = @client.company(ticker);
        #   @key_stats = @client.key_stats(ticker);
        #   @company_chart = @client.chart(ticker);
        #   @one_month_chart = @client.chart(ticker, '1m', chart_close_only: true);
        #   @one_year_chart = @client.chart(ticker, '1y', chart_close_only: true);
        # end

      end

      # def fetchPrices()
      #   url = "https://cloud.iexapis.com/stable/stock/market/batch?symbols=aapl,fb&types=price&token=pk_c0d9b6069cf349fbb1fc607a8f129ff9"
      #   response = HTTParty.get(url)
      #   JSON.parse(response.body)
      # end

       def fetchPrices(symbol_string)
        url = "https://cloud.iexapis.com/stable/stock/market/batch?symbols=#{symbol_string}&types=price&token=pk_c0d9b6069cf349fbb1fc607a8f129ff9"
        response = HTTParty.get(url)
        JSON.parse(response.body)
      end

      def get_price(ticker)
        puts "API price call"
        @client.quote(ticker).latest_price
      end

      def get_quote(ticker)
        puts "API quote call"
        @client.quote(ticker)
      end

      # def get_company_info()
      #   @company_info
      # end

      # def get_company_chart()
      #   @company_chart
      # end

      # def get_company_key_stats()
      #   @key_stats
      # end

      # def get_one_day_chart(ticker)
      #   puts "API chart call"
      #   @client.chart(ticker, '1d', chart_interval: 10);
      # end

      # def get_one_month_chart()
      #   @one_month_chart
      # end

      # def get_one_year_chart()
      #   @one_year_chart
      # end

  end
end
