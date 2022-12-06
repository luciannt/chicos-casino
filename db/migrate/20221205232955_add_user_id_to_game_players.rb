class AddUserIdToGamePlayers < ActiveRecord::Migration[7.0]
  def change
    add_column :game_players, :user_id, :integer
  end
end
