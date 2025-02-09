// import { createContext, useContext, useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { db } from "../auth/firebase";
// import {
//   collection,
//   doc,
//   setDoc,
//   onSnapshot,
//   serverTimestamp,
// } from "firebase/firestore";

// const ChatContext = createContext();

// export const ChatProvider = ({ children }) => {
//   const [activeChat, setActiveChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [typingStatus, setTypingStatus] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);

//   // Listen for messages
//   useEffect(() => {
//     if (!activeChat) return;

//     const unsubscribe = onSnapshot(
//       collection(db, "chats", activeChat.id, "messages"),
//       (snapshot) => {
//         const newMessages = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setMessages(newMessages);
//       }
//     );

//     return unsubscribe;
//   }, [activeChat]);

//   // Send message
//   const sendMessage = async (content, sender) => {
//     await setDoc(doc(collection(db, `chats/${activeChat.id}/messages`)), {
//       content,
//       sender,
//       timestamp: serverTimestamp(),
//       read: false,
//     });
//   };

//   // Update typing status
//   const updateTypingStatus = async (isTyping) => {
//     await setDoc(doc(db, "typing", currentUser.uid), {
//       isTyping,
//       timestamp: serverTimestamp(),
//     });
//   };

//   return (
//     <ChatContext.Provider
//       value={{
//         activeChat,
//         messages,
//         sendMessage,
//         typingStatus,
//         updateTypingStatus,
//         unreadCount,
//         setActiveChat,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };

// ChatProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
// export const useChat = () => useContext(ChatContext);
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { db } from "../auth/firebase";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { debounce } from "lodash";
import { useAuth } from "../contexts/AuthContext";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (!activeChat) return;

    const unsubscribe = onSnapshot(
      collection(db, "chats", activeChat.id, "messages"),
      (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(newMessages);
      }
    );

    return unsubscribe;
  }, [activeChat]);

  const sendMessage = async (content) => {
    if (!activeChat) return;

    await setDoc(doc(collection(db, `chats/${activeChat.id}/messages`)), {
      content,
      sender: currentUser.role, // 'admin' or 'user'
      timestamp: serverTimestamp(),
      read: false,
    });
  };

  const updateTypingStatus = async (isTyping, userId) => {
    if (!userId) return;
    await setDoc(doc(db, "typing", userId), {
      isTyping,
      timestamp: serverTimestamp(),
    });
  };

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <ChatContext.Provider
      value={{
        activeChat,
        setActiveChat,
        messages,
        sendMessage,
        unreadCount,
        isChatOpen,
        toggleChat,
        updateTypingStatus,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useChat = () => useContext(ChatContext);
