class Api::UsersController < ApplicationController

  def index 
    @user = User.all  
  end

  def create 
    @user = User.new(user_params)

    if @user.save 
      Holding.create( user_id: @user.id, ticker: 'MSFT', num_shares: 1, cost_basis: 50);
      Holding.create( user_id: @user.id, ticker: 'AMZN', num_shares: 1, cost_basis: 50);
      WatchListItem.create( user_id: @user.id, ticker: 'FB');
      WatchListItem.create( user_id: @user.id, ticker: 'AMZN');

      login!(@user)
      @user.net_worth = @user_account_balance 
      
      render :show 
    else   
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update 
    @user = User.find(params[:id])
    if @user && @user.update_attributes(user_params)
      render :show 
    elsif !@user 
      render json: ['Could not locate user'], status: 400
    else   
      render json: @user.errors.full_messages, status: 401
    end
  end

  def show 
    @user = User.find(params[:id])
  end

  private 
  def user_params 
    params.require(:user).permit(:email, :first_name, :last_name, :password, :account_balance)
  end
end
