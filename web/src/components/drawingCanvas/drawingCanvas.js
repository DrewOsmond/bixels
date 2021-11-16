import html2canvas from "html2canvas";
import "./canvas.css";

const DrawingCanvas = () => {
  const saveImg = async () => {
    const canvas = await html2canvas(document.getElementById("canvas"));
    // document.body.appendChild(canvas);
    const img = document.createElement("a");
    img.download = "img.png";
    img.href = canvas.toDataURL();
    img.click();
  };
  return (
    <>
      <button onClick={saveImg}>take screen shot</button>
      <div id="canvas">
        <div className="green"></div>
        <div className="blue"></div>
      </div>
    </>
  );
};

export default DrawingCanvas;
