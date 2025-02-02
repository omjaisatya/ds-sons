import { useState } from "react";
import { createAdminUser } from "../auth/firebase";

const AdminCreation = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      const successMessage = await createAdminUser(email, password);
      setMessage(successMessage);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="admin-creation">
      <h3>Create New Admin</h3>
      <form onSubmit={handleCreateAdmin}>
        <input
          type="email"
          placeholder="New admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Temporary password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Create Admin</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminCreation;
