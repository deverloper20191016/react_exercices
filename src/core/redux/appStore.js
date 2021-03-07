import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import appReduces from "./reducers/appReducer";

const enhancers = [
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
];

const appStore = createStore(appReduces, compose(...enhancers));
export default appStore;
