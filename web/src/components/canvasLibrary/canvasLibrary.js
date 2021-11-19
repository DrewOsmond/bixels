import DisplayCanvas from "./displayCanveses/displayCanvases";
import "./canvasLibrary.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCanvases } from "../../store/reducers/canvases";
import { Layer } from "../drawingPage/canvasClass";

const CanvasLibrary = () => {
  const canvases = useSelector((state) => state.canvases);
  const dispatch = useDispatch();

  useEffect(() => {
    const localSelected = localStorage.getItem("selected-canvas");
    const selected = localSelected ? JSON.parse(localSelected) : null;
    const localCanvases = localStorage.getItem("canvases");
    const canvases = localCanvases ? JSON.parse(localCanvases) : null;
    if (!selected || !canvases) {
      return;
    } else {
      const name = selected.name;

      for (let canvas of canvases) {
        if (canvas.name === name) {
          console.log("waluigi");
          canvas.canvas = selected.canvas;
          localStorage.setItem("canvases", JSON.stringify(canvases));
          console.log(canvases);
          dispatch(updateCanvases(canvases));
        }
      }
    }
  }, []);

  // const storedCanvases = localStorage.getItem("canvases");
  // if (storedCanvases) {
  //   setCanvases(JSON.parse(storedCanvases));
  // }

  const addNewCanvas = () => {
    const basicLayer = new Layer(0);
    const canvas = {
      name: `untitled project ${canvases.length}`,
      canvas: [basicLayer],
    };
    canvases.push(canvas);
    dispatch(updateCanvases(canvases));
    localStorage.setItem("canvases", JSON.stringify(canvases));
  };

  return (
    <>
      <button className="add-new-canvas" onClick={addNewCanvas}>
        add new canvas
      </button>
      {canvases?.map((canvas, i) => (
        <DisplayCanvas key={`canvas-${i}`} canvas={canvas} />
      ))}
    </>
  );
};

export default CanvasLibrary;
