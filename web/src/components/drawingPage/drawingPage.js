import { Layer } from "./canvasClass";
import { HexColorPicker } from "react-colorful";
import { useState, useEffect } from "react";

import DrawingCanvas from "./drawingCanvas/drawingCanvas";
import ToolSelector from "./toolSelector/toolSelector";
import Layers from "./layers/layers";
import OpacitySlider from "./opacitySlider/opacitySlider";

const DrawingPage = () => {
  const [color, setColor] = useState("#aabbcc");
  const [tool, setTool] = useState("draw");
  const [layer, setLayer] = useState(0);
  const [canvas, setCanvas] = useState([]);
  const [activeLayers, setActiveLayers] = useState([]);
  const [opacity, setOpacity] = useState(10);
  const [history, setHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(0);

  useEffect(() => {
    let makeCanvas = [];
    let refreshCanvas = localStorage.getItem("canvas");
    refreshCanvas = refreshCanvas ? JSON.parse(refreshCanvas) : null;

    if (refreshCanvas && refreshCanvas.length > 0) {
      console.log("are we getting here?");

      for (let layer of refreshCanvas) {
        Layer.reloadCells(layer);
        makeCanvas.push(layer);
      }

      // console.log(refreshCanvas);
      // for (let y = 0; y < refreshCanvas.length; y++) {
      //   const inner = refreshCanvas[y];
      //   const columnCells = [];
      //   for (let x = 0; x < inner.length; x++) {
      //     const cell = inner[x];
      //     columnCells.push(
      //       new Cell(16 * x, 16 * y, 16, 16, cell.color, cell.opacity)
      //     );
      //   }
      //   canvas.push(columnCells);
      // }
      setCanvas(makeCanvas);
      setHistory((prev) => [...prev, makeCanvas]);
    } else if (!refreshCanvas || !refreshCanvas.length) {
      // for (let y = 0; y < rows; y++) {
      //   const columnCells = [];
      //   for (let x = 0; x < columns; x++) {
      //     columnCells.push(new Cell(16 * x, 16 * y, 16, 16));
      //   }
      //   canvas.push(columnCells);
      // }
      Layer.addLayer(makeCanvas);
      setCanvas((prev) => [...prev, ...makeCanvas]);
    } else {
    }

    const activeLayers = new Array(makeCanvas.length).fill(true);
    setActiveLayers(activeLayers);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          Layer.addLayer(canvas);
          activeLayers.push(true);
          setCanvas((prev) => [...prev]);
          setActiveLayers((prev) => [...prev]);
        }}
      >
        add Layer
      </button>
      <ToolSelector setTool={setTool} />
      <DrawingCanvas
        color={color}
        tool={tool}
        canvasArray={canvas}
        layer={layer}
        activeLayers={activeLayers}
        opacity={opacity}
      />
      <Layers
        activeLayers={activeLayers}
        setActiveLayers={setActiveLayers}
        layer={layer}
        setLayer={setLayer}
        setCanvas={setCanvas}
        canvas={canvas}
      />
      <HexColorPicker color={color} onChange={setColor} />
      <OpacitySlider setOpacity={setOpacity} opacity={opacity} color={color} />
    </>
  );
};

export default DrawingPage;
