class Deck
  extend Forwardable
  def_delegator :@cards, :size

  DEFAULT_SUITS = %w(spades clubs diamonds hearts).map(&:to_sym).freeze
  DEFAULT_RANKS = %w(ace two three four five six seven eight nine ten jack queen king).map(&:to_sym).freeze

  def initialize(options = {})
    default_options = {
      suits: DEFAULT_SUITS,
      ranks: DEFAULT_RANKS,
      shuffled: false,
    }
    options.reverse_merge!(default_options)

    @suits = options[:suits]
    @ranks = options[:ranks]
    @cards = Array.new

    # Top of the deck is the last entry in the array
    # Reversing so deck starts with cards in order from least to highest face value
    @suits.reverse.each do |suit|
      @ranks.reverse.each do |rank|
        @cards << Card.new(rank, suit)
      end
    end

    self.shuffle if options[:shuffled]
  end

  def self.from_parsed_json(json)
    raise ArgumentError "Missing cards from parsed JSON" if json["cards"].nil?
    cards = json["cards"].map { |c| Card.from_parsed_json(c) }

    Deck.new.tap do |deck|
      deck.instance_variable_set(:@cards, cards)
    end
  end

  def draw
    @cards.pop
  end

  def shuffle
    @cards.shuffle!

    self
  end

  def deal(hand_size = 1)
    hand_size = [self.size, hand_size].min
    Hand.new(Array.new(hand_size).map { draw })
  end
end
