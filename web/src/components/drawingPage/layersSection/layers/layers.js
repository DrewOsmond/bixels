import { useState, useEffect } from "react";
import { Canvas } from "../../canvasClass";
import { useDispatch } from "react-redux";
import { updateCanvas } from "../../../../store/reducers/selectedCanvas";

const Layer = ({
  ele,
  i,
  setCanvas,
  canvas,
  handleSwitchLayers,
  handleDrawOnLayer,
  layer,
  deleteLayer,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(ele.name);
  const [change, setChange] = useState(false);

  useEffect(() => {
    const canv = document.getElementById(`${ele.name}-${i}`);
    const ctx = canv.getContext("2d");
    Canvas.clearCanvas(canv, ctx);
    Canvas.paintLayer(ele.layer, ctx, 8);
  }, [ele.layer, ele.name, i]);

  useEffect(() => {
    if (change) {
      document.getElementById("name-change").focus();
    }
  }, [change]);

  // const handleChangeName = (e) => {
  //   const layerNameToChange = Number(e.target.getAttribute("name"));
  //   canvas.canvas[layerNameToChange].name = name;
  //   localStorage.setItem("selected-canvas", JSON.stringify(canvas));
  //   setCanvas((prev) => {
  //     return { ...prev };
  //   });
  //   setChange(false);
  // };

  const handleDoubleClick = (e) => {
    setChange(true);
    window.addEventListener("keydown", saveName);
    window.addEventListener("click", saveName);
  };

  const saveName = (e) => {
    if (e.keyCode === 13) {
      ele.name = name.length > 0 ? name : `layer ${i + 1}`;
      dispatch(updateCanvas(canvas));
      window.removeEventListener("keydown", saveName);
      window.removeEventListener("click", saveName);
      setChange(false);
    } else if (e.type === "click" && e.target.value !== name) {
      ele.name = name.length > 0 ? name : `layer ${i + 1}`;
      dispatch(updateCanvas(canvas));
      setChange(false);
      window.removeEventListener("keydown", saveName);
      window.removeEventListener("click", saveName);
    }
  };

  return (
    <div className="layer">
      <canvas
        name={i}
        width="64"
        height="64"
        id={`${ele.name}-${i}`}
        onClick={handleSwitchLayers}
      />
      {(() => {
        const canv = document.getElementById(`${ele.name}-${i}`);
        if (!canv) return;
        const ctx = canv.getContext("2d");
        Canvas.clearCanvas(canv, ctx);
        Canvas.paintLayer(ele.layer, ctx, 8);
      })()}

      {change ? (
        <input
          name={i}
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name-change"
        />
      ) : (
        <div
          className={`layer__button layer__displayed`}
          name={i}
          // onClick={handleSwitchLayers}
          onDoubleClick={handleDoubleClick}
        >
          {ele.name}
        </div>
      )}
      <div
        className={`${Number(i) === layer ? "active__layer" : ""}`}
        name={i}
        key={`active-${i + 1}`}
        onClick={handleDrawOnLayer}
      >
        {i === layer ? `drawing on ${ele.name}` : `draw on layer ${ele.name}`}
      </div>
      <div name={i} onClick={deleteLayer}>{`del ${ele.name}`}</div>
    </div>
  );
};

export default Layer;
