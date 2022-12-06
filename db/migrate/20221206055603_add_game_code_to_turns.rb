class AddGameCodeToTurns < ActiveRecord::Migration[7.0]
  def change
    add_column :turns, :code, :string
  end
end
