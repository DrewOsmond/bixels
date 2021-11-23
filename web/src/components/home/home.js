import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import "./home.css";

import familiarToolsSVG from "../../assets/familiarTools.svg";
import colorAndOpacitySVG from "../../assets/color&opacity.svg";
import librarySVG from "../../assets/library.svg";
import layersSVG from "../../assets/layersHome.svg";
import downloadSVG from "../../assets/download.svg";

const Home = () => {
  const navigate = useNavigate();
  const canvases = useSelector((state) => state.canvases);

  return (
    <div className="home-div">
      <div>
        <p className="title">bixels</p>
        <p className="title-description">simply create.</p>
        <p className="title-description-next-line"> pixel art</p>
      </div>
      <div className="title-button-div">
        {/* <button className="title-button" onClick={() => navigate("/library")}>
          let's get started!
        </button> */}
        {/* <button
          class="title-button"
          onClick={() => navigate(`/profile/${fakeUser.username}`)}
        >
          profile
        </button> */}
      </div>
      <div className="smaller-screen-container">
        <div className="smaller-screen-home">
          <img
            className="familiar-tools-home"
            src={familiarToolsSVG}
            alt="familiar tools"
          />

          <img
            className="color-and-opacity-home"
            src={colorAndOpacitySVG}
            alt="with color and opacity adjustments"
          />
          <img
            className="library-home"
            src={librarySVG}
            alt="a place to save your art"
          />
          <img
            className="with-layers-home"
            src={layersSVG}
            alt="draw on a canvas with multiple layers"
          />
          <img
            className="download-home"
            src={downloadSVG}
            alt="download your images"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
