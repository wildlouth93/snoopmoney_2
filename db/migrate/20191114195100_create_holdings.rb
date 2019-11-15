class CreateHoldings < ActiveRecord::Migration[5.2]
  def change
    create_table :holdings do |t|
      t.integer :user_id, null: false 
      t.string :ticker, null: false 
      t.integer :num_shares, null: false 
      t.float :cost_basis, null: false 

      t.timestamps
    end
    add_index :holdings, :user_id, unique: true
    add_index :holdings, :ticker, unique: true 
  end
end
