class WatchListItem < ApplicationRecord
  validates :user_id, :ticker, presence: true
  belongs_to :user 

end
