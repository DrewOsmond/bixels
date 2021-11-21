import { HexColorPicker } from "react-colorful";
import { Layer } from "../canvasClass";
import { Canvas } from "../canvasClass";
import { useNavigate } from "react-router-dom";
import OpacitySlider from "../opacitySlider/opacitySlider";
import "./toolkit.css";

const ToolKit = ({
  tool,
  setTool,
  canvas,
  setCanvas,
  setLayer,
  color,
  setColor,
  showColorPicker,
  setShowColorPicker,
  opacity,
  setOpacity,
  saveImg,
  history,
  selectedHistory,
  setSelectedHistory,
}) => {
  const navigate = useNavigate();

  const handleToolChange = (e) => {
    const toolChange = e.target.id;
    canvas.tool = toolChange;
    setTool(toolChange);
    Canvas.saveDrawing(canvas);
  };

  const handleAddLayer = () => {
    canvas.canvas.push(new Layer(canvas.canvas.length));
    setLayer(canvas.canvas.length - 1);
    canvas.drawingLayer = canvas.canvas.length - 1;
    localStorage.setItem("selected-canvas", JSON.stringify(canvas));
    setCanvas((prev) => {
      return { ...prev };
    });

    Canvas.saveDrawing(canvas);
  };

  return (
    <div className="tool__kit__container">
      <nav className="tool__kit">
        <button onClick={() => navigate("/library")}>back</button>
        <button
          id="draw"
          className={`tool__kit__button ${
            tool === "draw" ? "tool__kit__button__active" : ""
          }`}
          onClick={handleToolChange}
        >
          draw
        </button>
        <button
          id="erase"
          className={`tool__kit__button ${
            tool === "erase" ? "tool__kit__button__active" : ""
          }`}
          onClick={handleToolChange}
        >
          erase
        </button>
        <button
          id="fill"
          className={`tool__kit__button ${
            tool === "fill" ? "tool__kit__button__active" : ""
          }`}
          onClick={handleToolChange}
        >
          fill
        </button>

        <button
          id="eye-dropper"
          className={`tool__kit__button ${
            tool === "eye-dropper" ? "tool__kit__button__active" : ""
          }`}
          onClick={handleToolChange}
        >
          eye dropper
        </button>

        <button
          disabled={canvas.canvas.length >= 15}
          className="tool__kit__button"
          onClick={handleAddLayer}
        >
          add Layer
        </button>
        <div
          onClick={() => setShowColorPicker(!showColorPicker)}
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: opacity / 10 === 0 ? "#FFFFFF" : color,
            boxShadow: "0px 0px 5px black",
            borderRadius: "5px",
            margin: "8px 8px",
            opacity: opacity / 10 === 0 ? 1 : opacity / 10,
          }}
        />
        {showColorPicker && (
          <>
            <HexColorPicker color={color} onChange={setColor} />
            <OpacitySlider
              setOpacity={setOpacity}
              opacity={opacity}
              color={color}
            />
          </>
        )}
        <button
          onClick={() => setSelectedHistory(selectedHistory - 1)}
          disabled={!history[selectedHistory - 1]}
        >
          back
        </button>
        <button
          onClick={() => setSelectedHistory((prev) => prev + 1)}
          disabled={!history[selectedHistory]}
        >
          forward
        </button>
        <button onClick={saveImg}>save image</button>
      </nav>
    </div>
  );
};

export default ToolKit;
