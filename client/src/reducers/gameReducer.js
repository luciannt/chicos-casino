const initialState = {
  code: "",
  players: [],
  is_viable: false,
  started: false,
  hand: [],
};

export const gameReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GAME_CREATED":
      console.log("PAYLOAD", payload);
      return { ...state, code: payload };
    case "CURRENT_PLAYERS":
      console.log("PLAYER_DATA", payload);
      const hand_data = {};
      payload.forEach((player) => {
        if (player.id === payload.me) {
          hand_data = player.hands_data[0].cards;
        }
      });
      return { ...state, players: payload, hand: hand_data };
    case "CHECK_GAME_VIABILITY":
      return { ...state, is_viable: payload };
    case "GAME_STARTED":
      return { ...state, started: payload };
    case "STARTED":
      return { ...state, started: true };
    default:
      return state;
  }
};
