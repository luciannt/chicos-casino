module Blackjack
  class << self
    def score(hand, options = {})
      options.reverse_merge!({ aces: :best })
      aces_high = options[:aces] == :high

      score = hand.cards.map { |card| value_for(card, aces_high) }.sum

      if options[:aces] == :best
        aces_in_hand = hand.cards.detect { |c| c.rank == :ace }.present?
        score += 10 if aces_in_hand && score < 12
      end

      score
    end

    def busted?(hand)
      score(hand) > 21
    end

    def result(player_hand, dealer_hand)
      if busted?(player_hand)
        :loss
      elsif busted?(dealer_hand)
        :win
      else
        player_score = score(player_hand)
        dealer_score = score(dealer_hand)
        if player_score > dealer_score
          :win
        elsif player_score < dealer_score
          :loss
        else
          :push
        end
      end
    end

    def blackjack?(hand)
      hand.size == 2 && score(hand) == 21
    end

    def legal_actions(hand)
      actions = []
      return actions if busted?(hand) || blackjack?(hand)

      actions += [:stand, :hit]
      actions << :split if hand.splittable?

      actions
    end

    private

    def value_for(card, aces_high)
      case card.rank
      when :ace
        aces_high ? 11 : 1
      when :two
        2
      when :three
        3
      when :four
        4
      when :five
        5
      when :six
        6
      when :seven
        7
      when :eight
        8
      when :nine
        9
      when :ten, :jack, :queen, :king
        10
      else
        raise PlayError, "#{card.rank} is an illegal card in Blackjack"
      end
    end
  end
end
