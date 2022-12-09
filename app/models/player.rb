class Player < ApplicationRecord
  belongs_to :game
  belongs_to :user
  belongs_to :table

  before_save :marshall_card_data

  def hands=(new_hands)
    @hands = new_hands
    update(active_hand: 0)

    @hands
  end

  def hands
    @hands ||= begin
        return nil if hands_data.nil?

        parsed_hands_data = JSON.parse(hands_data)
        parsed_hands_data.map do |hand|
          cards = hand["cards"].map { |c| Card.from_parsed_json(c) }
          Hand.new(cards)
        end
      end
  end

  def hand
    return nil if hands.nil?

    hands[active_hand]
  end

  def hand=(new_hand)
    @hands = [new_hand]
    save
    new_hand
  end

  def next_hand
    return nil unless hands

    update(active_hand: active_hand + 1)
    hand
  end

  def turn_complete?
    hand.nil?
  end

  def get_top_scores
    players = Players.where()
  end

  private

  def marshall_card_data
    self.hands_data = @hands.to_json if @hands.present?
  end
end
