class Game < ApplicationRecord
  has_many :users, through: :game_players

  def self.new_game(code)
    ActionCable.server.broadcast "create", { action: "new_game" }
  end
end
