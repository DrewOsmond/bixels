import { Routes, Route } from "react-router-dom";

// import Settings from "../settings/settings";
// import Profile from "../profile/profile";
import DrawingPage from "../drawingPage/drawingPage";
import CanvasLibrary from "../canvasLibrary/canvasLibrary";
import Home from "../home/home";

function App() {
  return (
    <Routes>
      {/* <Route path="/profile/:user" element={<Profile />} exact />
      <Route path="/user/settings" element={<Settings />} exact /> */}
      <Route path="/draw" element={<DrawingPage />} exact />
      <Route path="/library" element={<CanvasLibrary />} exact />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
