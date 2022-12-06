class Turn < ApplicationRecord
  validates :phase,
            :inclusion => { :in => ["Waiting", "OrderTest", "Roll", "Move", "End"],
                            :message => "%{value} is not a valid turn phase" }

  def self.take_turn(game_id, roll)
    # stuff
  end
end
