class AddIndicesToHoldings < ActiveRecord::Migration[5.2]
  def change
    remove_index :holdings, :user_id
    remove_index :holdings, :ticker
    add_index :holdings, :user_id 
    add_index :holdings, :ticker 
  end
end
