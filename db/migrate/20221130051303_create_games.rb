class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.integer :turn_count
      t.string :game_code

      t.timestamps
    end
  end
end
