function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomizeSpaces = (arr) => {
  let badSpaces = Array(9).fill(null);
  badSpaces = badSpaces.map(() => getRandomInt(0, 29));

  let doubleSpaces = Array(9).fill(null);
  doubleSpaces = doubleSpaces.map(() => getRandomInt(0, 29));

  badSpaces.forEach((space) => {
    arr[space] = { type: "red" };
  });

  doubleSpaces.forEach((space) => {
    arr[space] = { type: "double" };
  });

  return arr;
};

export let GameSetup = {
  setup: () => ({
    cells: randomizeSpaces(Array(30).fill({ type: "normal" })),
    turn: 0,
    player_turn: null,
    player_order: [],
    player_scores: [],
    players_gone: [],
    turn_phase: "",
  }),

  moves: {
    moveCharacter: ({ G, player }, startSpace, roll, setScore) => {
      let newSpace = startSpace + roll;

      if (newSpace > 30) {
        newSpace = 30 - newSpace;
      }

      if (G.cells[newSpace].type === "red") {
        setScore(G.player_scores[player] - 5);
      } else if (G.cells[newSpace].type === "double") {
        setScore(G.player_scores[player] + 10);
      }
    },
  },
};
