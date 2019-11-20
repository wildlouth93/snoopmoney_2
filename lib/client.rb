module Client 
    attr_reader :client 

    def initialize
      @client = IEX::Api::Client.new(
        publishable_token: 'Tpk_8945ca6a137b40068a66f5257e5ac120',
        endpoint: 'https://sandbox.iexapis.com/v1'
      )
    end

    def get_price(ticker)
      @client.price(ticker);
    end

    def get_quote(ticker)
      @client.quote(ticker)
    end

    def get_company_info(ticker)
      @client.company(ticker)
    end

    def get_company_logo(ticker)
      @client.logo(ticker)
    end

    def get_company_news(ticker, num)
      @client.news('MSFT', num)
    end

    def get_company_chart(ticker)
      @client.chart(ticker, 'dynamic')
    end

    def get_one_day_chart(ticker)
      @client.chart(ticker, '1d')
    end

    def get_company_key_stats(ticker)
      @client.key_stats(ticker);
    end

    # Options are: 5y, 2y, 1y, ytd, 6m, 3m, 1m
    def get_company_dividends(ticker, period)
      @client.dividends(ticker, period)
    end

    def get_company_earnings(ticker)
      @client.earnings(ticker)
    end

    def get_company_income_statement(ticker)
      @client.income(ticker)
    end
end