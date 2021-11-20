import { useNavigate, useParams } from "react-router";
import "./profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useParams();

  const userz = {
    name: "balls",
    description: "tehehehehehehe",
    email: "peepeepoopoo@ligma.com",
    img: "https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256__480.jpg",
  };

  return (
    <>
      <button onClick={() => navigate("/")}>back</button>
      <div className="username-bio-section">
        <div>{user}</div>
        <div>{userz.description}</div>
      </div>

      {/* <div className="profile-picture">
        <img src={userz.img} alt="users profile" />
      </div> */}

      <div>{userz.email}</div>

      <br />
      <br />
      <button onClick={() => navigate("/user/settings")}>settings</button>
    </>
  );
};

export default Profile;
