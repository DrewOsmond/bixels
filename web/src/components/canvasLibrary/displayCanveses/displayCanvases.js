import { useEffect, useState } from "react";
import { selectCanvas } from "../../../store/reducers/selectedCanvas";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const DisplayCanvas = ({ canvas }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(canvas.name);
  const [editName, setEditName] = useState(false);

  console.log(name);
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
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      ) : (
        <div onDoubleClick={() => setEditName(true)}>{canvas.name}</div>
      )}
    </>
  );
};

export default DisplayCanvas;
