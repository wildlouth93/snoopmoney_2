class Holding < ApplicationRecord
  validates :user_id, :ticker, presence: true, uniqueness: true 
  validates :num_shares, :cost_basis, presence: true 
  belongs_to :user 

end
