class AddPlayerTurnToGame < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :player_turn, :integer
  end
end
