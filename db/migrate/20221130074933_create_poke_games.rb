class CreatePokeGames < ActiveRecord::Migration[7.0]
  def change
    create_table :poke_games do |t|

      t.timestamps
    end
  end
end
