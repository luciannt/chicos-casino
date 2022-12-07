const initialState = {};

export const sessionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return { ...payload };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};
