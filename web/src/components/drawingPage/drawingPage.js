import { HexColorPicker } from "react-colorful";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./drawingPage.css";

import DrawingCanvas from "./drawingCanvas/drawingCanvas";
import LayersSection from "./layersSection/layerSection";
import OpacitySlider from "./opacitySlider/opacitySlider";
import ToolKit from "./toolkit/toolkit";

const DrawingPage = () => {
  const [color, setColor] = useState("#4b4e51");
  const [tool, setTool] = useState("draw");
  const [layer, setLayer] = useState(0);
  const [canvas, setCanvas] = useState(null);
  const [opacity, setOpacity] = useState(10);
  const [history, setHistory] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const loadedCanvas = useSelector((state) => state.selectedCanvas);
  console.log("LOADED", loadedCanvas);

  useEffect(() => {
    setCanvas(loadedCanvas);
  }, []);
  // const [selectedHistory, setSelectedHistory] = useState(0);
  // console.log(layer);
  // useEffect(() => {
  //   if (!canvasInUse) {

  //   }
  // let makeCanvas = [];
  // let refreshCanvas = localStorage.getItem("canvas");
  // refreshCanvas = refreshCanvas ? JSON.parse(refreshCanvas) : null;

  // if (refreshCanvas && refreshCanvas.length > 0) {
  //   for (let i = 0; i < refreshCanvas.length; i++) {
  //     const currLayer = new Layer(i, refreshCanvas[i]);

  //     makeCanvas.push(currLayer);
  //   }

  //   setCanvas(makeCanvas);
  // } else if (!refreshCanvas || !refreshCanvas.length) {
  //  const newLayer = new Layer(1);
  //  setCanvas([newLayer]);
  // } else {
  //   //I think this block was for making history changes?? idk we'll figure it out
  // }
  // }, []);
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
        />

        <DrawingCanvas
          color={color}
          tool={tool}
          canvasArray={canvas}
          layer={layer}
          opacity={opacity}
          setHistory={setHistory}
          history={history}
        />
        <LayersSection
          layer={layer}
          setLayer={setLayer}
          setCanvas={setCanvas}
          canvas={canvas}
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
