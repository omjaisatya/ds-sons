// import { useState, useEffect } from "react";
// import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
// import { useAuth } from "../contexts/AuthContext";
// import { useChat } from "../contexts/ChatContext";
// import { db } from "../auth/firebase";

// const AdminChat = () => {
//   const { currentUser } = useAuth();
//   const { activeChat, setActiveChat, messages, sendMessage } = useChat();
//   const [newMessage, setNewMessage] = useState("");
//   const [userTyping, setUserTyping] = useState(false);
//   const [activeChats, setActiveChats] = useState([]);

//   // Load active chats
//   useEffect(() => {
//     const q = query(collection(db, "chats"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const chats = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setActiveChats(chats);
//     });
//     return unsubscribe;
//   }, []);

//   // Listen for user typing
//   useEffect(() => {
//     if (!activeChat) return;

//     const unsubscribe = onSnapshot(
//       doc(db, "typing", activeChat.userId),
//       (doc) => {
//         if (doc.exists()) {
//           setUserTyping(doc.data().isTyping);
//         }
//       }
//     );
//     return unsubscribe;
//   }, [activeChat]);

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (newMessage.trim()) {
//       await sendMessage(newMessage, "admin");
//       setNewMessage("");
//     }
//   };

//   return (
//     <div className="admin-chat">
//       <div className="chat-list">
//         {activeChats.map((chat) => (
//           <div
//             key={chat.id}
//             className={`chat-item ${
//               activeChat?.id === chat.id ? "active" : ""
//             }`}
//             onClick={() => setActiveChat(chat)}
//           >
//             <h4>User: {chat.userId}</h4>
//             <p>Last message: {chat.lastMessage}</p>
//           </div>
//         ))}
//       </div>
//       <div className="chat-window">
//         {activeChat && (
//           <>
//             <div className="messages">
//               {messages.map((msg) => (
//                 <div key={msg.id} className={`message ${msg.sender}`}>
//                   <p>{msg.content}</p>
//                   <span>{msg.timestamp?.toDate().toLocaleTimeString()}</span>
//                 </div>
//               ))}
//               {userTyping && (
//                 <div className="typing-indicator">User is typing...</div>
//               )}
//             </div>
//             <form onSubmit={handleSend}>
//               <input
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder="Type your response..."
//               />
//               <button type="submit">Send</button>
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

import { useState, useEffect } from "react";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { useChat } from "../contexts/ChatContext";
import { db } from "../auth/firebase";

const AdminChat = () => {
  const { currentUser } = useAuth();
  const { activeChat, setActiveChat, messages, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState("");
  const [userTyping, setUserTyping] = useState(false);
  const [activeChats, setActiveChats] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "chats"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setActiveChats(chats);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!activeChat) return;

    const unsubscribe = onSnapshot(
      doc(db, "typing", activeChat.userId),
      (doc) => {
        if (doc.exists()) {
          setUserTyping(doc.data().isTyping);
        }
      }
    );
    return unsubscribe;
  }, [activeChat]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await sendMessage(newMessage, "admin");
      setNewMessage("");
    }
  };

  return (
    <div className="admin-chat">
      <div className="chat-list">
        {activeChats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-item ${
              activeChat?.id === chat.id ? "active" : ""
            }`}
            onClick={() => setActiveChat(chat)}
          >
            <h4>User: {chat.userId}</h4>
            <p>Last message: {chat.lastMessage}</p>
          </div>
        ))}
      </div>
      <div className="chat-window">
        {activeChat && (
          <>
            <div className="messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.sender}`}>
                  <p>{msg.content}</p>
                  <span>{msg.timestamp?.toDate().toLocaleTimeString()}</span>
                </div>
              ))}
              {userTyping && (
                <div className="typing-indicator">User is typing...</div>
              )}
            </div>
            <form onSubmit={handleSend}>
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your response..."
              />
              <button type="submit">Send</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
