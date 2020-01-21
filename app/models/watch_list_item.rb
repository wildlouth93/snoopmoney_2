class WatchListItem < ApplicationRecord
  validates :user_id, :ticker, presence: true
  belongs_to :user 

  attr_accessor :price
  # , :change_percent_s, :one_day_chart, :news
end
