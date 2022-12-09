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

  def self.hit(code, player_id)
    player = Player.find(player_id[:player_id])
    game = Game.find_by_game_code(code)
    table = Table.find(game[:table_id])
    deck = Table.shoe(game[:table_id])
    deck.shuffle
    new_card = deck.deal
    table.save

    if player[:hands_data]
      hand = Hand.new(player[:hands_data][0]["cards"])
      hand.add(new_card.cards[0])
      player.hands_data = [hand]
      player.save
    else
      Game.deal(code, player)
    end

    rival = player

    gamePlayers = Player.where(game: game)

    gamePlayers.each do |user|
      if player[:user_id] != user[:user_id]
        rival = user
        game[:player_turn] = user[:user_id]
        game.save
      end
    end

    score = Blackjack.score(player.hands_data)
    player.hand_score = score
    player.save

    if Blackjack.busted?(player.hands_data)
      if rival[:score]
        rival.score = rival[:score] + 1
      else
        rival.score = 1
      end

      game.end = true
      rival.save
      game.save
    end

    message = { end: game[:end], hand_score: player[:hand_score] }
    message
  end

  def self.stand(code, player)
    player.stand = true
    player.save

    game = Game.find_by_game_code(code)

    rival = player

    gamePlayers = Player.where(game: game)

    gamePlayers.each do |user|
      if player[:user_id] != user[:user_id]
        rival = user

        if rival[:stand] == true
          game.end = true
          game.save

          rival_score = Blackjack.score(rival.hands_data)
          player_score = Blackjack.score(player.hands_data)

          if (rival_score > player_score)
            if rival[:score]
              rival.score = rival[:score] + 1
            else
              rival.score = 1
            end

            rival.save
          else
            if player[:score]
              player.score = player[:score] + 1
            else
              player.score = 1
            end

            player.save
          end
        else
          game[:player_turn] = user[:user_id]
          game.save
        end
      end
    end

    message = { end: game[:end], hand_score: player[:hand_score] }
    message
  end
end
