import { History } from "../../components/drawingPage/canvasClass";

const UPDATE = "history/update";
// const SWITCH_HISTORY = "history/switch";

const initialState = new History();

const updateHistory = (payload) => {
  return {
    type: UPDATE,
    payload,
  };
};

export const addToHistory = (oldHistory, changes) => (dispatch) => {
  const newHistory = new History(changes);
  if (!oldHistory.strokes) {
    dispatch(updateHistory(newHistory));
    return;
  }

  oldHistory.next = newHistory;
  newHistory.prev = oldHistory;
  dispatch(updateHistory(newHistory));
};

export const switchHistory = (oldHistory, direction) => (dispatch) => {
  dispatch(updateHistory(oldHistory[direction]));
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      return action.payload;
    default:
      return state;
  }
};

export default historyReducer;
