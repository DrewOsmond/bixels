import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";
import canvasReducer from "./reducers/canvas";

const store = createStore(
  combineReducers({
    canvas: canvasReducer,
  }),
  undefined,
  applyMiddleware(thunk)
);

export default store;
