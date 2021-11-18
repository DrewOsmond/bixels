import { Layer } from "../canvasClass";
import "./layer.css";

const Layers = ({ layer, setLayer, setCanvas, canvas }) => {
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
    <>
      {canvas.map((ele, i) =>
        ele ? (
          <>
            <button
              className={`layer__button ${
                Number(i) === layer ? "active__layer" : ""
              }`}
              name={i}
              key={i}
              onClick={handleSwitchLayers}
            >{`${ele.name} active`}</button>
            <button
              name={i}
              key={`active-${i + 1}`}
              onClick={handleDrawOnLayer}
            >
              {i === layer
                ? `drawing on ${ele.name}`
                : `draw on layer ${ele.name}`}
            </button>
            <button
              name={i}
              key={`delete-layer-${i}`}
              onClick={deleteLayer}
            >{`delete ${ele.name}`}</button>
          </>
        ) : (
          <button
            name={i}
            key={i}
            onClick={handleSwitchLayers}
          >{`${ele.name} not active`}</button>
        )
      )}
    </>
  );
};

export default Layers;
