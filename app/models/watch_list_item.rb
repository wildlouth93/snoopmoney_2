class WatchListItem < ApplicationRecord
  validates :user_id, :ticker, presence: true, uniqueness: true 
  belongs_to :user 

end
