// const refreshCanvas = localStorage.getItem("canvas");
// const initialState = refreshCanvas ? JSON.parse(refreshCanvas) : [];
import { Layer } from "../../components/drawingPage/canvasClass";
import { v4 as uuidv4 } from "uuid";
const SELECT = "canvas/select";
const UPDATE = "update/select";

const restoreDrawing = () => {
  const selected = localStorage.getItem("selected-canvas");
  const canvases = localStorage.getItem("canvases");
  if (selected) {
    const selectedCanv = JSON.parse(selected);
    return selectedCanv;
  } else if (!canvases || !selected) {
    const defaultCanvases = [
      {
        name: "untitled artwork",
        canvas: [new Layer(0)],
        drawingLayer: 0,
        color: "#4b4e51",
        opacity: 1,
        tool: "draw",
        layersActive: false,
        id: uuidv4(),
      },
    ];
    localStorage.setItem("canvases", JSON.stringify(defaultCanvases));
    localStorage.setItem("selected-canvas", JSON.stringify(defaultCanvases[0]));
    return defaultCanvases[0];
  }

  // } else if (!canvases) {
  //   const defaultCanvases = [
  //     {
  //       name: "untitled project",
  //       canvas: [new Layer(1)],
  //     },
  //   ];
  //   localStorage.setItem("canvases", JSON.stringify(defaultCanvases));
  //   localStorage.setItem("selected-canvas", JSON.stringify(defaultCanvases[0]));
  //   return defaultCanvases[0];
  // }
};

const initialState = restoreDrawing();

const select = (canvas) => {
  return {
    type: SELECT,
    payload: canvas,
  };
};

export const selectCanvas = (canvas) => (dispatch) => {
  localStorage.setItem("selected-canvas", JSON.stringify(canvas));
  dispatch(select(canvas));
};

const update = (canvas) => {
  localStorage.setItem("selected-canvas", JSON.stringify(canvas));
  return {
    type: UPDATE,
    payload: canvas,
  };
};

export const updateCanvas = (canvas) => (dispatch) => {
  const canvases = JSON.parse(localStorage.getItem("canvases"));
  localStorage.setItem("selected-canvas", JSON.stringify(canvas));
  localStorage.setItem("canvases", JSON.stringify(canvases));
  dispatch(update(canvas));
};

const selectedCanvas = (state = initialState, action) => {
  switch (action.type) {
    case SELECT:
      return action.payload;
    case UPDATE:
      return { ...action.payload };
    default:
      return state;
  }
};

export default selectedCanvas;
