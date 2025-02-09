import { useState } from "react";
import { FaComment, FaTimes } from "react-icons/fa";
import AdminChat from "./AdminChat";
import CustomerChat from "./CustomerChat";
import { useAuth } from "../contexts/AuthContext";
import "../assets/stylesheet/chat/ChatIcon.css";

const ChatIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, isAdmin } = useAuth();

  if (!currentUser) return null;

  return (
    <div className="chat-icon-container">
      <button className="chat-icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaComment />}
      </button>

      {isOpen && (
        <div className="chat-window">
          {isAdmin ? <AdminChat /> : <CustomerChat />}
        </div>
      )}
    </div>
  );
};

export default ChatIcon;
