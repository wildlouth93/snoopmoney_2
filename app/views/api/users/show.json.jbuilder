json.extract! @user, :id, :email, :first_name, :last_name, :account_balance

json.set! :holdings do
  @user.holdings.each do |holding|
    json.set! holding.ticker do
      json.extract! holding, :user_id, :ticker 
    end
  end
end

json.set! :watchlistitems do
  @user.watch_list_items.each do |watchlistitem|
    json.set! watchlistitem.ticker do
      json.extract! watchlistitem, :user_id, :ticker 
    end
  end
end