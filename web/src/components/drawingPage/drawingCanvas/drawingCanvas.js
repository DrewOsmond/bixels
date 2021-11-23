import { useEffect } from "react";
// import "./canvas.css";
import { Canvas } from "../canvasClass";

const DrawingCanvas = ({
  color,
  tool,
  canvasArray,
  layer,
  opacity,
  lastDrawn,
  setLastDrawn,
  setShowColorPicker,
  showColorPicker,
  showLayers,
}) => {
  // const [currentCell, setCurrentCell] = useState(null);
  // let strokes = [];
  opacity = opacity / 10;
  if (layer > canvasArray.canvas.length - 1) {
    layer = canvasArray.canvas.length - 1;
    // setLayer(canvasArray.canvas.length - 1);
  }
  const selectedLayer = canvasArray.canvas[layer]?.layer;
  const render = () => {
    clearCanvas();
    // for (let i = canvasArray.canvas.length - 1; i >= 0; i--) {
    //   const canvasLayer = canvasArray.canvas[i];
    for (let layers of canvasArray.canvas) {
      if (layers.active) {
        reDraw(layers.layer);
      }
    }
    // for (let canvasLayer of canvasArray.canvas) {
    //   if (canvasLayer.active) {
    //   }
    // }
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
      layer
    );
    clearCanvas();
    render();
    Canvas.saveDrawing(canvasArray);
  };

  const erase = (cell) => {
    const newLayerOpacity =
      cell.opacity - opacity > 0 ? cell.opacity - opacity : 0;
      cell.opacity = newLayerOpacity;
      cell.color = null;
  }
  const plotLineLow = (x0, y0, x1, y1) => {
    let dx = x1 - x0;
    let dy = y1 - y0;
    let yi = 1;
    if (dy < 0){
        yi = -1;
        dy = -dy;
    }
    let D = 2 * dy - dx;
    let drawY = y0;

        for (let drawX = x0; drawX <= x1; drawX++){
          let selectedCell = selectedLayer[drawY][drawX];
          let drawOpacity = 0;
          if (selectedCell.opacity <= 1) {
            drawOpacity = selectedCell.opacity + opacity < 1 ? selectedCell.opacity + opacity : 1;
          } else {
            drawOpacity = opacity;
      }
          selectedCell.color = color;
          selectedCell.opacity = drawOpacity;
          if (D > 0){
              drawY += yi;
              D = D + (2 * (dy - dx));
          } else {
              D = D + 2*dy;
          }
        }
  }

  const plotLineHigh = (x0, y0, x1, y1, drawOpacity) => {
    let dx = x1 - x0;
    let dy = y1 - y0;
    let xi = 1;
    if (dx < 0){
        xi = -1;
        dx = -dx;
    }
    let D = 2 * dx - dy;
    let drawX = x0;

        for (let drawY = y0; drawY <= y1; drawY++){
          let selectedCell = selectedLayer[drawY][drawX];
          let drawOpacity = 0;
          if (selectedCell.opacity <= 1) {
            drawOpacity = selectedCell.opacity + opacity < 1 ? selectedCell.opacity + opacity : 1;
          } else {
            drawOpacity = opacity;
      }
          selectedCell.color = color;
          selectedCell.opacity = drawOpacity;
          if (D > 0){
              drawX += xi;
              D = D + (2 * (dx - dy));
          } else {
              D = D + 2*dx;
          }
        }
  }

  const plotLine = (x0, y0, x1, y1, drawOpacity) => {
    if (Math.abs(y1 - y0) < Math.abs(x1 - x0)){
      if (x0 > x1){
        plotLineLow(x1, y1, x0, y0, drawOpacity);
      } else {
        plotLineLow(x0, y0, x1, y1, drawOpacity)
      }
    } else {
      if (y0 > y1){
        plotLineHigh(x1, y1, x0, y0, drawOpacity);
      } else {
        plotLineHigh(x0, y0, x1, y1, drawOpacity);
      }
    }
  }

  const draw = (e, fromClick) => {
    
    if (e.buttons === 0 && !fromClick){
      setLastDrawn([]);
      return;
    }
    if (opacity === 0) return;

    if (showColorPicker) {
      setShowColorPicker(false);
    }

    const canvas = document.getElementById("draw-canvas");
    const coordinates = getMousePos(canvas, e);
    const coorY = Math.floor(coordinates.y / 16);
    const coorX = Math.floor(coordinates.x / 16);
    const selectedCell = selectedLayer[coorY][coorX];
    
    if (tool === "draw") {
      
      console.log(lastDrawn);
      if (lastDrawn.length){
        plotLine(lastDrawn[0], lastDrawn[1], coorX, coorY);
      } else {
        let drawOpacity = 0;
      if (selectedCell.opacity <= 1) {
        drawOpacity = selectedCell.opacity + opacity < 1 ? selectedCell.opacity + opacity : 1;
      } else {
        drawOpacity = opacity;
      }
        selectedLayer[coorY][coorX].color = color;
        selectedLayer[coorY][coorX].opacity = drawOpacity;
      }
    } else if (tool === "erase") {
      erase(selectedCell);
    } else if (tool === "fill") {
      floodFill(e);
    }
    render();
    canvasArray.color = color;
    canvasArray.opacity = opacity;
    canvasArray.layersActive = showLayers;
    setLastDrawn([coorX, coorY]);
    
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
