// import { useState, useEffect } from "react";
// import { doc, setDoc, onSnapshot, collection } from "firebase/firestore";
// import { useAuth } from "../contexts/AuthContext";
// import { useChat } from "../contexts/ChatContext";
// import { db } from "../auth/firebase";

// const CustomerChat = () => {
//   const { currentUser } = useAuth();
//   const { messages, sendMessage, updateTypingStatus } = useChat();
//   const [newMessage, setNewMessage] = useState("");
//   const [adminTyping, setAdminTyping] = useState(false);

//   // Initialize or get existing chat
//   useEffect(() => {
//     const initializeChat = async () => {
//       const chatRef = doc(collection(db, "chats"));
//       await setDoc(chatRef, {
//         userId: currentUser.uid,
//         createdAt: serverTimestamp(),
//         updatedAt: serverTimestamp(),
//       });
//     };
//     initializeChat();
//   }, [currentUser]);

//   // Listen for admin typing
//   useEffect(() => {
//     const unsubscribe = onSnapshot(doc(db, "typing", "admin"), (doc) => {
//       if (doc.exists()) {
//         setAdminTyping(doc.data().isTyping);
//       }
//     });
//     return unsubscribe;
//   }, []);

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (newMessage.trim()) {
//       await sendMessage(newMessage, "user");
//       setNewMessage("");
//       await updateTypingStatus(false);
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="messages">
//         {messages.map((msg) => (
//           <div key={msg.id} className={`message ${msg.sender}`}>
//             <p>{msg.content}</p>
//             <span>{msg.timestamp?.toDate().toLocaleTimeString()}</span>
//           </div>
//         ))}
//         {adminTyping && (
//           <div className="typing-indicator">Admin is typing...</div>
//         )}
//       </div>
//       <form onSubmit={handleSend}>
//         <input
//           value={newMessage}
//           onChange={(e) => {
//             setNewMessage(e.target.value);
//             updateTypingStatus(true);
//           }}
//           onBlur={() => updateTypingStatus(false)}
//           placeholder="Type your message..."
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default CustomerChat;

import { useState, useEffect } from "react";
import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { useChat } from "../contexts/ChatContext";
import { db } from "../auth/firebase";
import { debounce } from "lodash";

const CustomerChat = () => {
  const { currentUser } = useAuth();
  const { messages, sendMessage, updateTypingStatus } = useChat();
  const [newMessage, setNewMessage] = useState("");
  const [adminTyping, setAdminTyping] = useState(false);

  useEffect(() => {
    const initializeChat = async () => {
      const chatRef = doc(collection(db, "chats"));
      await setDoc(chatRef, {
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    };
    initializeChat();
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "typing", "admin"), (doc) => {
      if (doc.exists()) {
        setAdminTyping(doc.data().isTyping);
      }
    });
    return unsubscribe;
  }, []);

  const debouncedTypingUpdate = debounce((typing) => {
    updateTypingStatus(typing);
  }, 500);

  const handleSend = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await sendMessage(newMessage, "user");
      setNewMessage("");
      await updateTypingStatus(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <p>{msg.content}</p>
            <span>{msg.timestamp?.toDate().toLocaleTimeString()}</span>
          </div>
        ))}
        {adminTyping && (
          <div className="typing-indicator">Admin is typing...</div>
        )}
      </div>
      <form onSubmit={handleSend}>
        <input
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            debouncedTypingUpdate(true);
          }}
          onBlur={() => updateTypingStatus(false)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default CustomerChat;
