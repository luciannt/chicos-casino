class Card
  attr_reader :suit, :rank

  def initialize(rank, suit)
    @rank = rank
    @suit = suit
  end

  def self.from_parsed_json(json)
    raise ArgumentError, "JSON data does not include suit" unless json["suit"]
    raise ArgumentError, "JSON data does not include rank" unless json["rank"]

    new(json["rank"].to_sym, json["suit"].to_sym)
  end

  def ==(other_card)
    @rank == other_card.rank && @suit == other_card.suit
  end

  def to_s
    "#{rank} of #{suit}"
  end
end
