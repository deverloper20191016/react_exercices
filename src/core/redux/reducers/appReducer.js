import { combineReducers } from "redux";
import repositoryReducer from "./repositoryReducer";
import errorHandlerReducer from "./errorHandlerReducer";
import authenticationReducer from "./authenticationReducer";

const appReducers = combineReducers({
  repository: repositoryReducer,
  errorHandler: errorHandlerReducer,
  authentication: authenticationReducer,
});
export default appReducers;
