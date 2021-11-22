import "./opacitySlider.css";

const OpacitySlider = ({ setOpacity, opacity }) => {
  return (
    <div className="slider">
      {/* <div>{opacity / 10}</div> */}
      <input
        id="test"
        type="range"
        min={0}
        max={10}
        value={opacity}
        onChange={(e) => setOpacity(e.target.value)}
      />
    </div>
  );
};

export default OpacitySlider;
