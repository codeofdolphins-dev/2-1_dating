// contexts/ChatSocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "../context/AuthContextAPI";

const ChatSocketContext = createContext();
export const useChatSocket = () => useContext(ChatSocketContext);

export function ChatSocketProvider({ children }) {
  const { token } = useAuth();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!token) return;

    const chatSocket = io("ws://localhost:5000/chat", { auth: { token } });
    setSocket(chatSocket);

    chatSocket.on("new_personal_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      chatSocket.disconnect();
    };
  }, [token]);

  const sendMessage = (receiverId, content) => {
    socket?.emit("send_personal_message", { receiverId, content });
  };

  return (
    <ChatSocketContext.Provider value={{ socket, messages, sendMessage }}>
      {children}
    </ChatSocketContext.Provider>
  );
}
