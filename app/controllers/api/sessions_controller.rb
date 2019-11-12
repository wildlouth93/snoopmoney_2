class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(params[:user][:email], [:user][:email])
    if @user.nil? 
      render json: ['Wrong credentials. Try again!'], status: 401
    else 
      login!(@user)
      render 'api/users/show'  
    end
  end

  def destroy 
    logout! 
    render json: { message: 'Logout successful.' }
  end
end
