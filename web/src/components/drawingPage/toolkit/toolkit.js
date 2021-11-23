import { HexColorPicker } from "react-colorful";
import { Canvas } from "../canvasClass";
import { useNavigate } from "react-router-dom";
import OpacitySlider from "../opacitySlider/opacitySlider";
import "./toolkit.css";

import brushSVG from "../../../assets/brush.svg";
import eraseSVG from "../../../assets/eraser.svg";
import homeSVG from "../../../assets/home.svg";
import fillSVG from "../../../assets/fill.svg";
import layersSVG from "../../../assets/layers.svg";
import saveSVG from "../../../assets/save.svg";

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
  setShowLayers,
  showLayers,
}) => {
  const navigate = useNavigate();

  const handleToolChange = (e) => {
    const toolChange = e.target.id;
    canvas.tool = toolChange;
    setTool(toolChange);
    Canvas.saveDrawing(canvas);
  };

  return (
    <>
      <div className="tool__kit__container">
        <nav className="tool__kit">
          <div className="tool__kit__left__side">
            <img
              src={homeSVG}
              alt="back button"
              className="tool__kit__button"
              onClick={() => navigate("/library")}
            />
            <img
              src={saveSVG}
              alt="save button"
              className="tool__kit__button"
              onClick={saveImg}
            />
            {/* <img src={}/> */}
          </div>
          <OpacitySlider
            setOpacity={setOpacity}
            opacity={opacity}
            color={color}
          />
          {/* <button
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
        </button> */}
          <div className="tool__kit__right__side">
            {/* <button
              id="draw"
              className={`tool__kit__button ${
                tool === "draw" ? "tool__kit__button__active" : ""
              }`}
              onClick={handleToolChange}
            > */}
            <img
              src={brushSVG}
              alt="brush"
              id="draw"
              className={`tool__kit__button ${
                tool === "draw"
                  ? "tool__kit__button__active"
                  : "tool__kit__button"
              }`}
              onClick={handleToolChange}
            />
            {/* </button> */}
            <img
              src={eraseSVG}
              alt="eraser"
              id="erase"
              className={`tool__kit__button ${
                tool === "erase" ? "tool__kit__button__active" : ""
              }`}
              onClick={handleToolChange}
            />

            <img
              src={fillSVG}
              alt="fill"
              id="fill"
              className={`tool__kit__button ${
                tool === "fill" ? "tool__kit__button__active" : ""
              }`}
              onClick={handleToolChange}
            />

            {/* <button
          id="eye-dropper"
          className={`tool__kit__button ${
            tool === "eye-dropper" ? "tool__kit__button__active" : ""
          }`}
          onClick={handleToolChange}
          >
          eye dropper
        </button> */}

            <img
              src={layersSVG}
              alt="display layers"
              className={`tool__kit__button ${
                showLayers ? "layers__displayed" : ""
              }`}
              onClick={() => setShowLayers((prev) => !prev)}
            />

            <div
              className="color__picker__display__box"
              onClick={() => setShowColorPicker(!showColorPicker)}
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: opacity / 10 === 0 ? "#FFFFFF" : color,
                boxShadow: "0px 0px 5px black",
                borderRadius: "5px",
                margin: "8px 8px",
                opacity: opacity / 10,
                border: "1px solid #fcfbf9",
              }}
            />
          </div>
        </nav>
      </div>
      {showColorPicker && (
        <div className="color-picker">
          <HexColorPicker color={color} onChange={setColor} />
        </div>
      )}
    </>
  );
};

export default ToolKit;
