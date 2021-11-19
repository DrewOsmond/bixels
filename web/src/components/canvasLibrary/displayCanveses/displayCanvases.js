import { useEffect, useState } from "react";
import { selectCanvas } from "../../../store/reducers/selectedCanvas";
import { updateCanvasName } from "../../../store/reducers/canvases";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const DisplayCanvas = ({ canvas, idx }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(canvas.name);
  const [editName, setEditName] = useState(false);
  // const [tempName, setTempName] = useState(canvas.name);

  useEffect(() => {
    paintCanvas();
  }, []);

  const paintCanvas = () => {
    for (let layer of canvas.canvas) {
      if (layer.active) {
        paintLayer(layer.layer);
      }
    }
  };

  useEffect(() => {
    if (editName) {
      document.getElementById("name-change").focus();
    }
  }, [editName]);

  const handleClick = () => {
    dispatch(selectCanvas(canvas));
    navigate("/draw");
  };

  const paintLayer = (canvasLayer) => {
    for (let y = 0; y < canvasLayer.length; y++) {
      const inner = canvasLayer[y];
      for (let x = 0; x < inner.length; x++) {
        const cell = inner[x];
        if (!cell.color) continue;
        const canv = document.getElementById(canvas.name);
        const ctx = canv.getContext("2d");
        ctx.save();
        ctx.fillStyle = cell.color;
        ctx.globalAlpha = cell.opacity;
        ctx.fillRect(cell.x / 4, cell.y / 4, cell.w / 4, cell.h / 4);
        ctx.restore();
      }
    }
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
      console.log("maybe??");
      window.removeEventListener("keydown", saveName);
      window.removeEventListener("click", saveName);
      if (name.length === 0) {
        setName(`untitled project ${idx + 1}`);
      }
    }
  };

  return (
    <>
      <canvas
        className="library-canvas"
        id={canvas.name}
        width="128"
        height="128"
        onClick={handleClick}
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
