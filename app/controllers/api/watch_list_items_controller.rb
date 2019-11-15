class Api::WatchListItemsController < ApplicationController
  include Api::SessionsHelper 

  # before_action :require_logged_in

  def index 
    @watch_list_items = WatchListItem.all  
  end

  def create 
    client = Client.new
 
    @watch_list_item = WatchListItem.new(watch_list_item_params)
  
    @watch_list_item.user_id = 29
    
    if @watch_list_item.save 
      @watch_list_item.price = client.get_price(@watch_list_item.ticker)
      @watch_list_item.quote = client.get_quote(@watch_list_item.ticker)
      @watch_list_item.company_info = client.get_quote(@watch_list_item.ticker)
      @watch_list_item.company_logo = client.get_company_logo(@watch_list_item.ticker)
      @watch_list_item.company_news = client.get_company_news(@watch_list_item.ticker, 5)
      @watch_list_item.company_chart = client.get_company_chart(@watch_list_item.ticker)
      @watch_list_item.company_key_stats = client.get_company_key_stats(@watch_list_item.ticker)
      @watch_list_item.company_dividends = client.get_company_dividends(@watch_list_item.ticker, '1y')
      @watch_list_item.company_earnings = client.get_company_earnings(@watch_list_item.ticker)
      @watch_list_item.income_statement = client.get_company_earnings(@watch_list_item.ticker)
      render :show 
    else
      render json: @watch_list_item.errors.full_messages, status: 422
    end
   
  end

  def update 
    client = Client.new
    @watch_list_item = WatchListItem.find(params[:id]);

    if @watch_list_item && @watch_list_item.update_attributes(user_params)
      render :show 
    elsif !@watch_list_item 
      render json: ['Could not locate watch_list_item'], status: 400
    else 
      render json: @watch_list_item.errors.full_messages, status: 401
    end
  end

  def show 
    client = Client.new

    @watch_list_item = WatchListItem.find(params[:id]);

    @watch_list_item.price = client.get_price(@watch_list_item.ticker);
    @watch_list_item.quote = client.get_quote(@watch_list_item.ticker);
    @watch_list_item.company_info = client.get_quote(@watch_list_item.ticker);
    @watch_list_item.company_logo = client.get_company_logo(@watch_list_item.ticker);
    @watch_list_item.company_news = client.get_company_news(@watch_list_item.ticker, 5);
    @watch_list_item.company_chart = client.get_company_chart(@watch_list_item.ticker);
    @watch_list_item.company_key_stats = client.get_company_key_stats(@watch_list_item.ticker);
    @watch_list_item.company_dividends = client.get_company_dividends(@watch_list_item.ticker, '1y');
    @watch_list_item.company_earnings = client.get_company_earnings(@watch_list_item.ticker);
    @watch_list_item.income_statement = client.get_company_earnings(@watch_list_item.ticker);
  end

  def destroy 
    @watch_list_item = WatchListItem.find(params[:id]);
    

    # where do we sell? In user model or this controller? 
  end

  private 
  def watch_list_item_params 
    params.require(:watch_list_item).permit(:ticker)
  end
end
