import {
  // configureStore,
  // ThunkAction,
  // Action,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";
import selectedCanvas from "./reducers/selectedCanvas";
import canvasesReducer from "./reducers/canvases";
import searchReducer from "./reducers/filteredSearch";

const store = createStore(
  combineReducers({
    canvases: canvasesReducer,
    selectedCanvas: selectedCanvas,
    search: searchReducer,
  }),
  undefined,
  applyMiddleware(thunk)
);

export default store;
