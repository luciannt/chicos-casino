class CreatePlayers < ActiveRecord::Migration[7.0]
  def change
    create_table :players do |t|
      t.integer :bet
      t.integer :seat
      t.integer :active_hand
      t.json :hands_data
      t.integer :game_id
      t.integer :user_id

      t.timestamps
    end
  end
end
