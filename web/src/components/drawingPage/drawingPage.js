import { useState } from "react";
import DrawingCanvas from "./drawingCanvas/drawingCanvas";
import ColorPicker from "./colorPicker/colorPicker";
import ToolSelector from "./toolSelector/toolSelector";

class Cell {
  constructor(x, y, w, h, color = null, opacity = 1) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.opacity = opacity;
  }

  drawCell(ctx) {
    console.log(ctx);
    if (!this.color) return;
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.restore();
  }
}

const DrawingPage = () => {
  const [color, setColor] = useState("black");
  const [tool, setTool] = useState("draw");
  const rows = 32;
  const columns = 32;

  const canvas = [];
  let refreshCanvas = localStorage.getItem("canvas");

  if (refreshCanvas) {
    refreshCanvas = JSON.parse(refreshCanvas);
    console.log(refreshCanvas);
    for (let y = 0; y < refreshCanvas.length; y++) {
      const inner = refreshCanvas[y];
      const columnCells = [];
      for (let x = 0; x < inner.length; x++) {
        const cell = inner[x];
        columnCells.push(
          new Cell(16 * x, 16 * y, 16, 16, cell.color, cell.opacity)
        );
      }
      canvas.push(columnCells);
    }
  } else {
    for (let y = 0; y < rows; y++) {
      const columnCells = [];
      for (let x = 0; x < columns; x++) {
        columnCells.push(new Cell(16 * x, 16 * y, 16, 16));
      }
      canvas.push(columnCells);
    }
  }

  return (
    <>
      <ColorPicker setColor={setColor} />
      <ToolSelector setTool={setTool} />
      <DrawingCanvas color={color} tool={tool} canvasArray={canvas} />;
    </>
  );
};

export default DrawingPage;
