import { useState, useEffect } from "react";
import { Canvas } from "../../canvasClass";
import { useDispatch } from "react-redux";
import { updateCanvas } from "../../../../store/reducers/selectedCanvas";

// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
    // <Droppable droppableId="layers" type="LAYER" className="layer">
    <div
      className={`layer ${
        Number(i) === layer && canvas.canvas[layer].active
          ? "drawing__layer"
          : ""
      }`}
    >
      {/* {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cx(
              styles.dropper,
              snapshot.isDraggingOver && styles.dropOver
            )}
          >
            {provided.placeholder}
          </div>
        );
      }} */}
      <div
        className={
          canvas.canvas[layer].active ? "" : "not-active-canvas-container"
        }
      >
        <canvas
          className={`layer-canvas ${
            canvas.canvas[i].active ? "" : "not-active-canvas"
          }`}
          name={i}
          width="64"
          height="64"
          id={`${ele.name}-${i}`}
          onClick={handleSwitchLayers}
        />
      </div>
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
          {name}
        </div>
      )}
      <div
        className={`${Number(i) === layer ? "active__layer" : ""}`}
        name={i}
        key={`active-${i + 1}`}
        onClick={handleDrawOnLayer}
      >
        {i === layer ? `drawing` : `draw`}
      </div>
      <div name={i} onClick={deleteLayer}>{`del`}</div>
      {/* </Droppable> */}
    </div>
  );
};

export default Layer;
