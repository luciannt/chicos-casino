class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_channel"
  end

  def unsubscribed
    game = Game.find_by_game_code(session[:game_code])
    game.delete()
    stop_all_streams
  end

  def received(data)
    ActionCable.server.broadcast("game_channel", data)
  end

  def take_turn
  end

  def new_game()
    game = Game.new_game(SecureRandom.urlsafe_base64)
    render "Created Game: :game.game_code"
  end
end
