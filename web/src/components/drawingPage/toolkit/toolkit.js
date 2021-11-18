import { Layer } from "../canvasClass";

import "./toolkit.css";

const ToolKit = ({
  tool,
  setTool,
  canvas,
  activeLayers,
  setCanvas,
  setActiveLayers,
  setLayer,
}) => {
  return (
    <nav className="tool__kit">
      <button
        className={`tool__kit__button ${
          tool === "draw" ? "tool__kit__button__active" : ""
        }`}
        onClick={() => setTool("draw")}
      >
        draw
      </button>
      <button
        className={`tool__kit__button ${
          tool === "erase" ? "tool__kit__button__active" : ""
        }`}
        onClick={() => setTool("erase")}
      >
        erase
      </button>

      <button
        className="tool__kit__button"
        onClick={() => {
          Layer.addLayer(canvas);
          activeLayers.push(true);
          setCanvas((prev) => [...prev]);
          setActiveLayers((prev) => [...prev]);
          setLayer(canvas.length - 1);
        }}
      >
        add Layer
      </button>
    </nav>
  );
};

export default ToolKit;
