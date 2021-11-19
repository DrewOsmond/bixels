import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";
import selectedCanvas from "./reducers/selectedCanvas";
import canvasesReducer from "./reducers/canvases";

const store = createStore(
  combineReducers({
    canvases: canvasesReducer,
    selectedCanvas: selectedCanvas,
  }),
  undefined,
  applyMiddleware(thunk)
);

export default store;
