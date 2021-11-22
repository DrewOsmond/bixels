import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const canvases = useSelector((state) => state.canvases);

  const fakeUser = {
    username: "wee",
  };

  return (
    <div class="home-div">
      <div>
        <p class="title">bixels</p>
        <p class="title-description">simply create.</p>
      </div>
      <div class="title-button-div">
        <button
          class="title-button"
          onClick={() => navigate(canvases.length > 1 ? "/library" : "/draw")}
        >
          let's get started!
        </button>
        <button
          class="title-button"
          onClick={() => navigate(`/profile/${fakeUser.username}`)}
        >
          profile
        </button>
      </div>
    </div>
  );
};

export default Home;
