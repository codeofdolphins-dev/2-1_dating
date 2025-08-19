import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const useWebSocket = (token) => {
    const apiUrl = import.meta.env.VITE_BASE_URL;
    const socketRef = useRef(null);
    const [isConnected, setIsConnected] = useState(false);

    

    useEffect(() => {
        if (!token) return;

        // Connect socket with JWT
        const socket = io(apiUrl, {
            auth: { token },
            transports: [ "polling"],
        });

        socketRef.current = socket;

        socket.on("connect", () => {
            console.log("✅ Connected to WebSocket server");
            setIsConnected(true);
        });

        socket.on("disconnect", () => {
            console.log("❌ Disconnected from WebSocket server");
            setIsConnected(false);
        });

        socket.on("connect_error", (error) => {
            console.error("⚠️ WebSocket connection error:", error);
        });

        // Setup event listeners
        socket.on("notification", (n) => console.log("📢 Notification:", n));
        socket.on("new_personal_message", (m) => console.log("💬 New message:", m));
        socket.on("message_sent", (m) => console.log("✅ Message sent:", m));
        socket.on("message_read", (d) => console.log("👀 Message read:", d));
        socket.on("user_typing", (d) => console.log("⌨️ Typing:", d));
        socket.on("friend_status_change", (d) => console.log("🟢 Friend status:", d));
        socket.on("new_room_message", (m) => console.log("🏠 Room message:", m));
        socket.on("user_joined_room", (d) => console.log("➕ Joined room:", d));
        socket.on("user_left_room", (d) => console.log("➖ Left room:", d));
        socket.on("user_joined_conversation", (d) => console.log("👥 Joined convo:", d));
        socket.on("user_left_conversation", (d) => console.log("🚪 Left convo:", d));
        socket.on("error", (e) => console.error("❌ Socket error:", e));
        socket.on("message_error", (e) => console.error("⚠️ Message error:", e));

        return () => {
            socket.disconnect();
            socketRef.current = null;
            setIsConnected(false);
        };
    }, [token]);

    // Messaging functions
    const joinConversation = (otherUserId) =>
        socketRef.current?.emit("join_conversation", { otherUserId });

    const leaveConversation = (otherUserId) =>
        socketRef.current?.emit("leave_conversation", { otherUserId });

    const sendPersonalMessage = (
        receiverId,
        content,
        messageType = "text",
        mediaUrl = null,
        replyTo = null
    ) =>
        socketRef.current?.emit("send_personal_message", {
            receiverId,
            content,
            messageType,
            mediaUrl,
            replyTo,
        });

    const startTyping = (otherUserId) =>
        socketRef.current?.emit("typing_start", { otherUserId });

    const stopTyping = (otherUserId) =>
        socketRef.current?.emit("typing_stop", { otherUserId });

    const markMessageAsRead = (messageId, otherUserId) =>
        socketRef.current?.emit("message_read", { messageId, otherUserId });

    // Chat room methods
    const joinChatroom = (roomId) =>
        socketRef.current?.emit("join_chatroom", { roomId });

    const leaveChatroom = (roomId) =>
        socketRef.current?.emit("leave_chatroom", { roomId });

    const sendRoomMessage = (
        roomId,
        content,
        messageType = "text",
        mediaUrl = null
    ) =>
        socketRef.current?.emit("send_room_message", {
            roomId,
            content,
            messageType,
            mediaUrl,
        });

    return {
        isConnected,
        joinConversation,
        leaveConversation,
        sendPersonalMessage,
        startTyping,
        stopTyping,
        markMessageAsRead,
        joinChatroom,
        leaveChatroom,
        sendRoomMessage,
    };
};

export default useWebSocket;
