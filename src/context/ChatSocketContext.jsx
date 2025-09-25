// // contexts/ChatSocketContext.jsx
// import React, { createContext, useContext, useEffect, useState } from "react";
// import io from "socket.io-client";
// import { useAuth } from "../context/AuthContextAPI";

// const ChatSocketContext = createContext();
// export const useChatSocket = () => useContext(ChatSocketContext);

// export function ChatSocketProvider({ children }) {
//   const { token } = useAuth();
//   const [socket, setSocket] = useState(null);
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     if (!token) return;

//     const chatSocket = io(`${import.meta.env.VITE_BASE_URL}/chat`, { auth: { token } });
//     setSocket(chatSocket);

//     chatSocket.on("new_personal_message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       chatSocket.disconnect();
//     };
//   }, [token]);

//   const sendMessage = (receiverId, content) => {
//     socket?.emit("send_personal_message", { receiverId, content });
//   };

//   return (
//     <ChatSocketContext.Provider value={{ socket, messages, sendMessage }}>
//       {children}
//     </ChatSocketContext.Provider>
//   );
// }






// contexts/ChatSocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "../context/AuthContextAPI";

const ChatSocketContext = createContext();
export const useChatSocket = () => useContext(ChatSocketContext);

export function ChatSocketProvider({ children }) {
  const { token } = useAuth();
  const [socket, setSocket] = useState(null);

  // store separately for clarity
  const [personalMessages, setPersonalMessages] = useState([]);
  const [groupMessages, setGroupMessages] = useState([]);

  useEffect(() => {
    if (!token) return;

    // ✅ Connect to default namespace
    const chatSocket = io(import.meta.env.VITE_BASE_URL, {
      auth: { token },
      transports: ["websocket"], // enforce websocket
    });

    setSocket(chatSocket);

    // Personal messages
    chatSocket.on("new_personal_message", (msg) => {
      console.log("📩 Personal:", msg);
      setPersonalMessages((prev) => [...prev, msg]);
    });

    // Group messages
    chatSocket.on("new_group_message", (msg) => {
      console.log("👥 Group:", msg);
      setGroupMessages((prev) => [...prev, msg]);
    });

    return () => {
      chatSocket.disconnect();
    };
  }, [token]);

  // === Senders ===
  const sendPersonalMessage = (receiverId, content) => {
    socket?.emit("send_personal_message", { receiverId, content });
  };

  const sendGroupMessage = (groupId, content) => {
    socket?.emit("send_group_message", { groupId, content });
  };

  return (
    <ChatSocketContext.Provider
      value={{
        socket,
        personalMessages,
        groupMessages,
        sendPersonalMessage,
        sendGroupMessage,
      }}
    >
      {children}
    </ChatSocketContext.Provider>
  );
}
