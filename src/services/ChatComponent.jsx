import React, { useState } from "react";
import useWebSocket from "../services/websocket";

const ChatComponent = () => {
    const token = sessionStorage.getItem("jwtToken")
    console.log(token)
  const {
    isConnected,
    sendPersonalMessage,
    startTyping,
    stopTyping,
  } = useWebSocket(token);

  const [message, setMessage] = useState("");

  const handleSend = () => {
    sendPersonalMessage("receiverUserId123", message);
    setMessage("");
  };

  return (
    <div>
      <h3>WebSocket Status: {isConnected ? "🟢 Connected" : "🔴 Disconnected"}</h3>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onFocus={() => startTyping("receiverUserId123")}
        onBlur={() => stopTyping("receiverUserId123")}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatComponent;
