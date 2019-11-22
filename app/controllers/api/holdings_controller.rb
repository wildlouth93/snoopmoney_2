class Api::HoldingsController < ApplicationController
  include Api::SessionsHelper 

  # before_action :require_logged_in

  def index 
    client = Client.new 
    @holdings = current_user.holdings;
    @holdings.each do |holding|
      holding.price = client.get_price(holding.ticker)
      holding.change_percent_s = client.get_quote(holding.ticker).change_percent_s
      holding.one_day_chart = client.get_one_day_chart(holding.ticker)
    end
    render :index 
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
      @holding.change_percent_s = client.get_quote(@holding.ticker).change_percent_s
      @holding.one_day_chart = client.get_one_day_chart(@holding.ticker)
      current_user.buy_stock(@holding.ticker) 
      render :show
      # redirect_to controller: 'stocks', action: 'show', holding_id: @holding.id
    else
      render json: @holding.errors.full_messages, status: 422
    end
   
  end

  def update 
    client = Client.new
    @holding = Holding.find_by(ticker: params[:id]);

    if @holding && @holding.update_attributes(holding_params)
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
    debugger; 
    @holding.price = client.get_price(@holding.ticker)
    @holding.change_percent_s = client.get_quote(@holding.ticker).change_percent_s
    @holding.one_day_chart = client.get_one_day_chart(@holding.ticker)
    render :show 
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
