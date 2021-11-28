import useAuth from "../../../hooks/useAuth";

const UserInfo = () => {
  const { userInfo } = useAuth();
  return (
    <div>
      <h2>User Name:{userInfo?.userName}</h2>
      <h3>User Email: {userInfo?.userEmail}</h3>
      <h3>Role: {userInfo?.role === "Admin" ? "Admin" : "Normal User"}</h3>
    </div>
  );
};

export default UserInfo;
