// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useWebSocket } from '../hooks/useWebSocket';
// import { useAuth } from '../context/AuthContextAPI';
// import { FaPhone, FaVideo, FaEllipsisH, FaMicrophone, FaPlus } from 'react-icons/fa';
// import { BsEmojiSmile, BsSend } from 'react-icons/bs';
// import Form from 'react-bootstrap/Form';
// import httpService from '../helper/httpService';

// const GroupChatComponent = ({ groupMessageId }) => {
//   const { user, groupMessageName } = useAuth();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [typingTimeout, setTypingTimeout] = useState(null);
//   const websocket = useWebSocket();
//   const messagesEndRef = useRef(null);

//   const myUserId = user?.data?.user?._id;

//   /** 🔹 Fetch group chat history */
//   const fetchConversation = useCallback(async () => {
//     try {
//       if (groupMessageId) {
//         const data = await httpService(`/group-messages/${groupMessageId}`, 'GET');
//         setMessages(data?.data || []);
//       }
//     } catch (err) {
//       console.error('❌ Failed to load conversation:', err);
//     }
//   }, [groupMessageId]);

//   /** 🔹 WebSocket setup */
//   useEffect(() => {
//     if (!myUserId || !groupMessageId) return;

//     websocket.joinChatroom(groupMessageId);
//     fetchConversation();

//     /** Handle new group message */
//     const handleNewGroupMessage = (message) => {
//       if (message.roomId === groupMessageId) {
//         setMessages((prev) => [...prev, message]);
//       }
//     };

//     /** Handle typing */
//     const handleUserTyping = (data) => {
//       if (data.roomId === groupMessageId) setIsTyping(data.isTyping);
//     };

//     websocket.socket?.on('new_room_message', handleNewGroupMessage);
//     websocket.socket?.on('room_typing', handleUserTyping);

//     return () => {
//       websocket.leaveChatroom(groupMessageId);
//       websocket.socket?.off('new_room_message', handleNewGroupMessage);
//       websocket.socket?.off('room_typing', handleUserTyping);
//     };
//   }, [groupMessageId, myUserId, websocket, fetchConversation]);

//   /** 🔹 Auto scroll */
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   /** 🔹 Send group message */
//   const sendMessage = async () => {
//     if (!newMessage.trim()) return;

//     const tempMessage = {
//       _id: Date.now(),
//       senderId: myUserId,
//       roomId: groupMessageId,
//       content: newMessage,
//       createdAt: new Date().toISOString(),
//       isRead: false,
//     };

//     setMessages((prev) => [...prev, tempMessage]);

//     try {
//       websocket.sendRoomMessage(groupMessageId, newMessage);
//       await httpService(`/group-messages/${groupMessageId}`, 'POST', { content: newMessage });
//     } catch (err) {
//       console.error("❌ Failed to send message:", err);
//     }

//     setNewMessage('');
//     websocket.stopTyping(groupMessageId, true);
//   };

//   /** 🔹 Handle typing */
//   const handleInputTyping = () => {
//     websocket.startTyping(groupMessageId, true);

//     if (typingTimeout) clearTimeout(typingTimeout);

//     const timeout = setTimeout(() => {
//       websocket.stopTyping(groupMessageId, true);
//     }, 1000);

//     setTypingTimeout(timeout);
//   };

//   return (
//     <div className="col-md-8 col-lg-9 chat-area d-flex flex-column h-100 px-3 py-5 position-relative">
//       {/* Header */}
//       <div className="chat-header p-3 border-bottom">
//         <div className="d-flex align-items-center justify-content-between">
//           <div className="d-flex align-items-center">
//             <div className="position-relative">
//               <div className="avatar-sm">
//                 <span className="text-white fw-bold">
//                   {groupMessageName?.charAt(0) || 'G'}
//                 </span>
//               </div>
//               <div className="online-indicator-sm"></div>
//             </div>
//             <div className="ms-3">
//               <h6 className="text-white mb-0">{groupMessageName || 'Group'}</h6>
//             </div>
//           </div>
//           <div className="d-flex align-items-center">
//             <button className="btn btn-icon me-2"><FaPhone className="icon-sm" /></button>
//             <button className="btn btn-icon me-2"><FaVideo className="icon-sm" /></button>
//             <button className="btn btn-icon">
//               <FaEllipsisH className="icon-sm" style={{ transform: 'rotate(90deg)' }} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-grow-1 overflow-auto py-3">
//         {messages.map((message, index) => {
//           const senderId = typeof message.senderId === 'object' ? message.senderId._id : message.senderId;
//           const isMine = senderId === myUserId;

//           return (
//             <div
//               key={message._id || index}
//               className={`p-3 d-flex align-items-center ${isMine ? 'justify-content-end gap-2' : 'gap-2'}`}
//             >
//               {!isMine && <strong className="me-2">{message?.senderId?.username || 'User'}:</strong>}
//               <div
//                 className={`message-bubble px-4 py-2 rounded-pill ${isMine ? 'bg-primary text-white' : 'bg-success text-dark'}`}
//                 style={{ maxWidth: '60%' }}
//               >
//                 <p className="mb-0">{message.content}</p>
//                 <span className="message-time small text-light">
//                   {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                 </span>
//                 {message.isRead && isMine && <span className="ms-1 small">✓✓</span>}
//               </div>
//             </div>
//           );
//         })}

//         {/* Typing indicator */}
//         {isTyping && (
//           <div className="px-3 small fst-italic text-white">
//             {groupMessageName} is typing...
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div className="message-input p-3 border-top">
//         <div className="d-flex align-items-center">
//           <div className="flex-grow-1">
//             <div className="d-flex align-items-center rounded-pill px-3 py-2 bg-light">
//               <Form.Control
//                 type="text"
//                 placeholder="Type your message here"
//                 className="border-0 bg-transparent flex-grow-1"
//                 value={newMessage}
//                 onChange={(e) => {
//                   setNewMessage(e.target.value);
//                   handleInputTyping();
//                 }}
//                 onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//               />
//               <BsEmojiSmile className="text-secondary me-3 fs-5" role="button" title="Emoji" />
//               <BsSend className="text-primary fs-5" role="button" title="Send" onClick={sendMessage} />
//             </div>
//           </div>
//           <button className="btn btn-secondary btn-circle mx-2"><FaMicrophone /></button>
//           <button className="btn btn-danger btn-circle"><FaPlus /></button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GroupChatComponent;






// const handleNewGroupMessage = (message) => {
//     const groupId = message.groupMessageId || message.group;
//     if (groupId === groupMessageId) {
//         setMessages((prev) => {
//             if (
//                 prev.some(
//                     (m) =>
//                         m._id === message._id ||
//                         (m.content === message.content &&
//                             m.senderId === message.senderId)
//                 )
//             ) {
//                 return prev; // avoid duplicates
//             }
//             return [...prev, message];
//         });
//     }
// };


import React, { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "../context/AuthContextAPI";
import { FaPhone, FaVideo, FaEllipsisH, FaMicrophone, FaPlus } from "react-icons/fa";
import { BsEmojiSmile, BsSend, BsPencilSquare } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import httpService from "../helper/httpService";
import websocketService from "../services/websocket";

const GroupChatComponent = ({ groupMessageId }) => {
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
    /** 🔹 Fetch group chat history */
    const fetchConversation = useCallback(async () => {
        if (!groupMessageId) return;
        try {
            websocketService.sendGroupMessage(groupMessageId, { content: newMessage });
            const data = await httpService(`/group-messages/${groupMessageId}`, "GET");
            setMessages(data?.data || []);
        } catch (err) {
            console.error("❌ Failed to load conversation:", err);
        }

    }, [groupMessageId]);

    // ✅ Fetch messages only when group changes


    /** 🔹 Load conversation when group changes */
    useEffect(() => {
        fetchConversation();
    }, [fetchConversation]);



    /** 🔹 WebSocket setup */
    useEffect(() => {
        if (!myUserId || !groupMessageId) return;

        websocketService.joinGroup(groupMessageId);
        const socket = websocketService.getSocket();

        const handleNewGroupMessage = (message) => {
            const groupId = message.groupMessageId || message.group;
            if (groupId === groupMessageId) {
                setMessages((prev) => {
                    if (
                        prev.some(
                            (m) =>
                                m._id === message._id ||
                                (m.content === message.content &&
                                    m.senderId === message.senderId)
                        )
                    ) {
                        return prev; // avoid duplicates
                    }
                    return [...prev, message];
                });
            }
        };


        console.log("sadsadsad", socket)

        const handleTypingStart = (data) => {
            if (data.groupId === groupMessageId && data.userId !== myUserId) {
                setTypingUser(data.username);
            }
        };

        const handleTypingStop = (data) => {
            if (data.groupId === groupMessageId && data.userId !== myUserId) {
                setTypingUser(null);
            }
        };

        // ✅ Attach listeners once
        socket?.on("new_group_message", handleNewGroupMessage);
        socket?.on("group_typing_start", handleTypingStart);
        socket?.on("group_typing_stop", handleTypingStop);

        // ✅ Cleanup when group changes/unmount
        return () => {
            websocketService.leaveGroup(groupMessageId);
            socket?.off("new_group_message", handleNewGroupMessage);
            socket?.off("group_typing_start", handleTypingStart);
            socket?.off("group_typing_stop", handleTypingStop);

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
                await httpService(`/group-messages/${editingMessageId}`, "PUT", {
                    content: newMessage,
                });

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
            _id: Date.now().toString(),
            senderId: myUserId,
            groupId: groupMessageId,
            content: newMessage,
            createdAt: new Date().toISOString(),
            isRead: false,
            pending: true,
        };
        setMessages((prev) => [...prev, tempMessage]);

        try {
            await httpService(`/group-messages/${groupMessageId}`, "POST", {
                content: newMessage,
            });
        } catch (err) {
            console.error("❌ Failed to send message:", err);
        }

        setNewMessage("");
        websocketService.stopGroupTyping(groupMessageId, {
            username: user?.data?.user?.username,
            userId: myUserId,
        });
    };

    /** 🔹 Typing */
    const handleInputTyping = () => {
        websocketService.startGroupTyping(groupMessageId, {
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
                            const senderId =
                                typeof message.senderId === "object" ? message.senderId._id : message.senderId;

                            const isMine = senderId === myUserId;

                            return (
                                <div
                                    key={message._id || index}
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























