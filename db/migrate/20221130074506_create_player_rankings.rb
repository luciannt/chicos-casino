class CreatePlayerRankings < ActiveRecord::Migration[7.0]
  def change
    create_table :player_rankings do |t|
      t.integer :ranking
      t.string :minigame

      t.timestamps
    end
  end
end
