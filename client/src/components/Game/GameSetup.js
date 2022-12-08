import Game from "./Game";

export let Blackjack = {
  setup: () => ({
    player1_hand: [],
    player2_hand: [],
    deck: [],
    round: 1,
  }),

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  moves: {
    hit: ({ G, playerID }, card, playerNum) => {
      playerNum === 1
        ? (G.player1_hand = [...G.player1_hand, card])
        : (G.player2_hand = [...G.player2_hand, card]);

      Game.deck.pop();
    },
  },
};
