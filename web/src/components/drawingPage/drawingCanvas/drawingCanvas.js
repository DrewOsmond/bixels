import { useEffect } from "react";
import "./canvas.css";
import { Canvas, Cell } from "../canvasClass";

const DrawingCanvas = ({
  color,
  tool,
  canvasArray,
  layer,
  opacity,
  setHistory,
  setShowColorPicker,
  showColorPicker,
  strokes,
  setStrokes,
  showLayers,
  history,
}) => {
  // const [currentCell, setCurrentCell] = useState(null);
  // let strokes = [];
  const selectedLayer = canvasArray.canvas[layer]?.layer;
  opacity = opacity / 10;

  const render = () => {
    clearCanvas();

    for (let canvasLayer of canvasArray.canvas) {
      if (canvasLayer.active) {
        reDraw(canvasLayer.layer);
      }
    }
  };

  // const renderCell = (x, y) => {
  //   const canvas = document.getElementById("draw-canvas");
  //   const ctx = canvas.getContext("2d");
  //   ctx.clearRect(x * 16, y * 16, 16, 16);
  //   for (let canvasLayer of canvasArray.canvas) {
  //     if (canvasLayer.active) {
  //       let cell = canvasLayer.layer[y][x];
  //       ctx.save();
  //       ctx.fillStyle = cell.color;
  //       ctx.globalAlpha = cell.opacity;
  //       ctx.fillRect(cell.x, cell.y, cell.w, cell.h);
  //       ctx.restore();
  //     }
  //   }
  // };

  useEffect(render, [canvasArray]);

  function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;

    return {
      x: x > 0 ? x : 0,
      y: y > 0 ? y : 0,
    };
  }

  // const drawing = (e) => {
  //   // setShowColorPicker(false);
  //   console.log(layer);
  //   if (!canvasArray.canvas[layer].active) return;
  //   window.currentCell = null;
  //   e.target.addEventListener("mousemove", draw);
  // };

  // const stopDrawing = (e) => {
  //   if (window.currentCell) {
  //     const storedCellY = Math.floor(window.currentCell.y / 16);
  //     const storedCellX = Math.floor(window.currentCell.x / 16);
  //     selectedLayer[storedCellY][storedCellX] = window.currentCell;
  //   }
  //   window.currentCell = null;
  //   e.target.removeEventListener("mousemove", draw);
  //   setHistory(strokes);
  //   Canvas.saveDrawing(canvasArray);
  // };

  // const hoverPreview = (e) => {
  //   const canvas = document.getElementById("draw-canvas");
  //   const coordinates = getMousePos(canvas, e);
  //   const mouseCellY = Math.floor(coordinates.y / 16);
  //   const mouseCellX = Math.floor(coordinates.x / 16);
  //   const mouseCell = selectedLayer[mouseCellY][mouseCellX];
  //   if (!window.currentCell) {
  //     window.currentCell = new Cell(
  //       mouseCell.x,
  //       mouseCell.y,
  //       16,
  //       16,
  //       mouseCell.color,
  //       mouseCell.opacity
  //     );
  //     return;
  //   }

  //   const storedCellY = Math.floor(window.currentCell.y / 16);
  //   const storedCellX = Math.floor(window.currentCell.x / 16);

  //   if (storedCellX !== mouseCellX || storedCellY !== mouseCellY) {
  //     selectedLayer[storedCellY][storedCellX] = window.currentCell;
  //     window.currentCell = new Cell(
  //       mouseCell.x,
  //       mouseCell.y,
  //       16,
  //       16,
  //       mouseCell.color,
  //       mouseCell.opacity
  //     );
  //     mouseCell.color = color;
  //     mouseCell.opacity = opacity;
  //     render();
  //   }
  // };
  const clearCanvas = () => {
    const canvas = document.getElementById("draw-canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

  const drawPixel = (e) => {
    if (!canvasArray.canvas[layer].active || opacity === 0) return;
    if (showColorPicker) {
      setShowColorPicker(false);
    }
    draw(e, "clicked");
    Canvas.saveDrawing(canvasArray);
  };

  const floodFill = (e) => {
    if (opacity === 0) return;
    const canvas = document.getElementById("draw-canvas");
    const coordinates = getMousePos(canvas, e);
    const y = Math.floor(coordinates.y / 16);
    const x = Math.floor(coordinates.x / 16);
    const colorToChange = selectedLayer[y][x].color;
    Canvas.floodFill(
      selectedLayer,
      y,
      x,
      colorToChange,
      color,
      opacity,
      strokes,
      layer
    );
    clearCanvas();
    render();
    Canvas.saveDrawing(canvasArray);
  };

  const draw = (e, fromClick) => {
    if (e.buttons === 0 && !fromClick) return;
    if (opacity === 0) return;

    if (showColorPicker) {
      setShowColorPicker(false);
    }

    const canvas = document.getElementById("draw-canvas");
    const ctx = canvas.getContext("2d");
    const coordinates = getMousePos(canvas, e);
    const coorY = Math.floor(coordinates.y / 16);
    const coorX = Math.floor(coordinates.x / 16);
    const selectedCell = selectedLayer[coorY][coorX];
    const { x, y, h, w } = selectedCell;
    const lastStroke = strokes[strokes.length - 1];
    let shouldPush = true;

    if (
      strokes.length &&
      lastStroke[1] * 16 === y &&
      lastStroke[2] * 16 === x
    ) {
      return;
    }

    if (selectedCell.opacity !== opacity) {
      // strokes.push([
      //   layer,
      //   coorY,
      //   coorX,
      //   selectedCell.color,
      //   selectedCell.opacity,
      // ]);
      setStrokes((prev) => [
        ...prev,
        [layer, coorY, coorX, selectedCell.color, selectedCell.opacity],
      ]);
      shouldPush = false;
    } else if (selectedCell.color !== color && shouldPush) {
      // strokes.push([
      //   layer,
      //   coorY,
      //   coorX,
      //   selectedCell.color,
      //   selectedCell.opacity,
      // ]);
      setStrokes((prev) => [
        ...prev,
        [layer, coorY, coorX, selectedCell.color, selectedCell.opacity],
      ]);
    }

    if (tool === "draw") {
      if (selectedCell.opacity <= 1) {
        const layerOpacity = selectedCell.opacity + opacity;

        selectedCell.opacity = layerOpacity < 1 ? layerOpacity : 1;
      } else {
        selectedCell.opacity = opacity;
      }
      selectedCell.color = color;
    } else if (tool === "erase") {
      const newLayerOpacity =
        selectedCell.opacity - opacity > 0 ? selectedCell.opacity - opacity : 0;
      selectedCell.opacity = newLayerOpacity;
      selectedCell.color = null;
    } else if (tool === "fill") {
      floodFill(e);
    }
    // if (tool === "draw") {
    ctx.clearRect(x, y, h, w);
    for (let layers of canvasArray.canvas) {
      if (!layers.active) continue;
      const pixel =
        layers.layer[Math.floor(coordinates.y / 16)][
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
    canvasArray.color = color;
    canvasArray.opacity = opacity;
    canvasArray.layersActive = showLayers;
  };

  return (
    <>
      {/* <button onClick={clearCanvas}>clear canvas</button> */}
      <div className="drawing__canvas">
        <canvas
          id="draw-canvas"
          width="512"
          height="512"
          onClick={drawPixel}
          // onMouseDown={(e) => draw(e, "clickedx")}
          // onMouseUp={tools.onMouseUp[tool]}
          // onMouseOver={drawPixel}
          // onMouseMove={tool !== "fill" ? hoverPreview : null}
          onMouseMove={draw}
          // onMouseOut={tool !== "fill" ? tools.onMouseUp[tool] : null}
        />
      </div>

      {/* <input type="color" /> */}
    </>
  );
};

export default DrawingCanvas;
