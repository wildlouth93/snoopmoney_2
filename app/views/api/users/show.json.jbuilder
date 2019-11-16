json.extract! @user, :id, :email, :first_name, :last_name, :account_balance, :net_worth, :total_cost_basis

json.set! :holdings do
  @user.holdings.each do |holding|
    json.set! holding.ticker do
      json.extract! holding, :id, :user_id, :ticker, :num_shares, :cost_basis 
    end
  end
end

json.set! :watchlistitems do
  @user.watch_list_items.each do |watchlistitem|
    json.set! watchlistitem.ticker do
      json.extract! watchlistitem, :id, :user_id, :ticker 
    end
  end
end