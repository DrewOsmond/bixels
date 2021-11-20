import { useNavigate } from "react-router";

const Settings = () => {
  const user = {
    name: "ligma",
    img: "https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256__480.jpg",
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
