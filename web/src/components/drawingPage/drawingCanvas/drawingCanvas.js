import { useEffect } from "react";
import "./canvas.css";

const DrawingCanvas = ({
  color,
  tool,
  canvasArray,
  layer,
  activeLayers,
  opacity,
  setHistory,
  history,
}) => {
  // const [currentCell, setCurrentCell] = useState(null);
  let strokes = [];
  const selectedLayer = canvasArray[layer];
  opacity = opacity / 10;
  useEffect(() => {
    clearCanvas();

    for (let i = 0; i < canvasArray.length; i++) {
      const canvasLayer = canvasArray[i];

      if (!activeLayers[i]) continue;
      else reDraw(canvasLayer);
      // for (let y = 0; y < canvasLayer.length; y++) {
      //   const inner = canvasLayer[y];
      //   for (let x = 0; x < inner.length; x++) {
      //     const cell = inner[x];
      //     reDraw(cell);
      //   }
      // }
    }
  }, [canvasArray, activeLayers]);

  useEffect(() => {
    strokes.length = 0;
  }, [history]);

  const saveImg = async () => {
    const canvas = document.getElementById("draw-canvas");
    const img = document.createElement("a");
    img.download = "img.png";
    img.href = canvas.toDataURL();
    img.click();
  };

  function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;

    return {
      x: x > 0 ? x : 0,
      y: y > 0 ? y : 0,
    };
  }

  const drawing = (e) => {
    e.target.addEventListener("mousemove", draw);
  };

  const stopDrawing = (e) => {
    e.target.removeEventListener("mousemove", draw);
    setHistory(strokes);
  };

  const reDraw = (canvasLayer) => {
    for (let y = 0; y < canvasLayer.length; y++) {
      const inner = canvasLayer[y];
      for (let x = 0; x < inner.length; x++) {
        const cell = inner[x];
        if (!cell.color) continue;
        const canvas = document.getElementById("draw-canvas");
        const ctx = canvas.getContext("2d");
        ctx.save();
        ctx.fillStyle = cell.color;
        ctx.globalAlpha = cell.opacity;
        ctx.fillRect(cell.x, cell.y, cell.w, cell.h);
        ctx.restore();
      }
    }
  };

  const draw = (e) => {
    const canvas = document.getElementById("draw-canvas");
    const ctx = canvas.getContext("2d");
    const coordinates = getMousePos(canvas, e);
    const coorY = Math.floor(coordinates.y / 16);
    const coorX = Math.floor(coordinates.x / 16);
    const selectedCell = selectedLayer[coorY][coorX];
    let pushed = false;

    if (selectedCell.opacity !== opacity) {
      strokes.push([coorY, coorX, selectedCell.color, selectedCell.opacity]);
      pushed = true;
    } else if (selectedCell.color !== color && !pushed) {
      strokes.push([coorY, coorX, selectedCell.color, selectedCell.opacity]);
    }
    selectedCell.opacity = opacity;
    selectedCell.color = color;

    const { x, y, h, w } = selectedCell;
    if (tool === "draw") {
      ctx.clearRect(x, y, h, w);
      for (let layers of canvasArray) {
        const pixel =
          layers[Math.floor(coordinates.y / 16)][
            Math.floor(coordinates.x / 16)
          ];

        if (pixel.color) {
          ctx.save();
          ctx.fillStyle = pixel.color;
          ctx.globalAlpha = pixel.opacity;
          ctx.fillRect(x, y, h, w);
          ctx.restore();
        }
      }
      localStorage.setItem("canvas", JSON.stringify(canvasArray));
      // draw(x, y, selectedCell);
    } else if (tool === "erase") {
      ctx.clearRect(x, y, h, w);
      selectedCell.color = null;
      localStorage.setItem("canvas", JSON.stringify(canvasArray));
    }
  };

  const clearCanvas = () => {
    const canvas = document.getElementById("draw-canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // const hoverCanvas = (e) => {
  //   const canvas = document.getElementById("draw-canvas");
  //   const ctx = canvas.getContext("2d");
  //   ctx.fillStyle = color;
  //   const coordinates = getMousePos(canvas, e);
  // };

  return (
    <>
      <button onClick={clearCanvas}>clear canvas</button>
      <canvas
        id="draw-canvas"
        width="512"
        height="512"
        onClick={draw}
        onMouseDown={drawing}
        onMouseUp={stopDrawing}
        // onMouseMove={draw}
        // tabIndex={-1}
      />
      <button onClick={saveImg}>save image</button>
    </>
  );
};

export default DrawingCanvas;
