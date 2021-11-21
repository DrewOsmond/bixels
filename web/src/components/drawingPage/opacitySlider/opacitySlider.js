import "./opacitySlider.css";

const OpacitySlider = ({ setOpacity, opacity, color }) => {
  return (
    <>
      {" "}
      <input
        className="slider"
        type="range"
        min={0}
        max={10}
        value={opacity}
        onChange={(e) => setOpacity(e.target.value)}
      />{" "}
      <div>{opacity / 10}</div>
    </>
  );
};

export default OpacitySlider;
