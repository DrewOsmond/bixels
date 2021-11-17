const ToolSelector = ({ setTool }) => {
  return (
    <>
      <button onClick={() => setTool("draw")}>draw</button>
      <button onClick={() => setTool("erase")}>erase</button>
    </>
  );
};

export default ToolSelector;
