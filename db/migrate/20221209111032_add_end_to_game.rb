class AddEndToGame < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :end, :boolean
  end
end
