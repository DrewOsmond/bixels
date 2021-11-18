import { Layer } from "./canvasClass";
import { HexColorPicker } from "react-colorful";
import { useState, useEffect } from "react";

import "./drawingPage.css";

import DrawingCanvas from "./drawingCanvas/drawingCanvas";
import Layers from "./layers/layers";
import OpacitySlider from "./opacitySlider/opacitySlider";
import ToolKit from "./toolkit/toolkit";

const DrawingPage = () => {
  const [color, setColor] = useState("#4b4e51");
  const [tool, setTool] = useState("draw");
  const [layer, setLayer] = useState(0);
  const [canvas, setCanvas] = useState([]);
  const [activeLayers, setActiveLayers] = useState([]);
  const [opacity, setOpacity] = useState(10);
  const [history, setHistory] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  // const [selectedHistory, setSelectedHistory] = useState(0);

  useEffect(() => {
    let makeCanvas = [];
    let refreshCanvas = localStorage.getItem("canvas");
    refreshCanvas = refreshCanvas ? JSON.parse(refreshCanvas) : null;

    if (refreshCanvas && refreshCanvas.length > 0) {
      for (let layer of refreshCanvas) {
        Layer.reloadCells(layer);
        makeCanvas.push(layer);
      }

      setCanvas(makeCanvas);
    } else if (!refreshCanvas || !refreshCanvas.length) {
      Layer.addLayer(makeCanvas);
      setCanvas((prev) => [...prev, ...makeCanvas]);
    } else {
    }

    const activeLayers = new Array(makeCanvas.length).fill(true);
    setActiveLayers(activeLayers);
  }, []);

  return (
    <>
      <ToolKit
        setTool={setTool}
        tool={tool}
        canvas={canvas}
        activeLayers={activeLayers}
        setCanvas={setCanvas}
        setActiveLayers={setActiveLayers}
        setLayer={setLayer}
      />

      <DrawingCanvas
        color={color}
        tool={tool}
        canvasArray={canvas}
        layer={layer}
        activeLayers={activeLayers}
        opacity={opacity}
        setHistory={setHistory}
        history={history}
      />
      {/* </div> */}
      <Layers
        activeLayers={activeLayers}
        setActiveLayers={setActiveLayers}
        layer={layer}
        setLayer={setLayer}
        setCanvas={setCanvas}
        canvas={canvas}
      />
      <OpacitySlider setOpacity={setOpacity} opacity={opacity} color={color} />
      <button
        style={{ color }}
        onClick={() => setShowColorPicker(!showColorPicker)}
      >
        show color picker
      </button>
      {showColorPicker ? (
        <HexColorPicker color={color} onChange={setColor} />
      ) : null}
    </>
  );
};

export default DrawingPage;
