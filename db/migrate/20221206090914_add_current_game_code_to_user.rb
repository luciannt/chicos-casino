class AddCurrentGameCodeToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :current_game_code, :string
  end
end
