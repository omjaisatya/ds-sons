import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        <h2>Welcome, {user.email}</h2>
        <h2>{user.displayName}</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default HomePage;
