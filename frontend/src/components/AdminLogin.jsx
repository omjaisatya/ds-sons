import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../assets/stylesheet/AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (isAdmin) {
        navigate("/admin/dashboard");
      } else {
        setError("You are not authorized as an admin");
        auth.signOut();
      }
    } catch (err) {
      setError("Invalid email or password", err);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-box">
        <h2>Admin Login</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
