import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./drawingPage.css";

import DrawingCanvas from "./drawingCanvas/drawingCanvas";
import LayersSection from "./layersSection/layerSection";
import ToolKit from "./toolkit/toolkit";
import { useNavigate } from "react-router";

const DrawingPage = () => {
  const loadedCanvas = useSelector((state) => state.selectedCanvas);
  const navigate = useNavigate();
  const [color, setColor] = useState(loadedCanvas.color);
  const [tool, setTool] = useState(loadedCanvas.tool);
  const [layer, setLayer] = useState(loadedCanvas.drawingLayer);
  const [canvas, setCanvas] = useState(null);
  const [opacity, setOpacity] = useState(loadedCanvas.opacity * 10);
  const [history, setHistory] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [strokes, setStrokes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loadedCanvas.canvas) {
      navigate("/library");
    } else {
      setCanvas(loadedCanvas);
      setLayer(loadedCanvas.drawingLayer);
    }
  }, [loadedCanvas, navigate]);

  const saveImg = async () => {
    const canvas = document.getElementById("draw-canvas");
    const img = document.createElement("a");
    img.download = `${loadedCanvas.name}.png`;
    img.href = canvas.toDataURL();
    img.click();
  };

  if (!canvas || !loadedCanvas.canvas) {
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
          color={color}
          setColor={setColor}
          showColorPicker={showColorPicker}
          setShowColorPicker={setShowColorPicker}
          setOpacity={setOpacity}
          opacity={opacity}
          saveImg={saveImg}
        />

        <div className="canvas-layer-container">
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
            setShowColorPicker={setShowColorPicker}
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
        </div>

        {/* <OpacitySlider
          setOpacity={setOpacity}
          opacity={opacity}
          color={color}
        /> */}
        {/* <button onClick={saveImg}>save image</button> */}
      </>
    );
};

export default DrawingPage;
