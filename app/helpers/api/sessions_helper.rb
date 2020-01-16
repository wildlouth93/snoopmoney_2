module Api::SessionsHelper
    class Client 
      attr_reader :client 

      def initialize(ticker = nil)
        @client = IEX::Api::Client.new(
          publishable_token: 'Tpk_8945ca6a137b40068a66f5257e5ac120',
          endpoint: 'https://sandbox.iexapis.com/v1'
        )

        puts "API inialized"
        # @quote = @client.quote(ticker)
        # @price = @client.quote(ticker).iex_realtime_price;
        if (ticker != nil)
          @company_info = @client.company(ticker);
          @key_stats = @client.key_stats(ticker);
          @company_chart = @client.chart(ticker);
          @one_month_chart = @client.chart(ticker, '1m', chart_close_only: true);
          @one_year_chart = @client.chart(ticker, '1y', chart_close_only: true);
          # @earnings = @client.earnings(ticker);
        end

      end

      def get_price(ticker)
        puts "API price call"
        @client.quote(ticker).iex_realtime_price
      end

      def get_quote(ticker)
        puts "API quote call"
        @client.quote(ticker)
      end

      def get_company_info()
        @company_info
      end

      # def get_company_logo(ticker)
      #   @client.logo(ticker)
      # end

      # def get_company_news(ticker, num)
      #   @client.news('MSFT', num)
      # end

      def get_company_chart()
        @company_chart
      end

      def get_company_key_stats()
        @key_stats
      end

      def get_one_day_chart(ticker)
        puts "API chart call"
        @client.chart(ticker, '1d', chart_interval: 10);
      end

      def get_one_month_chart()
        @one_month_chart
      end

      def get_one_year_chart()
        @one_year_chart
      end

      # Options are: 5y, 2y, 1y, ytd, 6m, 3m, 1m

      # def get_company_dividends(ticker, period)
      #   @client.dividends(ticker, period)
      # end

      # def get_company_earnings()
      #   @client.earnings
      # end

      # def get_company_income_statement(ticker)
      #   @client.income(ticker)
      # end
  end
end
