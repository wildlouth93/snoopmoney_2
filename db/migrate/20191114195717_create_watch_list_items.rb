class CreateWatchListItems < ActiveRecord::Migration[5.2]
  def change
    create_table :watch_list_items do |t|
      t.integer :user_id, null: false 
      t.string :ticker, null: false 

      t.timestamps
    end
    add_index :watch_list_items, :user_id, unique: true
    add_index :watch_list_items, :ticker, unique: true 
  end
end
