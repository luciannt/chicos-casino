class Hand
  extend Forwardable
  def_delegators :@cards, :size, :length

  attr_reader :cards

  def initialize(cards = nil)
    @cards = cards || []
  end

  def add(card)
    @cards << card

    self
  end

  def ==(other_hand)
    @cards == other_hand.cards
  end

  def split
    raise PlayError, "Can only split a hand of 2 cards" if @cards.size != 2
    raise PlayError, "Can only split a pair of the same rank" if @cards[0].rank != @cards[1].rank

    [Hand.new([@cards.first]), Hand.new([@cards.last])]
  end

  def splittable?
    @cards.length == 2 && @cards[0].rank == @cards[1].rank
  end
end
