class Api::UsersController < ApplicationController

  def index 
    @user = User.all  
  end
  
  def new 
    @user = User.new(user_params)
  end

  def create 
    @user = User.new(user_params)
    if @user.save 
      login!(@user)
      render :show 
    else   
      render json: @user.errors.full_messages, status: 401
    end
  end

  def edit 
    @user = User.find(params[:id])
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
