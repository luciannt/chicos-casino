class TurnSerializer < ActiveModel::Serializer
  attributes :id, :number, :players_gone, :mini_game, :phase
end
