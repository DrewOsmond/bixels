import { Layer } from "../canvasClass";
import "./toolkit.css";

const ToolKit = ({ tool, setTool, canvas, setCanvas, setLayer, setLoaded }) => {
  return (
    <div className="tool__kit__container">
      <nav className="tool__kit">
        <div
          className={`tool__kit__button ${
            tool === "draw" ? "tool__kit__button__active" : ""
          }`}
          onClick={() => setTool("draw")}
        >
          draw
        </div>
        <div
          className={`tool__kit__button ${
            tool === "erase" ? "tool__kit__button__active" : ""
          }`}
          onClick={() => setTool("erase")}
        >
          erase
        </div>
        <div
          className={`tool__kit__button ${
            tool === "fill" ? "tool__kit__button__active" : ""
          }`}
          onClick={() => setTool("fill")}
        >
          fill
        </div>

        <div
          className={`tool__kit__button ${
            tool === "eye-dropper" ? "tool__kit__button__active" : ""
          }`}
          onClick={() => setTool("eye-dropper")}
        >
          eye dropper
        </div>

        <div
          className="tool__kit__button"
          onClick={() => {
            canvas.canvas.push(new Layer(canvas.canvas.length));
            setLayer(canvas.canvas.length - 1);
            canvas.drawingLayer = canvas.canvas.length - 1;
            localStorage.setItem("selected-canvas", JSON.stringify(canvas));
            setCanvas((prev) => {
              return { ...prev };
            });
          }}
        >
          add Layer
        </div>
      </nav>
    </div>
  );
};

export default ToolKit;
