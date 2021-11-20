import { useNavigate } from "react-router";

const Settings = () => {
  const user = {
    name: "ligma",
  };
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate(`/profile/${user.name}`)}>back</button>
      <div>change password</div>
    </>
  );
};

export default Settings;
