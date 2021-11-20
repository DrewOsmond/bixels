import { useEffect, useState } from "react";
import { selectCanvas } from "../../../store/reducers/selectedCanvas";
import { updateCanvasName } from "../../../store/reducers/canvases";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Canvas } from "../../drawingPage/canvasClass";
import "./displayCanvases.css";

const DisplayCanvas = ({
  canvas,
  idx,
  trash,
  setSelectedTrash,
  selectedTrash,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(canvas.name);
  const [editName, setEditName] = useState(false);

  useEffect(() => {
    const canv = document.getElementById(canvas.name);
    const ctx = canv.getContext("2d");
    Canvas.clearCanvas(canvas, ctx);
    Canvas.paintCanvas(canvas, ctx, 4);
  }, [canvas]);

  useEffect(() => {
    if (editName) {
      document.getElementById("name-change").focus();
    }
  }, [editName]);

  const handleClick = () => {
    dispatch(selectCanvas(canvas));
    navigate("/draw");
  };

  const handleDoubleClick = () => {
    window.addEventListener("keydown", saveName);
    window.addEventListener("click", saveName);
    setEditName(true);
  };

  const saveName = (e) => {
    if (e.keyCode === 13) {
      window.removeEventListener("keydown", saveName);
      window.removeEventListener("click", saveName);
      dispatch(updateCanvasName(canvas, name));
      setEditName(false);
      if (name.length === 0) {
        setName(`untitled project ${idx + 1}`);
      }
    } else if (e.type === "click" && e.target.value !== name) {
      dispatch(updateCanvasName(canvas, name));
      setEditName(false);
      window.removeEventListener("keydown", saveName);
      window.removeEventListener("click", saveName);
      if (name.length === 0) {
        setName(`untitled project ${idx + 1}`);
      }
    }
  };

  const handleTrash = () => {
    const idx = selectedTrash.indexOf(canvas.name);
    if (idx >= 0) {
      selectedTrash.splice(idx, 1);
      setSelectedTrash([...selectedTrash]);
    } else {
      setSelectedTrash((prev) => [...prev, canvas.name]);
    }
  };

  return (
    <>
      <canvas
        className={`library-canvas ${
          selectedTrash.includes(canvas.name) ? "delete-select" : ""
        }`}
        id={canvas.name}
        width="128"
        height="128"
        onClick={!trash ? handleClick : handleTrash}
      ></canvas>
      {editName ? (
        <div>
          <input
            id="name-change"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={saveName}
          />
        </div>
      ) : (
        <div onDoubleClick={handleDoubleClick} style={{ height: "30px" }}>
          {name}
        </div>
      )}
    </>
  );
};

export default DisplayCanvas;
