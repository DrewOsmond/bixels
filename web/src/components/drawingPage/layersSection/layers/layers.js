import { useState } from "react";

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
  const [name, setName] = useState(ele.name);
  const [change, setChange] = useState(false);

  const handleChangeName = (e) => {
    const layerNameToChange = Number(e.target.name);
    canvas[layerNameToChange].name = name;
    localStorage.setItem("canvas", JSON.stringify(canvas));
    setCanvas((prev) => [...prev]);
    setChange(false);
  };

  return (
    <>
      {ele.active ? (
        <>
          <button
            className={`layer__button ${
              Number(i) === layer ? "active__layer" : ""
            }`}
            name={i}
            onClick={handleSwitchLayers}
          >{`${ele.name} active`}</button>
          <button name={i} key={`active-${i + 1}`} onClick={handleDrawOnLayer}>
            {i === layer
              ? `drawing on ${ele.name}`
              : `draw on layer ${ele.name}`}
          </button>
          <button name={i} onClick={deleteLayer}>{`delete ${ele.name}`}</button>
          {change ? (
            <>
              <input
                name={i}
                value={name}
                onChange={(e) => {
                  console.log(canvas[Number(e.target.name)]);
                  setName(e.target.value);
                }}
              />
              <button onClick={handleChangeName}>finish</button>
            </>
          ) : (
            <button onClick={() => setChange(true)}>change name</button>
          )}
        </>
      ) : (
        <button
          name={i}
          onClick={handleSwitchLayers}
        >{`${ele.name} not active`}</button>
      )}
    </>
  );
};

export default Layer;
