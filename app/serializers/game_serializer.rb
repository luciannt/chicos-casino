class GameSerializer < ActiveModel::Serializer
  attributes :id, :turn_count, :game_code, :users
end
