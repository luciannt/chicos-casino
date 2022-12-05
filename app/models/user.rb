class User < ApplicationRecord
  has_many :scores, through: :user_score
  has_many :games, through: :game_players

  has_secure_password #bcrypt
  validates :username, presence: true, uniqueness: true
end
