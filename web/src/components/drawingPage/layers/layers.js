const Layers = ({ activeLayers, setActiveLayers, layer, setLayer }) => {
  const handleSwitchLayers = (e) => {
    const layer = Number(e.target.id);
    const swap = !activeLayers[layer];
    activeLayers[layer] = swap;
    setActiveLayers([...activeLayers]);
  };

  console.log(layer);
  const handleDrawOnLayer = (e) => {
    const layer = Number(e.target.id);
    console.log(layer);
    setLayer(layer);
  };
  return (
    <>
      {activeLayers.map((ele, i) =>
        ele ? (
          <>
            <button
              id={i}
              key={i}
              onClick={handleSwitchLayers}
            >{`layer ${i} active`}</button>
            <button id={i} key={`active-${i}`} onClick={handleDrawOnLayer}>
              {i === layer ? `drawing on layer ${i}` : `draw on layer ${i}`}
            </button>
          </>
        ) : (
          <button
            id={i}
            key={i}
            onClick={handleSwitchLayers}
          >{`layer ${i} not active`}</button>
        )
      )}
    </>
  );
};

export default Layers;
