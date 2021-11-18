import "./opacitySlider.css";

const OpacitySlider = ({ setOpacity, opacity, color }) => {
  return (
    <>
      {" "}
      <input
        className="slider"
        style={{ color: color }}
        type="range"
        min={0}
        max={10}
        onChange={(e) => setOpacity(e.target.value)}
      />{" "}
      <div>{opacity / 10}</div>
    </>
  );
};

export default OpacitySlider;
