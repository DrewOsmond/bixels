import { useState } from "react";
import { useSelector } from "react-redux";
import { Canvas } from "./canvasClass";
import "./drawingPage.css";

import DrawingCanvas from "./drawingCanvas/drawingCanvas";
import LayersSection from "./layersSection/layerSection";
import ToolKit from "./toolkit/toolkit";

const DrawingPage = () => {
  const loadedCanvas = useSelector((state) => state.selectedCanvas);
  const [color, setColor] = useState(loadedCanvas.color);
  const [tool, setTool] = useState(loadedCanvas.tool);
  const [layer, setLayer] = useState(
    loadedCanvas.drawingLayer < loadedCanvas.canvas.length - 1
      ? loadedCanvas.drawingLayer
      : loadedCanvas.canvas.length - 1
  );
  const [canvas, setCanvas] = useState(loadedCanvas);
  const [opacity, setOpacity] = useState(loadedCanvas.opacity * 10);
  const [history, setHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(0);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [strokes, setStrokes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const saveImg = async () => {
    const canvas = document.getElementById("draw-canvas");
    const img = document.createElement("a");
    img.download = `${loadedCanvas.name}.png`;
    img.href = canvas.toDataURL();
    img.click();
  };

  const updateHistory = (e) => {
    if (strokes.length >= 1) {
      if (history.length === 20) {
        history.unshift();
      }
      setHistory(strokes);
      setSelectedHistory((prev) => prev + 1);
      setStrokes([]);
      strokes.length = 0;
      Canvas.saveDrawing(loadedCanvas);
    }
  };
  // console.log("history?", history);
  // console.log("HISTORY", history.length);
  // console.log("selected", selectedHistory);
  // const renderHistoryChange = (historyId) => {
  //   const isMostUpdated = historyId === history.length - 1;
  // };

  if (!canvas || !loadedCanvas.canvas) {
    return null;
  } else
    return (
      <>
        <div onMouseUp={updateHistory}>
          <ToolKit
            tool={tool}
            setTool={setTool}
            canvas={canvas}
            setCanvas={setCanvas}
            setLayer={setLayer}
            color={color}
            setColor={setColor}
            showColorPicker={showColorPicker}
            setShowColorPicker={setShowColorPicker}
            opacity={opacity}
            setOpacity={setOpacity}
            saveImg={saveImg}
            history={history}
            selectedHistory={selectedHistory}
            setSelectedHistory={setSelectedHistory}
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
              strokes={strokes}
              setStrokes={setStrokes}
              update={strokes}
              showColorPicker={showColorPicker}
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
        </div>
      </>
    );
};

export default DrawingPage;
