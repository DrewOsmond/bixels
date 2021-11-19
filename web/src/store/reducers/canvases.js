import { Layer } from "../../components/drawingPage/canvasClass";

const getCanvases = () => {
  let canvases = localStorage.getItem("canvases");
  if (!canvases) return null;
  else {
    canvases = JSON.parse(canvases);
  }

  return canvases;
};

const getState = () => {
  const canvases = getCanvases();
  if (!canvases) {
    const defaultCanvases = [
      {
        name: "untitled project",
        canvas: [new Layer(0)],
        drawingLayer: 0,
        color: "#4b4e51",
      },
    ];
    localStorage.setItem("canvases", JSON.stringify(defaultCanvases));
    return defaultCanvases;
  } else {
    return canvases;
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

export const updateCanvasName = (canvas, newName) => (dispatch) => {
  const nameToChange = canvas.name;
  const canvases = getCanvases();
  const unamed = [];
  for (let i = 0; i < canvases.length; i++) {
    const canvas = canvases[i];
    if (canvas.name === nameToChange) {
      canvas.name =
        newName.length > 0 ? newName : `untitled project ${unamed.length + 1}`;
      localStorage.setItem("canvases", JSON.stringify(canvases));
      return dispatch(updateCanv(canvases));
    } else if (canvas.name.includes("untitled project")) {
      unamed.push(unamed.length + 1);
    }
  }
};

export const updateCanvases = (canvases) => (dispatch) => {
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
