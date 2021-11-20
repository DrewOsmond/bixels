import { useEffect, useState } from "react";
import { selectCanvas } from "../../../store/reducers/selectedCanvas";
import { updateCanvasName } from "../../../store/reducers/canvases";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Canvas } from "../../drawingPage/canvasClass";
import { useSelector } from "react-redux";
import "./displayCanvases.css";
import { getUniqueName } from "../../../store/reducers/canvases";
const DisplayCanvas = ({
  canvas,
  idx,
  trash,
  setSelectedTrash,
  selectedTrash,
}) => {
  const canvases = useSelector((state) => state.canvases);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(canvas.name);
  const [editName, setEditName] = useState(false);
  const [unique, setUnique] = useState(true);
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
    for (let canvas of canvases) {
      if (canvas.name === name) {
        setUnique(false);
        return;
      }
    }

    if (e.keyCode === 13) {
      window.removeEventListener("keydown", saveName);
      window.removeEventListener("click", saveName);

      if (name.length === 0) {
        const name = getUniqueName(canvases);
        setName(name);
      }
      dispatch(updateCanvasName(canvas, name));
      setEditName(false);
    } else if (e.type === "click" && e.target.value !== name) {
      window.removeEventListener("keydown", saveName);
      window.removeEventListener("click", saveName);
      if (name.length === 0) {
        const name = getUniqueName(canvases);
        setName(name);
        dispatch(updateCanvasName(canvas, `untitled project ${idx + 1}`));
        setEditName(false);
      } else {
        dispatch(updateCanvasName(canvas, name));
        setEditName(false);
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

  const handleNameChange = (e) => {
    let unique = true;
    for (let canvas of canvases) {
      if (canvas.name === e.target.value) {
        unique = false;
      }
      setUnique(unique);
      setName(e.target.value);
    }
  };

  return (
    <>
      <canvas
        className={`library-canvas ${
          selectedTrash.includes(canvas.name) && trash ? "delete-select" : ""
        }`}
        id={canvas.name}
        width="128"
        height="128"
        onClick={!trash ? handleClick : handleTrash}
      ></canvas>
      {editName ? (
        <div>
          {!unique && <div>name must be unique</div>}
          <input
            className={setUnique ? "" : "not-unique"}
            id="name-change"
            value={name}
            onChange={handleNameChange}
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
