import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "../context/AuthContextAPI";
import { FaPhone, FaVideo, FaEllipsisH, FaMicrophone, FaPlus } from "react-icons/fa";
import { BsEmojiSmile, BsSend, BsPencilSquare } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import httpService from "../helper/httpService";
import websocketService from "../services/websocket";

const GroupChatComponent = ({ groupMessageId, websocket }) => {
    const { user, groupMessageName } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [typingUser, setTypingUser] = useState(null);
    const typingTimeoutRef = useRef(null);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const [autoScroll, setAutoScroll] = useState(true);

    const [editingMessageId, setEditingMessageId] = useState(null); // ✅ Track message being edited

    const myUserId = user?.data?.user?._id;

    /** 🔹 Fetch group chat history */
    useEffect(() => {
        try {
            if (groupMessageId) {
                httpService(`/group-messages/${groupMessageId}`, "GET")
                    .then(data => {
                        setMessages(data.data || []);
                    })
            }
        } catch (err) {
            console.error("❌ Failed to load conversation:", err);
        }
    }, [groupMessageId]);


    const handleTypingStop = useCallback((data) => {
        if (data.groupId === groupMessageId && data.userId !== myUserId) {
            setTypingUser(null);
        }
    }, []);
    const handleTypingStart = useCallback((data) => {
        if (data.groupId === groupMessageId && data.userId !== myUserId) {
            setTypingUser(data.username);
        }
    }, []);
    const handleNewGroupMessage = useCallback((message) => {
        console.log(message);

        const groupId = message.groupId;
        if (groupId === groupMessageId) {
            setMessages((prev) => {
                const flag = prev.some((m) => m._id === message.message._id);
                if (flag) {
                    return prev; // avoid duplicates
                }
                return [...prev, message?.message];
            });
        }
    }, []);
    // console.log(messages);

    /** 🔹 WebSocket setup */
    useEffect(() => {
        if (!myUserId || !groupMessageId) return;

        const socket = websocket.getSocket ? websocket.getSocket() : websocket.socket;
        if (!socket) {
            console.warn('Socket not initialized yet');
            return;
        };

        // ✅ Attach listeners once
        socket.on("new_group_message", handleNewGroupMessage);
        socket.on("group_typing_start", handleTypingStart);
        socket.on("group_typing_stop", handleTypingStop);

        websocket.joinGroup(groupMessageId);

        // ✅ Cleanup when group changes/unmount
        return () => {
            websocketService.leaveGroup(groupMessageId);
            socket.off("new_group_message", handleNewGroupMessage);
            socket.off("group_typing_start", handleTypingStart);
            socket.off("group_typing_stop", handleTypingStop);

            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        };
    }, [groupMessageId, myUserId]);

    /** 🔹 Auto scroll */
    useEffect(() => {
        if (autoScroll) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleScroll = () => {
        if (!messagesContainerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
        setAutoScroll(isNearBottom);
    };

    /** 🔹 Send / Edit message */
    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        if (editingMessageId) {
            // ✅ Edit existing message
            try {
                // await httpService(`/group-messages/${editingMessageId}`, "PUT", {
                //     content: newMessage,
                // });

                setMessages((prev) =>
                    prev.map((msg) =>
                        msg._id === editingMessageId ? { ...msg, content: newMessage } : msg
                    )
                );
            } catch (err) {
                console.error("❌ Failed to edit message:", err);
            }
            setEditingMessageId(null);
            setNewMessage("");
            return;
        }

        // ✅ Send new message
        const tempMessage = {
            senderId: myUserId,
            groupId: groupMessageId,
            content: newMessage,
            createdAt: new Date().toISOString(),
            isRead: false,
            pending: true
        };
        setMessages((prev) => [...prev, tempMessage]);

        try {
            websocket.sendGroupMessage(groupMessageId, { content: newMessage });
        } catch (err) {
            console.error("❌ Failed to send message:", err);
        }

        setNewMessage("");
        websocket.stopGroupTyping(groupMessageId, {
            username: user?.data?.user?.username,
            userId: myUserId,
        });
    };

    /** 🔹 Typing */
    const handleInputTyping = () => {
        websocket.startGroupTyping(groupMessageId, {
            username: user?.data?.user?.username,
            userId: myUserId,
        });

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

        typingTimeoutRef.current = setTimeout(() => {
            websocketService.stopGroupTyping(groupMessageId, {
                username: user?.data?.user?.username,
                userId: myUserId,
            });
        }, 1000);
    };

    return (
        <div className="col-md-8 col-lg-9 chat-area d-flex flex-column h-100 px-3 py-5 position-relative">
            {groupMessageId ? (
                <>
                    {/* Header */}
                    <div className="chat-header p-3 border-bottom">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <div className="position-relative">
                                    <div className="avatar-sm">
                                        <span className="text-white fw-bold">
                                            {groupMessageName?.charAt(0) || "G"}
                                        </span>
                                    </div>
                                    <div className="online-indicator-sm"></div>
                                </div>
                                <div className="ms-3">
                                    <h6 className="text-white mb-0">{groupMessageName || "Group"}</h6>
                                    {typingUser && (
                                        <div className="small fst-italic text-white">
                                            {typingUser} is typing...
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <button className="btn btn-icon me-2">
                                    <FaPhone className="icon-sm" />
                                </button>
                                <button className="btn btn-icon me-2">
                                    <FaVideo className="icon-sm" />
                                </button>
                                <button className="btn btn-icon">
                                    <FaEllipsisH className="icon-sm" style={{ transform: "rotate(90deg)" }} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div
                        className="flex-grow-1 overflow-auto py-3"
                        ref={messagesContainerRef}
                        onScroll={handleScroll}
                    >
                        {messages.map((message, index) => {
                            const senderId = typeof message.sender === 'object' ? message?.sender?._id : message.senderId;
                            const isMine = senderId === myUserId;

                            return (
                                <div
                                    key={index}
                                    className={`p-3 d-flex align-items-center ${isMine ? "justify-content-end gap-2" : "gap-2"
                                        }`}
                                >
                                    {!isMine && (
                                        <strong className="me-2">{message?.sender?.username || "User"}:</strong>
                                    )}
                                    <div
                                        className={`message-bubble px-4 py-2 rounded-pill ${isMine ? "bg-primary text-white" : "bg-success text-dark"
                                            }`}
                                        style={{ maxWidth: "60%" }}
                                    >
                                        <p className="mb-0">{message.content}</p>
                                        <span className="message-time small text-light">
                                            {message.createdAt
                                                ? new Date(message.createdAt).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })
                                                : "..."}
                                        </span>
                                        {message.isRead && isMine && <span className="ms-1 small">✓✓</span>}
                                    </div>
                                    {isMine && (
                                        <BsPencilSquare
                                            className="text-warning"
                                            role="button"
                                            title="Edit"
                                            onClick={() => {
                                                setEditingMessageId(message._id);
                                                setNewMessage(message.content);
                                            }}
                                        />
                                    )}
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="message-input p-3 border-top">
                        <div className="d-flex align-items-center">
                            <div className="flex-grow-1">
                                <div className="d-flex align-items-center rounded-pill px-3 py-2 bg-light">
                                    <Form.Control
                                        type="text"
                                        placeholder={
                                            editingMessageId ? "Edit your message..." : "Type your message here"
                                        }
                                        className="border-0 bg-transparent flex-grow-1"
                                        value={newMessage}
                                        onChange={(e) => {
                                            setNewMessage(e.target.value);
                                            handleInputTyping();
                                        }}
                                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                    />
                                    <BsEmojiSmile
                                        className="text-secondary me-3 fs-5"
                                        role="button"
                                        title="Emoji"
                                    />
                                    <BsSend
                                        className="text-primary fs-5"
                                        role="button"
                                        title={editingMessageId ? "Update" : "Send"}
                                        onClick={() => sendMessage()}
                                    />
                                </div>
                            </div>
                            <button className="btn btn-secondary btn-circle mx-2">
                                <FaMicrophone />
                            </button>
                            <button className="btn btn-danger btn-circle">
                                <FaPlus />
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="d-flex align-items-center justify-content-center flex-grow-1">
                    <h4 className="text-white">Please select a group to start messaging</h4>
                </div>
            )}
        </div>
    );
};

export default GroupChatComponent;























