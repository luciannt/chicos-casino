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
    ActionCable.server.broadcast("game_channel", { type: "ATTEMPTING TO JOIN", payload: user })

    gamePlayers = GamePlayer.where(game: game)
    ActionCable.server.broadcast("game_channel", { type: "PLAYER_COUNT", payload: gamePlayers })

    if gamePlayers.length < 4 && user && user[:current_game_code] != code
      addedPlayer = GamePlayer.create(:user => user, :game => game)
      user.current_game_code = code
      user.save()
      ActionCable.server.broadcast("game_channel", { type: "PLAYER_JOINED", payload: user })
    end
    if !user
      ActionCable.server.broadcast("game_channel", { type: "FAILURE", message: "No user found" })
    end
    if user[:current_game_code]
      user
    else
      ActionCable.server.broadcast("game_channel", { type: "FAILURE", message: "Game is full" })
    end
  end

  def self.can_start_game(code)
    game = Game.find_by_game_code(code)
    gamePlayers = GamePlayer.where(game: game)
    if gamePlayers.length < 5 && gamePlayers.length > 1
      true
    else
      false
    end
  end
end
