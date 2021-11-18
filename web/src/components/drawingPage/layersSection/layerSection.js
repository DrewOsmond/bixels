import { Layer } from "../canvasClass";
import "./layer.css";

import Layers from "./layers/layers";

const LayersSection = ({ layer, setLayer, setCanvas, canvas }) => {
  const handleSwitchLayers = (e) => {
    const layer = Number(e.target.name);
    setLayer(layer);
  };

  const handleDrawOnLayer = (e) => {
    const layer = Number(e.target.name);
    setLayer(layer);
  };

  const deleteLayer = (e) => {
    const layer = Number(e.target.name);
    canvas.splice(layer, 1);
    if (canvas.length === 0) {
      canvas.push(new Layer(0));
    }
    setLayer((prev) => (prev !== 0 ? prev - 1 : 0));
    setCanvas([...canvas]);
    localStorage.setItem("canvas", JSON.stringify(canvas));
  };

  return (
    <div className="layer__section">
      {canvas.map((ele, i) => (
        <Layers
          ele={ele}
          key={i}
          setCanvas={setCanvas}
          canvas={canvas}
          handleSwitchLayers={handleSwitchLayers}
          handleDrawOnLayer={handleDrawOnLayer}
          layer={layer}
          deleteLayer={deleteLayer}
        />
      ))}
    </div>
  );
};

export default LayersSection;
