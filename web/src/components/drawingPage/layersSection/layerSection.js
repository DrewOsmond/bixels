import { useSelector, useDispatch } from "react-redux";
// import { useState, useCallback, useReducer } from "react";
import { updateCanvases } from "../../../store/reducers/canvases";
import { Layer } from "../canvasClass";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Canvas } from "../canvasClass";
import Layers from "./layers/layers";

import addSVG from "../../../assets/add.svg";

const LayersSection = ({
  layer,
  setLayer,
  setCanvas,
  canvas,
  setLoaded,
  activeLayer,
  show,
}) => {
  const canvases = useSelector((state) => state.canvases);
  const dispatch = useDispatch();
  // const onDragEnd = useCallback((result) => {}, []);

  // const dragReducer = (state, action) => {
  //   return state;
  // };

  // const [state, reactDispatch] = useReducer(dragReducer, {
  //   items: [],
  // });

  const handleAddLayer = () => {
    if (canvas.canvas.length >= 10) return;
    canvas.canvas.push(new Layer(canvas.canvas.length));
    setLayer(canvas.canvas.length - 1);
    canvas.drawingLayer = canvas.canvas.length - 1;
    localStorage.setItem("selected-canvas", JSON.stringify(canvas));
    setCanvas((prev) => {
      return { ...prev };
    });

    Canvas.saveDrawing(canvas);
  };

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
      setLoaded(true);
      setCanvas({ ...canvas });
      setLayer(0);
      dispatch(updateCanvases(canvases));
    } else {
      setLayer((prev) => prev - 1);
      setCanvas({ ...canvas });
      localStorage.setItem("selected-canvas", JSON.stringify(canvas));
      dispatch(updateCanvases(canvases));
    }
  };

  return (
    <>
      {/* <button onClick={() => setShow((prev) => !prev)}>display layers</button> */}
      {show && (
        // <DragDropContext onDragEnd={onDragEnd} className="layer__section">
        <div className="layer__section">
          {/* {canvas.canvas.length >= 10 && (
            <div className="maximum-layers">max layers reaached</div>
          )} */}
          <div className="add-layer-section">
            <img
              disabled={canvas.canvas.length >= 15}
              className={
                canvas.canvas.length >= 10 ? "max-layers" : "add-layers"
              }
              src={addSVG}
              onClick={handleAddLayer}
              alt="add-item"
            />
          </div>
          <div className="layer-reverse">
            {canvas.canvas.map((ele, i) => (
              <Layers
                ele={ele}
                i={i}
                key={i}
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
          </div>

          {/* </DragDropContext> */}
        </div>
      )}
    </>
  );
};

export default LayersSection;
