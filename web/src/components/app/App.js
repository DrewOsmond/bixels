import { Routes, Route } from "react-router-dom";

import DrawingPage from "../drawingPage/drawingPage";
import CanvasLibrary from "../canvasLibrary/canvasLibrary";

function App() {
  return (
    <Routes>
      <Route path="/draw" element={<DrawingPage />} />
      <Route path="/library" element={<CanvasLibrary />} />
    </Routes>
  );
}

export default App;
