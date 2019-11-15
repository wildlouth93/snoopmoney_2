class AddIndicesToWatchListItems < ActiveRecord::Migration[5.2]
  def change
    remove_index :watch_list_items, :user_id
    remove_index :watch_list_items, :ticker
    add_index :watch_list_items, :user_id 
    add_index :watch_list_items, :ticker 
  end
end
