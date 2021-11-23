import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const canvases = useSelector((state) => state.canvases);

  return (
    <div className="home-div">
      <div>
        <p className="title">bixels</p>
        <p className="title-description">simply create.</p>
      </div>
      <div className="title-button-div">
        <button
          className="title-button"
          onClick={() => navigate(canvases.length > 1 ? "/library" : "/draw")}
        >
          let's get started!
        </button>
        {/* <button
          class="title-button"
          onClick={() => navigate(`/profile/${fakeUser.username}`)}
        >
          profile
        </button> */}
      </div>
    </div>
  );
};

export default Home;
