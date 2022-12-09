const initialState = {
  code: "",
  players: [],
  is_viable: false,
  started: false,
  hand: [],
  rival_hand_count: 0,
};

export const gameReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GAME_CREATED":
      console.log("PAYLOAD", payload);
      return { ...state, code: payload };
    case "CURRENT_PLAYERS":
      let hand_data = [];
      let rival_data = 0;

      Object.values(payload.players).forEach((player) => {
        if (player.id === payload.me) {
          if (player.hands_data.length === 0) {
            hand_data = state.hand;
          } else {
            hand_data = player.hands_data[0].cards;
          }
        } else {
          rival_data = player.hands_data.length;
        }
      });

      if (hand_data.length === 0) {
        hand_data = state.hand;
      }

      return {
        ...state,
        players: Object.values(payload.players),
        hand: hand_data,
        rival_hand_count: rival_data,
      };
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
