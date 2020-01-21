class Api::WatchListItemsController < ApplicationController
  include Api::SessionsHelper 

  # before_action :require_logged_in

  def index 
    client = Client.new 
    @watch_list_items = current_user.watch_list_items;
    # @watch_list_items.each do |watchlistitem|
    #   watchlistitem.price = client.get_price(watchlistitem.ticker)
    # end
  end

  def create 
    client = Client.new 
    @watch_list_item = WatchListItem.new(watch_list_item_params)
  
    @watch_list_item.user_id = current_user.id;

    @watch_list_item.price = client.get_price(@watch_list_item.ticker)

    if @watch_list_item.save 
      render :show 
    else
      render json: @watch_list_item.errors.full_messages, status: 422
    end
   
  end

  def show 
    client = Client.new 

    @watch_list_item = current_user.watch_list_items.find_by(ticker: params[:id]);
    # @watch_list_item.price = client.get_price(@watch_list_item.ticker)
  
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
