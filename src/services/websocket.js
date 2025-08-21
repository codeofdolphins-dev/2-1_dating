// services/websocket.js
import { io } from "socket.io-client";

function createWebSocketService() {
  let socket = null;
  let isConnected = false;

  // Initialize connection with JWT token
  const connect = (token) => {
    socket = io("http://46.202.189.73:88", {
      auth: { token },
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      isConnected = true;
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
      isConnected = false;
    });

    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });

    setupEventListeners();
  };

  const setupEventListeners = () => {
    if (!socket) return;

    // Real-time notifications
    socket.on("notification", (notification) => {
      console.log("New notification:", notification);
    });

    // Personal messaging
    socket.on("new_personal_message", (message) => {
      console.log("New personal message:", message);
    });

    socket.on("message_sent", (message) => {
      console.log("Message sent confirmation:", message);
    });

    socket.on("message_read", (data) => {
      console.log("Message read:", data);
    });

    // Typing indicators
    socket.on("user_typing", (data) => {
      console.log("User typing:", data);
    });

    // Friend status
    socket.on("friend_status_change", (data) => {
      console.log("Friend status change:", data);
    });

    // Chat room
    socket.on("new_room_message", (message) => {
      console.log("New room message:", message);
    });

    socket.on("user_joined_room", (data) => {
      console.log("User joined room:", data);
    });

    socket.on("user_left_room", (data) => {
      console.log("User left room:", data);
    });

    // Conversation
    socket.on("user_joined_conversation", (data) => {
      console.log("User joined conversation:", data);
    });

    socket.on("user_left_conversation", (data) => {
      console.log("User left conversation:", data);
    });

    // Errors
    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    socket.on("message_error", (error) => {
      console.error("Message error:", error);
    });
  };

  // === Personal Messaging Methods ===
  const joinConversation = (otherUserId) => {
    console.log(otherUserId)
    socket?.emit("join_conversation", { otherUserId });
  };

  const leaveConversation = (otherUserId) => {
    socket?.emit("leave_conversation", { otherUserId });
  };

  const sendPersonalMessage = (
    receiverId,
    content,
    messageType = "text",
    mediaUrl = null,
    replyTo = null
  ) => {
    socket?.emit("send_personal_message", {
      receiverId,
      content,
      messageType,
      mediaUrl,
      replyTo,
    });
  };

  const startTyping = (otherUserId) => {
    socket?.emit("typing_start", { otherUserId });
  };

  const stopTyping = (otherUserId) => {
    socket?.emit("typing_stop", { otherUserId });
  };

  const markMessageAsRead = (messageId, otherUserId) => {
    socket?.emit("message_read", { messageId, otherUserId });
  };

  // === Chat Room Methods ===
  const joinChatroom = (roomId) => {
    socket?.emit("join_chatroom", { roomId });
  };

  const leaveChatroom = (roomId) => {
    socket?.emit("leave_chatroom", { roomId });
  };

  const sendRoomMessage = (
    roomId,
    content,
    messageType = "text",
    mediaUrl = null
  ) => {
    socket?.emit("send_room_message", {
      roomId,
      content,
      messageType,
      mediaUrl,
    });
  };

  // === Disconnect ===
  const disconnect = () => {
    if (socket) {
      socket.disconnect();
      socket = null;
      isConnected = false;
    }
  };

  return {
    connect,
    joinConversation,
    leaveConversation,
    sendPersonalMessage,
    startTyping,
    stopTyping,
    markMessageAsRead,
    joinChatroom,
    leaveChatroom,
    sendRoomMessage,
    disconnect,
    get isConnected() {
      return isConnected;
    },
  };
}

// Export a singleton instance (like class version)
const WebSocketService = createWebSocketService();
export default WebSocketService;
