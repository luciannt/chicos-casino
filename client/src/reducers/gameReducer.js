const initialState = {
  code: "",
  players: [],
  is_viable: false,
  started: false,
  hand: [],
  is_turn: undefined,
  rival_hand_count: 0,
  loading: false,
  hand_score: 0,
  rival_score: 0,
  rival_turn: undefined,
  end: false,
};

export const gameReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GAME_CREATED":
      return { ...state, code: payload };
    case "PLAYER_HIT":
      return {
        ...state,
        loading: false,
        hand_score: payload.hand_score,
        end: payload.end,
      };
    case "CURRENT_PLAYERS":
      let hand_data = [];
      let rival_data = 0;
      let rival_score = 0;
      let rival_turn = false;
      let turn_data = false;
      let hand_score = 0;
      let end = false;

      Object.values(payload.players).forEach((player) => {
        if (player.id === payload.me) {
          turn_data = player.is_turn;
          end = player.end;
          hand_score = player.hand_score;

          if (player?.hands_data?.length === 0) {
            hand_data = state.hand;
          } else {
            hand_data = player?.hands_data?.[0]?.cards;
          }
        } else {
          rival_score = player.hand_score;
          rival_data = player?.hands_data?.[0]?.cards.length;
          rival_turn = player.is_turn;
        }
      });

      if (hand_data?.length === 0 || hand_data?.length < state.hand?.length) {
        hand_data = state.hand;
      }

      if (rival_data === 0 || rival_data < state.rival_hand_count) {
        rival_data = state.rival_hand_count;
      }

      if (!rival_turn && !turn_data) {
        turn_data = state.is_turn;
      }

      console.log("STATE", state);

      return {
        ...state,
        players: Object.values(payload.players),
        hand: hand_data,
        rival_hand_count: rival_data,
        is_turn: turn_data,
        end,
        hand_score,
        rival_score,
      };
    case "CHECK_GAME_VIABILITY":
      return { ...state, is_viable: payload };
    case "GAME_STARTED":
      return { ...state, started: payload };
    case "STARTED":
      return { ...state, started: true };
    case "RESET_GAME":
      return { ...initialState };
    default:
      return state;
  }
};
