import { useNavigate, useParams } from "react-router";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useParams();
  const userz = {
    name: "balls",
    description: "tehehehehehehe",
    email: "peepeepoopoo@ligma.com",
  };

  return (
    <>
      <button onClick={() => navigate("/")}>back</button>
      <div>
        <div>{user.name}</div>
        <div>{userz.description}</div>
      </div>

      <div>{userz.email}</div>

      <div>change password??? Maybeee</div>
      <br />
      <br />
      <button onClick={() => navigate("/user/settings")}>settings</button>
    </>
  );
};

export default Profile;
