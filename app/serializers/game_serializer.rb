class GameSerializer < ActiveModel::Serializer
  attributes :id, :turn_count, :game_code
end
