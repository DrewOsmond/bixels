import { Layer } from "../../components/drawingPage/canvasClass";

const getState = () => {
  const canvases = localStorage.getItem("canvases");

  if (!canvases) {
    const defaultCanvases = [
      {
        name: "untitled project",
        canvas: [new Layer(1)],
      },
    ];
    localStorage.setItem("canvases", JSON.stringify(defaultCanvases));
    return defaultCanvases;
  } else {
    const objCanvases = JSON.parse(canvases);
    console.log(objCanvases);
    return objCanvases;
  }
};

const initialState = getState();

const UPDATE = "canvas/update";

const updateCanv = (canvases) => {
  return {
    type: UPDATE,
    payload: canvases,
  };
};

export const updateCanvases = (canvases) => (dispatch) => {
  console.log("REDUX", canvases);
  return dispatch(updateCanv(canvases));
};

const canvasesReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      return [...action.payload];
    default:
      return state;
  }
};

export default canvasesReducer;
