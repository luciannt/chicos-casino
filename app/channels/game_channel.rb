class GameChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    stream_from "game_channel"
  end

  def unsubscribed
    puts "Unsubscribed"
    ActionCable.server.broadcast "game_channel", { type: "unsubscribe" }.to_json
    stop_all_streams
  end

  def received(data)
    ActionCable.server.broadcast("game_channel", data)
  end

  def game_check(user_id)
    user = User.find(user_id)
    code = user[:current_game_code]

    if code
      ActionCable.server.broadcast("game_channel", { type: "CHECK_GAME_VIABILITY", payload: Game.can_start_game(code) })
    end

    if user && code
      game = Game.find_by_game_code(code)

      if !(game[:users].include? user)
        Game.join_game(user_id, code)
        ActionCable.server.broadcast "game_channel", "joined game"
      end
    end
  end

  def take_turn
  end

  def new_game(opts)
    game = Game.new_game(SecureRandom.urlsafe_base64, opts["user_id"])
    ActionCable.server.broadcast("game_channel", { type: "GAME_CREATED", payload: game[:game_code] })
  end

  private

  def find_user_id
    user = User.find(params[:id])
  end
end
