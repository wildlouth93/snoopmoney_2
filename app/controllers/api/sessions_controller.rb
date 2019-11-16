class Api::SessionsController < ApplicationController
  include Api::SessionsHelper
  def new 
    
  end

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    # @tickers = @user.tickers 
    # array of tickers 
    @watchlistitems = @user.watch_list_items;
    @holdings = @user.holdings; 

    client = Client.new
    # @tickers.map do |ticker| 
    #   client.get_quote(ticker)
    # end
    # do this twice: 1 for holdings, 1 for watchlistitems 
    if @user.nil? 
      render json: ['Wrong credentials. Try again!'], status: 401
    else 
      login!(@user)
      render 'api/users/show'  
    end
  end

  def destroy 
    @user = current_user
    if @user 
      logout! 
      render json: { message: 'Logout successful.' }
    else  
      render json: ["Nobody signed in"], status: 404;
    end
  end
end
