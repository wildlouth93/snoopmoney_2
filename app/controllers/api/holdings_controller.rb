class Api::HoldingsController < ApplicationController
  include Api::SessionsHelper 

  def index 
    @holdings = Holding.all  
  end

  def create 
    client = Client.new
    @holding = Holding.new(holding_params)
    @holding.user = current_user; 
    @holding.price = client.get_price(@holding.ticker);
    @holding.quote = client.get_quote(@holding.ticker);
    @holding.company_info = client.get_quote(@holding.ticker);
    @holding.company_logo = client.get_company_logo(@holding.ticker);
    @holding.company_news = client.get_company_news(@holding.ticker, 5);
    @holding.company_chart = client.get_company_chart(@holding.ticker);
    @holding.company_key_stats = client.get_company_key_stats(@holding.ticker);
    @holding.company_dividends = client.get_company_dividends(@holding.ticker, '1y');
    @holding.company_earnings = client.get_company_earnings(@holding.ticker);
    @holding.income_statement = client.get_company_earnings(@holding.ticker);
    
    
    if @holding.save 
      render :show 
    else
      render json: @holding.errors.full_messages, status: 422
    end
   
  end

  def update 
    client = Client.new
    @holding = Holding.find(params[:id]);

    @holding = Holding.new(holding_params)
    if @user && @user.update_attributes(user_params)
      render :show 
    elsif !@holding 
      render json: ['Could not locate holding'], status: 400
    else 
      render json: @holding.errors.full_messages, status: 401
    end
  end

  def show 
    client = Client.new
    @holding = Holding.find(params[:id]);
    @holding.user = current_user; 
    @holding.price = client.get_price(@holding.ticker);
    @holding.quote = client.get_quote(@holding.ticker);
    @holding.company_info = client.get_quote(@holding.ticker);
    @holding.company_logo = client.get_company_logo(@holding.ticker);
    @holding.company_news = client.get_company_news(@holding.ticker, 5);
    @holding.company_chart = client.get_company_chart(@holding.ticker);
    @holding.company_key_stats = client.get_company_key_stats(@holding.ticker);
    @holding.company_dividends = client.get_company_dividends(@holding.ticker, '1y');
    @holding.company_earnings = client.get_company_earnings(@holding.ticker);
    @holding.income_statement = client.get_company_earnings(@holding.ticker);
  end

  def destroy 
    @holding = Holding.find(params[:id]);
    

    # where do we sell? In user model or this controller? 
  end

  private 
  def holding_params 
    params.require(:user).permit(:ticker, :num_shares, :cost_basis)
  end
end
