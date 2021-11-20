// const refreshCanvas = localStorage.getItem("canvas");
// const initialState = refreshCanvas ? JSON.parse(refreshCanvas) : [];
import { Layer } from "../../components/drawingPage/canvasClass";
const SELECT = "canvas/select";
const UPDATE = "update/select";
// const add = (note: Note) => {
//   return {
//     type: ADD_NOTE,
//     payload: note,
//   };
// };

// export const addNote = (note: NewNote) => async (dispatch: Dispatch) => {
//   const response = await csrfProtectedFetch("/api/notes/add", {
//     method: "POST",
//     body: JSON.stringify({ note }),
//   });
//   if (response?.ok) {
//     const data = await response.json();
//     data.comments = [];
//     dispatch(add(data));
//     dispatch(selectNote(data));
//   }
// };
const restoreDrawing = () => {
  const selected = localStorage.getItem("selected-canvas");
  const canvases = localStorage.getItem("canvases");
  if (selected) {
    const selectedCanv = JSON.parse(selected);
    return selectedCanv;
  } else if (!canvases) {
    const defaultCanvases = [
      {
        name: "untitled project",
        canvas: [new Layer(0)],
        drawingLayer: 0,
        color: "#4b4e51",
      },
    ];
    localStorage.setItem("canvases", JSON.stringify(defaultCanvases));
    localStorage.setItem("selected-canvas", JSON.stringify(defaultCanvases[0]));
    return defaultCanvases;
  } else {
    const stringCanvToObj = JSON.parse(canvases);
    localStorage.setItem("selected-canvas", JSON.stringify(stringCanvToObj[0]));
    return stringCanvToObj[0];
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
  return {
    type: UPDATE,
    payload: canvas,
  };
};

export const updateCanvas = (canvas) => (dispatch) => {
  const canvases = JSON.parse(localStorage.getItem("canvases"));
  localStorage.setItem("selected-canvas", JSON.stringify(canvas));
  localStorage.setItem("canvases", JSON.stringify(canvases));
  console.log("???");
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
