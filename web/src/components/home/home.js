import { useNavigate } from "react-router";
import "./home.css";

import homePageSVG from "../../assets/feature-list.svg";
import landingpageSVG from "../../assets/landingpage-text-version2.svg";
import demoVideo from "../../assets/demo_video.mp4";
import goToLibrary from "../../assets/go-to-library.svg";
import getStarted from "../../assets/get-started.svg";
import drew from "../../assets/drew.svg";
import flora from "../../assets/flora.svg";
import CreatorProfile from "./creatorProfile/creatoreProfile";

const Home = () => {
  const navigate = useNavigate();

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
            onClick={() => navigate("/library")}
          />
          <div className="intro-text">hi hi hi! we made bixels.</div>
          <div className="meet-the-team">
            <CreatorProfile
              person={drew}
              name={"drew osmond"}
              title="fullstack developer"
              links={[
                "https://github.com/DrewOsmond",
                "https://twitter.com/DrewOsmond",
                "https://www.linkedin.com/in/drewosmond/",
              ]}
            />
            <CreatorProfile
              person={flora}
              name={"flora teng"}
              title={"ui/ux designer"}
              links={[
                "https://github.com/itzflowa",
                "https://twitter.com/itzflowa",
                "https://www.linkedin.com/in/itzflowa/",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
