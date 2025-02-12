import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { db } from "../config/firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

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

    return () => unsubscribe();
  }, [activeChat]);

  const sendMessage = async (content) => {
    if (!activeChat || !currentUser) return;

    try {
      await addDoc(collection(db, "chats", activeChat.id, "messages"), {
        content,
        sender: currentUser.role, // 'admin' or 'user'
        timestamp: serverTimestamp(),
        read: false,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const updateTypingStatus = async (isTyping) => {
    if (!currentUser) return;

    try {
      await setDoc(
        doc(db, "typing", currentUser.uid),
        {
          isTyping,
          timestamp: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error updating typing status:", error);
    }
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
