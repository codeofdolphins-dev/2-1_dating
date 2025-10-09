import { io } from "socket.io-client";

function createWebSocketService() {
  let socket = null;
  let isConnected = false;
  let listenersAttached = false; // ✅ Track if listeners are already attached

  /** 🔹 Connect to server with JWT token */
  const connect = (token) => {
    if (socket && (socket.connected || socket.connecting)) return socket;

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
    console.log("messagedata", messageData)
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

