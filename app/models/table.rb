class Table < ApplicationRecord
  has_many :players, dependent: :destroy

  before_create :setup
  before_save :marshall_card_data

  def deal
    # Deal cards in 2 passes, as would be done live
    hands = Array.new(players.count + 1)
    hands.map! { @shoe.deal }
    hands.each { |h| h.add(@shoe.draw) }

    players.each_with_index { |p, i| p.hand = hands[i] }
    @dealer_hand = hands.last
    save

    self
  end

  def dealer_hand
    @dealer_hand ||= begin
        return nil if dealer_hand_data.nil?

        cards = dealer_hand_data.map { |c| Card.from_parsed_json(c) }
        Hand.new(cards)
      end
  end

  def shoe
    @shoe ||= begin
        return nil if shoe_data.nil?

        Deck.from_parsed_json(shoe_data)
      end
  end

  def round_complete?
    players.map(&:turn_complete?).reduce { |a, b| a && b }
  end

  private

  def setup
    @shoe = Deck.new(shuffled: true)
  end

  def marshall_card_data
    self.dealer_hand_data = dealer_hand.cards if dealer_hand
    self.shoe_data = shoe if shoe
  end
end
