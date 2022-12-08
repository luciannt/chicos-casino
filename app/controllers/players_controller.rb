class PlayersController < ApplicationController
  before_action :set_player, only: [:hit, :split, :stand]

  def hit
    table = @player.game.table
    @player.hand.add(table.shoe.draw)
    @player.next_hand if Blackjack.busted?(@player.hand)

    @player.save
    table.save

    redirect_to table_path(table)
  end

  def split
    @player.hands = @player.hands.map do |h|
      if h == @player.hand
        split_hands = h.split
        split_hands.each { |sh| sh.add(@player.game.table.shoe.draw) }
      else
        h
      end
    end

    @player.save
    @player.table.save

    redirect_to table_path(@player.table)
  end

  def stand
    @player.next_hand
    @player.save

    redirect_to table_path(@player.table)
  end

  private

  def set_player
    @player = Player.find(params[:id])
  end
end
