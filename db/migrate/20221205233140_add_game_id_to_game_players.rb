class AddGameIdToGamePlayers < ActiveRecord::Migration[7.0]
  def change
    add_column :game_players, :game_id, :integer
  end
end
