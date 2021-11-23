import { Layer } from "../../components/drawingPage/canvasClass";
import selectedCanvas from "./selectedCanvas";

const getCanvases = () => {
  let canvases = localStorage.getItem("canvases");
  if (!canvases) return null;
  else {
    canvases = JSON.parse(canvases);
  }

  return canvases;
};

export const getState = () => {
  const canvases = getCanvases();

  const defaultCanvases = [
    {
      name: "untitled artwork",
      canvas: [new Layer(0)],
      drawingLayer: 0,
      color: "#4b4e51",
      opacity: 1,
      tool: "draw",
      layersActive: false,
    },
  ];

  if (!canvases) {
    localStorage.setItem("canvases", JSON.stringify(defaultCanvases));
    return defaultCanvases;
  } else {
    let selectedCanvas = localStorage.getItem("selected-canvas");

    if (selectedCanvas) {
      selectedCanvas = JSON.parse(selectedCanvas);

      for (let i = 0; i < canvases.length; i++) {
        const canvas = canvases[i];

        if (canvas.name === selectedCanvas.name) {
          canvases[i] = canvas;
        }
      }
    }
    return canvases;
  }
};

const initialState = getState();

const UPDATE = "canvases/update";

const updateCanv = (canvases) => {
  localStorage.setItem("canvases", JSON.stringify(canvases));
  return {
    type: UPDATE,
    payload: canvases,
  };
};

export const getUniqueName = (canvases) => {
  let prefix = "untitled artwork";
  let i = 1;

  const names = [];
  for (let canvas of canvases) {
    names.push(canvas.name);
  }

  while (names.includes(`${prefix} ${i}`)) {
    i++;
  }
  return prefix + " " + i;
};

export const updateCanvasName = (canvas, newName) => (dispatch) => {
  const nameToChange = canvas.name;
  const canvases = getCanvases();
  const unamed = [];
  for (let i = 0; i < canvases.length; i++) {
    const canvas = canvases[i];
    if (canvas.name === nameToChange) {
      canvas.name = newName.length > 0 ? newName : "untitled artwork";
      localStorage.setItem("canvases", JSON.stringify(canvases));
      return dispatch(updateCanv(canvases));
    } else if (canvas.name.includes("untitled artwork")) {
      unamed.push(unamed.length + 1);
    }
  }
};

export const deleteCanvases = (indexes, canvases) => (dispatch) => {
  let selectedCanv = localStorage.getItem("selected-canvas");
  selectedCanv = selectedCanv ? JSON.parse(selectedCanv) : null;
  console.log(canvases);
  for (let idx of indexes) {
    if (
      canvases[idx].name &&
      selectedCanv &&
      selectedCanv.name === canvases[idx].name
    ) {
      localStorage.removeItem("selected-canvas");
    }
    canvases.splice(idx, 1);
  }
  // for (let name of names) {
  //   for (let i = 0; i < canvases.length; i++) {
  //     const canvasName = canvases[i].name;
  //     if (name === canvasName) {
  //       canvases.splice(i, 1);
  //       if (canvasName === selectedCanv.name) {
  //         localStorage.removeItem("selected-canvas");
  //       }
  //     }
  //   }
  // }
  dispatch(updateCanv(canvases));
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
