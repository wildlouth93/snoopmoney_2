class Api::WatchListItemsController < ApplicationController
  include Api::SessionsHelper 

  # before_action :require_logged_in

  def index 
    @watch_list_items = cuurent_user.watch_list_items;
    client = Client.new
    @watch_list_items.each do |item| 
      item.price = client.get_price(item.ticker)
      item.quote = client.get_quote(item.ticker)
      item.company_info = client.get_company_info(item.ticker)
      item.company_logo = client.get_company_logo(item.ticker)
      item.company_news = client.get_company_news(item.ticker, 5)
      item.company_chart = client.get_company_chart(item.ticker)
      item.company_key_stats = client.get_company_key_stats(item.ticker)
      item.company_dividends = client.get_company_dividends(item.ticker, '1y')
      item.company_earnings = client.get_company_earnings(item.ticker)
      item.income_statement = client.get_company_earnings(item.ticker)
    end
  end

  def create 
    client = Client.new
 
    @watch_list_item = WatchListItem.new(watch_list_item_params)
  
    @watch_list_item.user_id = current_user;

    debugger; 
    
    if @watch_list_item.save 
      @watch_list_item.price = client.get_price(@watch_list_item.ticker)
      @watch_list_item.quote = client.get_quote(@watch_list_item.ticker)
      @watch_list_item.company_info = client.get_company_info(@watch_list_item.ticker)
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

  def show 
    client = Client.new

    @watch_list_item = current_user.watch_list_items.find_by(ticker: params[:id]);
  
    @watch_list_item.price = client.get_price(@watch_list_item.ticker);
    @watch_list_item.quote = client.get_quote(@watch_list_item.ticker);
    @watch_list_item.company_info = client.get_company_info(@watch_list_item.ticker);
    @watch_list_item.company_logo = client.get_company_logo(@watch_list_item.ticker);
    @watch_list_item.company_news = client.get_company_news(@watch_list_item.ticker, 5);
    @watch_list_item.company_chart = client.get_company_chart(@watch_list_item.ticker);
    @watch_list_item.company_key_stats = client.get_company_key_stats(@watch_list_item.ticker);
    @watch_list_item.company_dividends = client.get_company_dividends(@watch_list_item.ticker, '1y');
    @watch_list_item.company_earnings = client.get_company_earnings(@watch_list_item.ticker);
    @watch_list_item.income_statement = client.get_company_earnings(@watch_list_item.ticker);
  end

  def destroy 
    @watch_list_item = current_user.watch_list_items.find_by(ticker: params[:id]);
    @watch_list_item.destroy 
    render json: @watch_list_item.id 
    # where do we sell? In user model or this controller? 
  end

  private 
  def watch_list_item_params 
    params.require(:watch_list_item).permit(:ticker)
  end
end
