import { useEffect, useState } from "react";
import { selectCanvas } from "../../../store/reducers/selectedCanvas";
import { updateCanvasName } from "../../../store/reducers/canvases";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Canvas } from "../../drawingPage/canvasClass";
import { useSelector } from "react-redux";
// import { getUniqueName } from "../../../store/reducers/canvases";

const DisplayCanvas = ({
  canvas,
  idx,
  trash,
  setSelectedTrash,
  selectedTrash,
  id,
}) => {
  const canvases = useSelector((state) => state.canvases);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(canvas.name);
  const [editName, setEditName] = useState(false);
  // const [unique, setUnique] = useState(true);

  useEffect(() => {
    const canv = document.getElementById(canvas.id);
    const ctx = canv.getContext("2d");
    Canvas.clearCanvas(canvas, ctx);
    Canvas.paintCanvas(canvas, ctx, 4);
  }, [canvas, canvases]);

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
    // for (let i = 0; i < canvases.length; i++) {
    //   const checkedCanvas = canvases[i];
    //   if (i === idx) continue;
    //   if (checkedCanvas.name === name) {
    //     setUnique(false);
    //     return;
    //   }
    // }
    const newName = document.getElementById("name-change").value;

    if (e.keyCode === 13) {
      window.removeEventListener("keydown", saveName);
      window.removeEventListener("click", saveName);

      if (name.length === 0) {
        const basicName = "untitled artwork";
        setName(basicName);
        dispatch(updateCanvasName(canvas, basicName));
        setEditName(false);
        return;
      }
      dispatch(updateCanvasName(canvas, newName));
      setEditName(false);
    } else if (e.type === "click" && e.target.value !== name) {
      window.removeEventListener("keydown", saveName);
      window.removeEventListener("click", saveName);
      if (name.length === 0) {
        const name = "untitled artwork";
        setName(name);
        dispatch(updateCanvasName(canvas, "untitled artwork"));
        setEditName(false);
      } else {
        dispatch(updateCanvasName(canvas, newName));
        setEditName(false);
      }
    }
  };

  const handleTrash = () => {
    const i = selectedTrash.indexOf(id);
    if (i >= 0) {
      selectedTrash.splice(i, 1);
      setSelectedTrash([...selectedTrash]);
    } else {
      setSelectedTrash((prev) => [...prev, id]);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="display__single__canvas">
      {/* <div
        className={`${
          selectedTrash.includes(canvas.name) && trash ? "delete-select" : ""
        }`} */}
      {/* > */}
      <canvas
        className={`library-canvas ${
          selectedTrash.includes(id) && trash ? "delete-select" : ""
        }`}
        id={canvas.id}
        width="128"
        height="128"
        onClick={!trash ? handleClick : handleTrash}
      ></canvas>
      {/* </div> */}
      {editName ? (
        <div>
          <input
            id="name-change"
            value={name}
            onChange={handleNameChange}
            // onKeyDown={saveName}
          />
        </div>
      ) : (
        <div
          className="canvas-text"
          onDoubleClick={handleDoubleClick}
          // style={{ height: "30px" }}
        >
          {name}
        </div>
      )}
    </div>
  );
};

export default DisplayCanvas;
