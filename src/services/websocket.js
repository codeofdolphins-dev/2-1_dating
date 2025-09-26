// // services/websocket.js
// import { io } from "socket.io-client";

// function createWebSocketService() {
//   let socket = null;
//   let isConnected = false;

//   // Initialize connection with JWT token
//   const connect = (token) => {
//     socket = io(import.meta.env.VITE_BASE_URL, {
//       auth: { token },
//       transports: ["websocket", "polling"],
//     });

//     socket.on("connect", () => {
//       console.log("Connected to WebSocket server");
//       isConnected = true;
//     });

//     socket.on("disconnect", () => {
//       console.log("Disconnected from WebSocket server");
//       isConnected = false;
//     });

//     socket.on("connect_error", (error) => {
//       console.error("WebSocket connection error:", error);
//     });

//     setupEventListeners();
//   };

//   const setupEventListeners = () => {
//     if (!socket) return;

//     // Real-time notifications
//     socket.on("notification", (notification) => {
//       console.log("New notification:", notification);
//     });

//     // Personal messaging
//     socket.on("new_personal_message", (message) => {
//       console.log("New personal message:", message);
//     });

//     socket.on("message_sent", (message) => {
//       console.log("Message sent confirmation:", message);
//     });

//     socket.on("message_read", (data) => {
//       console.log("Message read:", data);
//     });

//     // Typing indicators
//     socket.on("user_typing", (data) => {
//       console.log("User typing:", data);
//     });

//     // Friend status
//     socket.on("friend_status_change", (data) => {
//       console.log("Friend status change:", data);
//     });

//     // Chat room
//     socket.on("new_room_message", (message) => {
//       console.log("New room message:", message);
//     });

//     socket.on("user_joined_room", (data) => {
//       console.log("User joined room:", data);
//     });

//     socket.on("user_left_room", (data) => {
//       console.log("User left room:", data);
//     });

//     // Conversation
//     socket.on("user_joined_conversation", (data) => {
//       console.log("User joined conversation:", data);
//     });

//     socket.on("user_left_conversation", (data) => {
//       console.log("User left conversation:", data);
//     });


//     // Errors
//     socket.on("error", (error) => {
//       console.error("Socket error:", error);
//     });

//     socket.on("message_error", (error) => {
//       console.error("Message error:", error);
//     });
//   };

//   // === Personal Messaging Methods ===
//   const joinConversation = (otherUserId) => {
//     console.log(otherUserId)
//     socket?.emit("join_conversation", { otherUserId });
//   };

//   const leaveConversation = (otherUserId) => {
//     socket?.emit("leave_conversation", { otherUserId });
//   };

//   const sendPersonalMessage = (
//     receiverId,
//     content,
//     messageType = "text",
//     mediaUrl = null,
//     replyTo = null
//   ) => {
//     socket?.emit("send_personal_message", {
//       receiverId,
//       content,
//       messageType,
//       mediaUrl,
//       replyTo,
//     });
//   };

//   const startTyping = (otherUserId) => {
//     socket?.emit("typing_start", { otherUserId });
//   };

//   const stopTyping = (otherUserId) => {
//     socket?.emit("typing_stop", { otherUserId });
//   };

//   const markMessageAsRead = (messageId, otherUserId) => {
//     socket?.emit("message_read", { messageId, otherUserId });
//   };

//   // === Chat Room Methods ===
//   const joinChatroom = (roomId) => {
//     socket?.emit("join_chatroom", { roomId });
//   };

//   const leaveChatroom = (roomId) => {
//     socket?.emit("leave_chatroom", { roomId });
//   };

//   const sendRoomMessage = (
//     roomId,
//     content,
//     messageType = "text",
//     mediaUrl = null
//   ) => {
//     socket?.emit("send_room_message", {
//       roomId,
//       content,
//       messageType,
//       mediaUrl,
//     });
//   };

//   // === Disconnect ===
//   const disconnect = () => {
//     if (socket) {
//       socket.disconnect();
//       socket = null;
//       isConnected = false;
//     }
//   };


//   //Group Messaging


//   return {
//     connect,
//     joinConversation,
//     leaveConversation,
//     sendPersonalMessage,
//     startTyping,
//     stopTyping,
//     markMessageAsRead,
//     joinChatroom,
//     leaveChatroom,
//     sendRoomMessage,
//     disconnect,
//     get isConnected() {
//       return isConnected;
//     },
//     get socket() {
//       return socket;
//     }
//   };
// }

// // Export a singleton instance (like class version)
// const WebSocketService = createWebSocketService();
// export default WebSocketService;






// services/websocket.js
// services/websocketService.js

import { io } from "socket.io-client";

function createWebSocketService() {
  let socket = null;
  let isConnected = false;
  let listenersAttached = false; // ✅ Track if listeners are already attached

  /** 🔹 Connect to server with JWT token */
  const connect = (token) => {
    if (socket?.connected) return socket;

    socket = io(import.meta.env.VITE_BASE_URL || "http://localhost:5000", {
      auth: { token },
      transports: ["websocket", "polling"],
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      timeout: 20000,
    });

    // Only attach listeners once
    if (!listenersAttached) {
      setupConnectionHandlers();
      setupGroupListeners();
      listenersAttached = true;
    }

    return socket;
  };

  /** 🔹 Handle connection lifecycle */
  const setupConnectionHandlers = () => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket server");
      isConnected = true;
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Disconnected:", reason);
      isConnected = false;
    });

    socket.on("connect_error", (error) => {
      console.error("⚠️ WebSocket error:", error);
      isConnected = false;
    });
  };

  /** 🔹 Group event listeners */
  const setupGroupListeners = () => {
    if (!socket) return;

    // Remove all previous listeners to prevent duplicates
    socket.off("new_group_message");
    socket.off("group_joined");
    socket.off("group_left");
    socket.off("group_typing_start");
    socket.off("group_typing_stop");
    socket.off("group_user_active");
    socket.off("group_user_inactive");
    socket.off("group_message_mention");

    socket.on("new_group_message", (data) => console.log("New group message:", data));
    socket.on("group_joined", (data) => console.log("Joined group:", data));
    socket.on("group_left", (data) => console.log("Left group:", data));
    socket.on("group_typing_start", (data) => console.log("User typing in group:", data));
    socket.on("group_typing_stop", (data) => console.log("User stopped typing in group:", data));
    socket.on("group_user_active", (data) => console.log("User active in group:", data));
    socket.on("group_user_inactive", (data) => console.log("User inactive in group:", data));
    socket.on("group_message_mention", (data) => console.log("Mentioned in group message:", data));
  };

  /** 🔹 Disconnect */
  const disconnect = () => {
    if (socket) {
      socket.disconnect();
      socket = null;
      isConnected = false;
      listenersAttached = false; // reset so listeners can be attached next time
    }
  };

  /** 🔹 Get socket instance */
  const getSocket = () => socket;

  /** 🔹 Check connection status */
  const isSocketConnected = () => isConnected && socket?.connected;

  /** 🔹 Join/leave conversation */
  const joinConversation = (otherUserId) => {
    if (isSocketConnected()) socket.emit("join_conversation", { otherUserId });
  };

  const leaveConversation = (otherUserId) => {
    if (isSocketConnected()) socket.emit("leave_conversation", { otherUserId });
  };

  /** 🔹 Join/leave chatroom */
  const joinChatroom = (roomId) => {
    if (isSocketConnected()) socket.emit("join_chatroom", { roomId });
  };

  const leaveChatroom = (roomId) => {
    if (isSocketConnected()) socket.emit("leave_chatroom", { roomId });
  };

  /** 🔹 Personal messaging */
  const sendPersonalMessage = (receiverId, messageData) => {
    if (isSocketConnected()) {
      socket.emit("send_personal_message", {
        receiverId,
        messageType: messageData.type || "text",
        content: messageData.content,
        mediaUrl: messageData.mediaUrl,
        replyTo: messageData.replyTo,
        fileName: messageData.fileName,
        fileSize: messageData.fileSize,
      });
    }
  };

  /** 🔹 Room messaging */
  const sendRoomMessage = (roomId, content) => {
    if (isSocketConnected()) socket.emit("send_room_message", { roomId, content });
  };

  /** 🔹 Typing indicators */
  const startTyping = (otherUserId) => {
    if (isSocketConnected()) socket.emit("typing_start", { otherUserId });
  };

  const stopTyping = (otherUserId) => {
    if (isSocketConnected()) socket.emit("typing_stop", { otherUserId });
  };

  /** 🔹 Group messaging functions */
  const joinGroup = (groupId) => {
    if (isSocketConnected()) socket.emit("join_group", { groupId });
  };

  const leaveGroup = (groupId) => {
    if (isSocketConnected()) socket.emit("leave_group", { groupId });
  };

  const sendGroupMessage = (groupId, messageData) => {
    console.log("messagedata",messageData)
    if (isSocketConnected()) {
      socket.emit("send_group_message", {
        groupId,
        messageType: messageData.type || "text",
        content: messageData.content,  // 👈 FIXED
        mediaUrl: messageData.mediaUrl,
        fileName: messageData.fileName,
        fileSize: messageData.fileSize,
        replyTo: messageData.replyTo,
        mentions: messageData.mentions || [],
      });
    }
  };


  const startGroupTyping = (groupId) => {
    if (isSocketConnected()) socket.emit("group_typing_start", { groupId });
  };

  const stopGroupTyping = (groupId) => {
    if (isSocketConnected()) socket.emit("group_typing_stop", { groupId });
  };

  return {
    connect,
    disconnect,
    getSocket,
    isSocketConnected,
    joinConversation,
    leaveConversation,
    joinChatroom,
    leaveChatroom,
    sendPersonalMessage,
    sendRoomMessage,
    startTyping,
    stopTyping,
    joinGroup,
    leaveGroup,
    sendGroupMessage,
    startGroupTyping,
    stopGroupTyping,
  };
}

// ✅ Export singleton instance
const websocketService = createWebSocketService();
export default websocketService;

