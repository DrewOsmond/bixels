import DisplayCanvas from "./displayCanveses/displayCanvases";
import "./canvasLibrary.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCanvases } from "../../store/reducers/canvases";
import { Layer } from "../drawingPage/canvasClass";
import { useNavigate } from "react-router";
import { selectCanvas } from "../../store/reducers/selectedCanvas";

const CanvasLibrary = () => {
  const canvases = useSelector((state) => state.canvases);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          canvas.canvas = selected.canvas;
          localStorage.setItem("canvases", JSON.stringify(canvases));
          dispatch(updateCanvases(canvases));
        }
      }
    }
  }, [dispatch]);

  const addNewCanvas = () => {
    const basicLayer = new Layer(0);
    const canvas = {
      name: `untitled project ${canvases.length}`,
      canvas: [basicLayer],
      drawingLayer: 0,
      color: "#4b4e51",
    };
    canvases.unshift(canvas);
    dispatch(updateCanvases(canvases));
    localStorage.setItem("canvases", JSON.stringify(canvases));
    localStorage.setItem("selected-canvas", JSON.stringify(canvas));
    dispatch(selectCanvas(canvas));
    navigate("/draw");
  };

  return (
    <>
      <button className="add-new-canvas" onClick={addNewCanvas}>
        add new canvas
      </button>
      {canvases?.map((canvas, i) => (
        <DisplayCanvas key={`canvas-${i}`} canvas={canvas} idx={i} />
      ))}
    </>
  );
};

export default CanvasLibrary;
