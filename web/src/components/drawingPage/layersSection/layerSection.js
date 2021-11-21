import { useSelector, useDispatch } from "react-redux";
// import { useState, useCallback, useReducer } from "react";
import { useState } from "react";
import { updateCanvases } from "../../../store/reducers/canvases";
import { Layer } from "../canvasClass";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import Layers from "./layers/layers";

const LayersSection = ({
  layer,
  setLayer,
  setCanvas,
  canvas,
  setLoaded,
  activeLayer,
}) => {
  const canvases = useSelector((state) => state.canvases);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  // const onDragEnd = useCallback((result) => {}, []);

  // const dragReducer = (state, action) => {
  //   return state;
  // };

  // const [state, reactDispatch] = useReducer(dragReducer, {
  //   items: [],
  // });

  const handleSwitchLayers = (e) => {
    const layer = Number(e.target.getAttribute("name"));
    canvas.canvas[layer].active = !canvas.canvas[layer].active;
    setCanvas({ ...canvas });
    localStorage.setItem("selected-canvas", JSON.stringify(canvas));
    dispatch(updateCanvases(canvases));
  };

  const handleDrawOnLayer = (e) => {
    const layer = Number(e.target.getAttribute("name"));
    setLayer(layer);
    canvas.drawingLayer = layer;
    localStorage.setItem("selected-canvas", JSON.stringify(canvas));
  };

  const deleteLayer = (e) => {
    const layer = Number(e.target.getAttribute("name"));
    canvas.canvas.splice(layer, 1);
    if (canvas.canvas.length === 0) {
      canvas.canvas.push(new Layer(0));
      localStorage.setItem("selected-canvas", JSON.stringify(canvas));
    }
    setLayer((prev) => (prev !== 0 ? prev - 1 : 0));
    setCanvas({ ...canvas });
    localStorage.setItem("selected-canvas", JSON.stringify(canvas));
    setLoaded(true);
  };
  return (
    <>
      <button onClick={() => setShow((prev) => !prev)}>display layers</button>
      {show && (
        // <DragDropContext onDragEnd={onDragEnd} className="layer__section">
        <div className="layer__section">
          {canvas.canvas?.map((ele, i) => (
            <Layers
              ele={ele}
              i={i}
              key={`${ele.name}-layer-${i}`}
              setCanvas={setCanvas}
              canvas={canvas}
              handleSwitchLayers={handleSwitchLayers}
              handleDrawOnLayer={handleDrawOnLayer}
              layer={layer}
              deleteLayer={deleteLayer}
              setLoaded={setLoaded}
              activeLayer={activeLayer}
            />
          ))}
          {/* </DragDropContext> */}
        </div>
      )}
    </>
  );
};

export default LayersSection;
