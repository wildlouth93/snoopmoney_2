class Api::StocksController < ApplicationController
  include Api::SessionsHelper 
  include Api::StocksHelper

  def index 
    holdings = current_user.holdings 
    @stocks = holdings.map do |stock|
      Stock.new(stock.ticker)
    end
    render :index 
  end

  def show 
      # @stock = Holding.find(params[:ticker])
      # add stock specific information to @holding 
    @stock = Stock.new(params[:id])
    render :show 
  end
end


