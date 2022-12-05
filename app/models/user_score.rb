class UserScore < ApplicationRecord
  belongs_to :scores
  belongs_to :user
end
