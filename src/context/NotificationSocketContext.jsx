// contexts/NotificationSocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "./AuthContext";

const NotificationSocketContext = createContext();
export const useNotificationSocket = () => useContext(NotificationSocketContext);

export function NotificationSocketProvider({ children }) {
  const { token } = useAuth();
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!token) return;

    const notifSocket = io("ws://localhost:5000/notifications", { auth: { token } });
    setSocket(notifSocket);

    notifSocket.on("new_notification", (notif) => {
      setNotifications((prev) => [...prev, notif]);
    });

    return () => {
      notifSocket.disconnect();
    };
  }, [token]);

  return (
    <NotificationSocketContext.Provider value={{ socket, notifications }}>
      {children}
    </NotificationSocketContext.Provider>
  );
}
