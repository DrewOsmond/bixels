import { useNavigate } from "react-router";
// import { useSelector } from "react-redux";
import "./home.css";

// import familiarToolsSVG from "../../assets/familiarTools.svg";
// import colorAndOpacitySVG from "../../assets/color&opacity.svg";
// import librarySVG from "../../assets/library.svg";
// import layersSVG from "../../assets/layersHome.svg";
// import downloadSVG from "../../assets/download.svg";

import homePageSVG from "../../assets/feature-list.svg";
import landingpageSVG from "../../assets/landingpage-text-version2.svg";
import demoVideo from "../../assets/demo_video.mp4";
import goToLibrary from "../../assets/go-to-library.svg";
import getStarted from "../../assets/get-started.svg";

const Home = () => {
  const navigate = useNavigate();
  // const canvases = useSelector((state) => state.canvases);

  return (
    <div className="home-div">
      <div className="logo-container">
        <img className="logo" src={landingpageSVG} alt="banner" />
      </div>

      <img
        className="go-to-library"
        src={goToLibrary}
        alt="go to library"
        onClick={() => navigate("/library")}
      />

      <div className="title-button-div"></div>
      <div className="smaller-screen-container">
        <div className="smaller-screen-home">
          <img src={homePageSVG} alt="page descripton" />

          <div className="tutorial-text">oh, a tutorial video!</div>
          <video className="video-player" controls autoPlay={true} muted={true}>
            <source src={demoVideo} />
          </video>

          <img
            className="lets-get-started"
            src={getStarted}
            alt="lets get started"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
