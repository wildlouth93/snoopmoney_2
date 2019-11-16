class Holding < ApplicationRecord
  validates :user_id, :ticker, presence: true
  validates :num_shares, :cost_basis, presence: true 
  belongs_to :user 
  
  attr_accessor :price, :quote, :company_info, :company_logo, :company_news, :company_chart, :company_key_stats, :company_dividends, :company_earnings, :income_statement

end
