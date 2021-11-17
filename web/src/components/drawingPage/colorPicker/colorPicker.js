const ColorPicker = ({ setColor }) => {
  return (
    <>
      <button onClick={() => setColor("green")}>green</button>
      <button onClick={() => setColor("red")}>red</button>
      <button onClick={() => setColor("blue")}>blue</button>
    </>
  );
};

export default ColorPicker;
