class Game < ApplicationRecord
  has_many :players
  has_many :users, through: :players
  belongs_to :table

  def self.new_game(code, host)
    table = Table.create

    game = Game.create(game_code: code, table: table)
    user = User.find_by(:id => host)

    if user
      user.current_game_code = code
      user.save
      gamePlayer = Player.create!(:game => game, :user => user, table: table)
      game
    else
      ActionCable.server.broadcast("game_channel", { type: "FAILURE", message: "No user found" })
    end
  end

  def self.join_game(user_id, code)
    game = Game.find_by_game_code(code)
    user = User.find_by(:id => user_id)
    table = Table.find(game[:table_id])

    gamePlayers = Player.where(game: game)

    if gamePlayers.length < 2 && user && user[:current_game_code] != code
      addedPlayer = Player.create!(:user => user, :game => game, table: table)
      user.current_game_code = code
      user.save
      ActionCable.server.broadcast("game_channel", { type: "PLAYER_JOINED", payload: user })
    else
      ActionCable.server.broadcast("game_channel", { type: "FAILURE", message: "Something went wrong when attempting to rejoin." })
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
    gamePlayers = Player.where(game: game)
    if gamePlayers.length == 2
      true
    else
      false
    end
  end

  def self.start_game(code)
    if (Game.can_start_game(code))
      game = Game.find_by_game_code(code)
      game.started = true
      game.save!
      table = Table.find(game[:table_id])
      Table.setup(table[:id])
      ActionCable.server.broadcast("game_channel", { type: "START_GAME", message: table })
      table
    else
      table
    end
  end

  def self.deal(code, player)
    game = Game.find_by_game_code(code)
    deck = Table.shoe(game[:table_id])
    new_card = deck.deal

    player.hands_data = [new_card]
    player.save
  end

  def self.hit(code, user_id)
    # TODO: Win/Lose check
  end
end
