class AddTableIdToGame < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :table_id, :integer
  end
end
