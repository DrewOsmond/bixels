import { Layer } from "../canvasClass";

const Layers = ({
  activeLayers,
  setActiveLayers,
  layer,
  setLayer,
  setCanvas,
  canvas,
}) => {
  const handleSwitchLayers = (e) => {
    const layer = Number(e.target.name);
    const swap = !activeLayers[layer];
    activeLayers[layer] = swap;
    setActiveLayers([...activeLayers]);
  };

  const handleDrawOnLayer = (e) => {
    const layer = Number(e.target.name);
    setLayer(layer);
  };

  const deleteLayer = (e) => {
    const layer = Number(e.target.name);
    canvas.splice(layer, 1);
    if (canvas.length === 0) {
      Layer.addLayer(canvas);
    }
    setCanvas([...canvas]);
    localStorage.setItem("canvas", JSON.stringify(canvas));
    activeLayers.splice(layer, 1);
    if (activeLayers.length === 0) {
      activeLayers.push(true);
    }
    setActiveLayers(activeLayers);
  };

  return (
    <>
      {activeLayers.map((ele, i) =>
        ele ? (
          <>
            <button name={i} key={i} onClick={handleSwitchLayers}>{`layer ${
              i + 1
            } active`}</button>
            <button
              name={i}
              key={`active-${i + 1}`}
              onClick={handleDrawOnLayer}
            >
              {i === layer
                ? `drawing on layer ${i + 1}`
                : `draw on layer ${i + 1}`}
            </button>
            <button
              name={i}
              key={`delete-layer-${i}`}
              onClick={deleteLayer}
            >{`delete layer ${i + 1}`}</button>
          </>
        ) : (
          <button name={i} key={i} onClick={handleSwitchLayers}>{`layer ${
            i + 1
          } not active`}</button>
        )
      )}
    </>
  );
};

export default Layers;
