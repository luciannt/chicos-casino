class CreateTurns < ActiveRecord::Migration[7.0]
  def change
    create_table :turns do |t|
      t.integer :number
      t.integer :players_gone
      t.string :mini_game
      t.string :phase

      t.timestamps
    end
  end
end
