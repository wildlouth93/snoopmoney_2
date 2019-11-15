class RemoveIndices < ActiveRecord::Migration[5.2]
  def change
    remove_index :watch_list_items, :user_id
    remove_index :watch_list_items, :ticker
    remove_index :holdings, :user_id
    remove_index :holdings, :ticker
  end
end
