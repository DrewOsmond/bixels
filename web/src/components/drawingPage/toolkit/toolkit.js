import { Layer } from "../canvasClass";

import "./toolkit.css";

const ToolKit = ({ tool, setTool, canvas, setCanvas, setLayer }) => {
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
        className={`tool__kit__button ${
          tool === "eye-dropper" ? "tool__kit__button__active" : ""
        }`}
        onClick={() => setTool("eye-dropper")}
      >
        eye dropper
      </button>

      <button
        className="tool__kit__button"
        onClick={() => {
          console.log(canvas);
          canvas.canvas.push(new Layer(canvas.canvas.length));
          setCanvas((prev) => {
            return { ...prev };
          });
          setLayer(canvas.canvas.length - 1);
        }}
      >
        add Layer
      </button>
    </nav>
  );
};

export default ToolKit;
