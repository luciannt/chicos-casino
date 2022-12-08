class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :bet, :seat, :active_hand, :hands_data, :game_id, :user_id, :table, :user
end
