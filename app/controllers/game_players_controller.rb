class GamePlayersController < ApplicationController
  def index
    render json: GamePlayer.all, status: :ok
  end
end
