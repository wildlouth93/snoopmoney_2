json.set! :watchlistitems do
  @watch_list_items.each do |watch_list_item|
    json.set! watch_list_item.ticker do
      json.partial! 'watch_list_item', watch_list_item: watch_list_item 
    end
  end
end