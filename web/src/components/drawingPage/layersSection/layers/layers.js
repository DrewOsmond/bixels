import { useState, useEffect } from "react";
import { Canvas } from "../../canvasClass";

const Layer = ({
  ele,
  i,
  setCanvas,
  canvas,
  handleSwitchLayers,
  handleDrawOnLayer,
  layer,
  deleteLayer,
  setLoaded,
  activeLayer,
}) => {
  const [name, setName] = useState(ele.name);
  const [change, setChange] = useState(false);

  useEffect(() => {
    const canv = document.getElementById(`${ele.name}-${i}`);
    const ctx = canv.getContext("2d");
    Canvas.clearCanvas(canv);
    Canvas.paintLayer(ele.layer, ctx, 8);
    setLoaded(true);
  }, []);

  const handleChangeName = (e) => {
    const layerNameToChange = Number(e.target.getAttribute("name"));
    canvas.canvas[layerNameToChange].name = name;
    localStorage.setItem("canvas", JSON.stringify(canvas));
    setCanvas((prev) => {
      return { ...prev };
    });
    setChange(false);
  };

  return (
    <div className="layer">
      <canvas width="64" height="64" id={`${ele.name}-${i}`} />
      {(() => {
        const canv = document.getElementById(`${ele.name}-${i}`);
        if (!canv) return;
        const ctx = canv.getContext("2d");
        Canvas.clearCanvas(canv);
        Canvas.paintLayer(ele.layer, ctx, 8);
      })()}
      {ele.active ? (
        <>
          <div
            className={`layer__button layer__displayed`}
            name={i}
            onClick={handleSwitchLayers}
          >
            {ele.name}
          </div>
          <div
            className={`${Number(i) === layer ? "active__layer" : ""}`}
            name={i}
            key={`active-${i + 1}`}
            onClick={handleDrawOnLayer}
          >
            {i === layer
              ? `drawing on ${ele.name}`
              : `draw on layer ${ele.name}`}
          </div>
          <div name={i} onClick={deleteLayer}>{`del ${ele.name}`}</div>
          {change ? (
            <>
              <input
                name={i}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div name={i} onClick={handleChangeName}>
                finish
              </div>
            </>
          ) : (
            <div onClick={() => setChange(true)}>change name</div>
          )}
        </>
      ) : (
        <div
          name={i}
          onClick={handleSwitchLayers}
        >{`${ele.name} not active`}</div>
      )}
    </div>
  );
};

export default Layer;
