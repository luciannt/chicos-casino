class GamesController < ApplicationController
  def get_by_code
    game = Game.find_by_game_code(params[:code])
    render json: game, status: :ok
  end
end
