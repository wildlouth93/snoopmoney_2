class Holding < ApplicationRecord
  validates :user_id, :ticker, presence: true
  validates :num_shares, :cost_basis, presence: true 
  belongs_to :user 
  
  attr_accessor :price, :change_percent_s, :one_day_chart
end
