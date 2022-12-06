import { combineReducers } from "redux";
import connectionsReducer from "./connectionReducer";
import { gameReducer } from "./gameReducer";
import { sessionReducer } from "./sessionReducer";

export default combineReducers({
  sessions: sessionReducer,
  connections: connectionsReducer,
  game: gameReducer,
});
