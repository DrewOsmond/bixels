const refreshCanvas = localStorage.getItem("canvas");
const initialState = refreshCanvas ? JSON.parse(refreshCanvas) : [];

const PAINT = "canvas/paint";
const SAVE = "canvas/save";

const addPaint = (payload) => ({
  type: PAINT,
  payload,
});

export const paint = (x, y, cell) => (dispatch) =>
  dispatch(addPaint(x, y, cell));

const canvasReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAINT:
      const { x, y, cell } = action.payload;
      state[x][y] = cell;
      localStorage.setItem("canvas", JSON.stringify(state));
      return state;
    default:
      return state;
  }
};

export default canvasReducer;
