class CreateGamePlayers < ActiveRecord::Migration[7.0]
  def change
    create_table :game_players do |t|
      t.integer :order

      t.timestamps
    end
  end
end
