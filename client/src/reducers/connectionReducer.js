const initialState = {
  subscriptions: {},
};

const connectionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_GAME_SUBSCRIPTIONS":
      return {
        ...state.subscriptions,
        game: payload,
      };
    default:
      return state;
  }
};

export default connectionsReducer;
