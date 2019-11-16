class FixIndicesStock < ActiveRecord::Migration[5.2]
  def change
    add_index :holdings, [:ticker, :user_id], unique: true  
    add_index :watch_list_items, [:ticker, :user_id], unique: true  
  end
end
