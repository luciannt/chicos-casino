const initialState = {
  code: "",
  players: [],
  is_viable: false,
};

export const gameReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GAME_CREATED":
      console.log("PAYLOAD", payload);
      return { ...state, code: payload };
    case "CURRENT_PLAYERS":
      console.log("PLAYERS CHECK", payload);
      return { ...state, players: payload };
    case "CHECK_GAME_VIABILITY":
      return { ...state, is_viable: payload };
    default:
      return state;
  }
};
