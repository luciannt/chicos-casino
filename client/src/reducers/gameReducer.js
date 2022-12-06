const initialState = {
  code: "",
};

export const gameReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GAME_CREATED":
      console.log("PAYLOAD", payload);
      return { ...state, code: payload };
    default:
      return state;
  }
};
