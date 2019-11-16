class Api::HoldingsController < ApplicationController
  include Api::SessionsHelper 

  before_action :require_logged_in

  def index 
    @holdings = current_user.holdings;
    client = Client.new

    @holdings.each do |holding| 
      holding.price = client.get_price(holding.ticker)
      holding.quote = client.get_quote(holding.ticker)
      holding.company_info = client.get_company_info(holding.ticker)
      holding.company_logo = client.get_company_logo(holding.ticker)
      holding.company_news = client.get_company_news(holding.ticker, 5)
      holding.company_chart = client.get_company_chart(holding.ticker)
      holding.company_key_stats = client.get_company_key_stats(holding.ticker)
      holding.company_dividends = client.get_company_dividends(holding.ticker, '1y')
      holding.company_earnings = client.get_company_earnings(holding.ticker)
      holding.income_statement = client.get_company_earnings(holding.ticker)
    end
  end

  def create 
    client = Client.new
    #user = User.find_by_credentials(params[:user][:user_id])
    @holding = Holding.new(holding_params)
  
    @holding.user_id = current_user.id;
    #worked when i did @holding.user_id = 28; 
    #error when I do current_user.id 
    
    if @holding.save 
      @holding.price = client.get_price(@holding.ticker)
      @holding.quote = client.get_quote(@holding.ticker)
      @holding.company_info = client.get_company_info(@holding.ticker)
      @holding.company_logo = client.get_company_logo(@holding.ticker)
      @holding.company_news = client.get_company_news(@holding.ticker, 5)
      @holding.company_chart = client.get_company_chart(@holding.ticker)
      @holding.company_key_stats = client.get_company_key_stats(@holding.ticker)
      @holding.company_dividends = client.get_company_dividends(@holding.ticker, '1y')
      @holding.company_earnings = client.get_company_earnings(@holding.ticker)
      @holding.income_statement = client.get_income_statement(@holding.ticker)
      current_user.buy_stock(@holding.ticker) 
      render :show 
    else
      render json: @holding.errors.full_messages, status: 422
    end
   
  end

  def update 
    client = Client.new
    @holding = Holding.find_by(ticker: params[:id]);

    if @holding && @holding.update_attributes(holding_params)
      @holding.price = client.get_price(@holding.ticker)
      @holding.quote = client.get_quote(@holding.ticker)
      @holding.company_info = client.get_company_info(@holding.ticker)
      @holding.company_logo = client.get_company_logo(@holding.ticker)
      @holding.company_news = client.get_company_news(@holding.ticker, 5)
      @holding.company_chart = client.get_company_chart(@holding.ticker)
      @holding.company_key_stats = client.get_company_key_stats(@holding.ticker)
      @holding.company_dividends = client.get_company_dividends(@holding.ticker, '1y')
      @holding.company_earnings = client.get_company_earnings(@holding.ticker)
      @holding.income_statement = client.get_company_earnings(@holding.ticker)
      current_user.buy_more_stock(@holding.ticker)
      render :show 
    elsif !@holding 
      render json: ['Could not locate holding'], status: 400
    else 
      render json: @holding.errors.full_messages, status: 401
    end
  end

  def show 
    client = Client.new

    @holding = current_user.holdings.find_by(ticker: params[:id]);
 
    @holding.price = client.get_price(@holding.ticker);
    @holding.quote = client.get_quote(@holding.ticker);
    @holding.company_info = client.get_company_info(@holding.ticker);
    @holding.company_logo = client.get_company_logo(@holding.ticker);
    @holding.company_news = client.get_company_news(@holding.ticker, 5);
    @holding.company_chart = client.get_company_chart(@holding.ticker);
    @holding.company_key_stats = client.get_company_key_stats(@holding.ticker);
    @holding.company_dividends = client.get_company_dividends(@holding.ticker, '1y');
    @holding.company_earnings = client.get_company_earnings(@holding.ticker);
    @holding.income_statement = client.get_company_earnings(@holding.ticker);
  end

  def destroy 
    @holding = current_user.holdings.find_by(ticker: params[:id]);

    current_user.sell_stock(@holding.ticker)
    @holding.destroy 
    render json: @holding.id 
    # where do we sell? In user model or this controller? 
  end

  private 
  def holding_params 
    params.require(:holding).permit(:ticker, :num_shares, :cost_basis)
  end
end
