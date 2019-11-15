class Api::WatchListItemsController < ApplicationController

  def index 
    @watch_list_items = WatchListItem.all  
  end

  def create 
    @watch_list_item = WatchListItem.new(watch_list_item_params)

    # if @user.save 
    #   login!(@user)
    #   render :show 
    # else   
    #   render json: @user.errors.full_messages, status: 422
    # end
  end

  def update 
    @watch_list_item = WatchListItem.find(params[:id])
    # if @user && @user.update_attributes(user_params)
    #   render :show 
    # elsif !@user 
    #   render json: ['Could not locate user'], status: 400
    # else   
    #   render json: @user.errors.full_messages, status: 401
    # end
  end

  private 
  def watch_list_item_params 
    params.require(:user).permit(:user_id, :ticker)
  end
end
