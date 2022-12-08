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
    table = Table.find_by_game(game)

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

  def self.start_game(code, p1, p2)
    game = Game.find_by_game_code(code)
    table = Table.find_by_game()
    ActionCable.server.broadcast("game_channel", { type: "START_GAME", message: table })
  end

  def self.deal(code, user_id)
    player = Player.find_by_user(user_id)
    game = Game.find_by_game_code(code)
    table = Table.find_by_game(game)
    deck = table[:dealer_hand_data]
    new_card = deck.deal

    parsed_deck = JSON.parse(deck)
    parsed_deck.merge(new_card)
    player.hands_data = parsed_deck
    player.save

    # TODO: Win/Lose check
  end

  def self.hit(code, user_id)
  end
end
