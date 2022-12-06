class Game < ApplicationRecord
  has_many :game_players
  has_many :users, through: :game_players

  def self.new_game(code, host)
    game = Game.create(:game_code => code, :turn_count => 5)
    user = User.find_by(:id => host)
    turn = Turn.create(number: 0, phase: "Waiting", code: code)
    if user
      user.current_game_code = code
      user.save()
      gamePlayer = GamePlayer.create(:game => game, :user => user)
      game
    else
      ActionCable.server.broadcast("game_channel", { type: "FAILURE", message: "No user found" })
    end
  end

  def self.join_game(user_id, code)
    game = Game.find_by_game_code(code)
    user = User.find_by(:id => user_id)

    if game[:users].length < 4 && user
      addedPlayer = GamePlayer.create(:user => user, :game => game)
      user.current_game_code = code
      user.save()
      ActionCable.server.broadcast("game_channel", { type: "PLAYER_JOINED", payload: user.to_json })
    else
      ActionCable.server.broadcast("game_channel", { type: "FAILURE", message: "No user found" })
    end
  end

  def self.can_start_game(code)
    if game[:users].length < 5 && game[:users].length > 1
      true
    else
      false
    end
  end
end
