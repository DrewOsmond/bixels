import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const canvases = useSelector((state) => state.canvases);

  const fakeUser = {
    username: "ligma",
  };

  return (
    <>
      <button
        onClick={() => navigate(canvases.length > 1 ? "/library" : "/draw")}
      >
        go draw :D
      </button>
      <button onClick={() => navigate(`/profile/${fakeUser.username}`)}>
        profile
      </button>
    </>
  );
};

export default Home;
