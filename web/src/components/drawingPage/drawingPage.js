import { HexColorPicker } from "react-colorful";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./drawingPage.css";

import DrawingCanvas from "./drawingCanvas/drawingCanvas";
import LayersSection from "./layersSection/layerSection";
import OpacitySlider from "./opacitySlider/opacitySlider";
import ToolKit from "./toolkit/toolkit";

const DrawingPage = () => {
  const loadedCanvas = useSelector((state) => state.selectedCanvas);
  const [color, setColor] = useState(loadedCanvas.color);
  const [tool, setTool] = useState("draw");
  const [layer, setLayer] = useState(loadedCanvas.drawingLayer);
  const [canvas, setCanvas] = useState(null);
  const [opacity, setOpacity] = useState(10);
  const [history, setHistory] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [strokes, setStrokes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCanvas(loadedCanvas);
    setLayer(loadedCanvas.drawingLayer);
  }, [loadedCanvas]);

  if (!canvas) {
    return null;
  } else
    return (
      <>
        <ToolKit
          setTool={setTool}
          tool={tool}
          canvas={canvas}
          setCanvas={setCanvas}
          setLayer={setLayer}
          setLoaded={setLoaded}
        />

        <DrawingCanvas
          color={color}
          tool={tool}
          canvasArray={canvas}
          layer={layer}
          opacity={opacity}
          setHistory={setHistory}
          history={history}
          setStrokes={setStrokes}
          update={strokes}
        />
        <LayersSection
          loaded={loaded}
          layer={layer}
          setLayer={setLayer}
          setCanvas={setCanvas}
          canvas={canvas}
          setLoaded={setLoaded}
          activeLayer={layer}
        />
        <OpacitySlider
          setOpacity={setOpacity}
          opacity={opacity}
          color={color}
        />
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
