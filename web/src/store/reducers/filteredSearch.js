import { getState } from "./canvases";

const UPDATE_SEARCH = "update/search";

const initialState = getState();

const updateSearch = (filtered) => {
  return {
    type: UPDATE_SEARCH,
    payload: filtered,
  };
};

export const updateFilter = (term, canvas) => (dispatch) => {
  const filtered = canvas.filter((canv) => canv.name.includes(term));
  dispatch(updateSearch(filtered));
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH:
      return action.payload;
    default:
      return state;
  }
};

export default searchReducer;
