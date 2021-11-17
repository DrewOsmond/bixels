import { useState, useEffect } from "react";
import "./canvas.css";

const DrawingCanvas = ({ color, tool, canvasArray }) => {
  const [currentCell, setCurrentCell] = useState(null);

  useEffect(() => {
    console.log(canvasArray);
    for (let y = 0; y < canvasArray.length; y++) {
      const inner = canvasArray[y];
      for (let x = 0; x < inner.length; x++) {
        const cell = canvasArray[y][x];
        reDraw(cell);
      }
    }
  }, [canvasArray]);

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
  };

  const reDraw = (cell) => {
    if (!cell.color) return;
    const canvas = document.getElementById("draw-canvas");
    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.fillStyle = cell.color;
    ctx.globalAlpha = cell.opacity;
    ctx.fillRect(cell.x, cell.y, cell.w, cell.h);
    ctx.restore();
  };

  const draw = (e) => {
    const canvas = document.getElementById("draw-canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    const coordinates = getMousePos(canvas, e);
    const selectedCell =
      canvasArray[Math.floor(coordinates.y / 16)][
        Math.floor(coordinates.x / 16)
      ];

    const { x, y, h, w } = selectedCell;

    if (tool === "draw") {
      ctx.fillRect(x, y, h, w);
      selectedCell.color = color;
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

  const hoverCanvas = (e) => {
    const canvas = document.getElementById("draw-canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    const coordinates = getMousePos(canvas, e);
  };

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
        tabIndex={-1}
      />
      <button onClick={saveImg}>save image</button>
    </>
  );
};

// const DrawingCanvas = ({ canvas, height, width }) => {
// const saveImg = async () => {
//   const canvas = await html2canvas(document.getElementById("canvas"));
//   const img = document.createElement("a");
//   img.download = "img.png";
//   img.href = canvas.toDataURL();
//   img.click();
// };

// const changeColor = (e) => {
//   const [row, column] = e.target.id.split("-");
//   console.log(row, column);
// };

// const renderCanvas = () =>
//   canvas.map((outer, row) =>
//     outer.map((color, column) => (
//       <div
//         onMouseDown={changeColor}
//         className="pixel"
//         id={`${row}-${column}`}
//         key={`${row}${column}`}
//         style={{ backgroundColor: color }}
//       />
//     ))
//   );

// return (
// <>
//   <div id="canvas" style={{ width: `${width}px`, height: `${height}px` }}>
//     {renderCanvas().map((row, i) => (
//       <div className="row">{row}</div>
//     ))}
//   </div>
//   <br />
//   <button onClick={saveImg}>save image</button>
// </>
// );
// };

export default DrawingCanvas;
