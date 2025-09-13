import React, { useState, useRef, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import {
  BsFillTelephoneFill,
  BsCameraVideoFill,
  BsThreeDotsVertical,
  BsMicFill,
} from "react-icons/bs";
import { FaPaperPlane, FaPlus } from "react-icons/fa";
import WebSocketService from "../../services/websocket";
import "./style.css";
import { useAuth } from "../../context/AuthContextAPI";

const MessengerPopup = ({ show, handleClose, profileImg, userName, receiverId }) => {
  const { user } = useAuth();
  const senderId = user?.data?.user?._id; // ✅ current logged-in user
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  console.log("senderId:", senderId, "receiverId:", receiverId);

  // ✅ Join conversation + Fetch old messages + Listen new
  useEffect(() => {
    if (!show || !receiverId || !senderId) return;

    if (!WebSocketService.isConnected && user?.token) {
      WebSocketService.connect(user.token); // ensure socket connection
    }

    WebSocketService.joinConversation(receiverId);

    // ✅ Fetch previous chat history
    const fetchChatHistory = async () => {
      try {
        const history = await WebSocketService.getChatHistory(receiverId);
        setMessages(history || []);
      } catch (err) {
        console.error("Error fetching chat history:", err);
      }
    };
    fetchChatHistory();

    // ✅ Listen for new incoming messages
    const socket = WebSocketService.socket;
    socket?.on("new_personal_message", (message) => {
      console.log("📩 new message:", message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      WebSocketService.leaveConversation(receiverId);
      socket?.off("new_personal_message");
    };
  }, [show, receiverId, senderId, user?.token]);

  // ✅ Send Message
  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      senderId,
      receiverId,
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    WebSocketService.sendPersonalMessage(receiverId, input);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // ✅ Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!show) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 5000 }}
    >
      <div
        className="rounded-4 d-flex flex-column"
        style={{
          width: "650px",
          height: "500px",
          backgroundColor: "var(--color-background)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          className="d-flex align-items-center justify-content-between px-3 py-2"
          style={{ backgroundColor: "var(--color-border)" }}
        >
          <div className="d-flex align-items-center gap-2">
            <img
              src={profileImg?.url}
              alt="avatar"
              className="rounded-circle"
              style={{ width: "40px", height: "40px" }}
            />
            <div className="text-white fw-semibold">{userName}</div>
          </div>
          <div className="text-white d-flex align-items-center gap-3 fs-5">
            <BsFillTelephoneFill />
            <BsCameraVideoFill />
            <BsThreeDotsVertical />
            <button
              onClick={handleClose}
              className="btn btn-sm btn-outline-light"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>

        {/* Chat Body */}
        <div
          className="flex-grow-1 px-3 py-2"
          style={{ overflowY: "auto", color: "#fff", backgroundColor: "#0A0F3B" }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`d-flex mb-2 ${
                msg.senderId === senderId ? "justify-content-end" : "justify-content-start"
              }`}
            >
              <div
                className="px-3 py-2 rounded-4"
                style={{
                  maxWidth: "70%",
                  backgroundColor:
                    msg.senderId === senderId
                      ? "var(--color-success-green)"
                      : "var(--color-primary-green)",
                  color: "#000000",
                  fontSize: "0.9rem",
                }}
              >
                {msg.content}
                <div className="text-end text-black small">{msg.timestamp}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer */}
        <div
          className="px-3 py-2 d-flex align-items-center"
          style={{ backgroundColor: "var(--color-border)" }}
        >
          <InputGroup
            className="bg-white rounded-pill px-3 py-2"
            style={{ flex: 1 }}
          >
            <Form.Control
              placeholder="Type your message here"
              className="border-0 bg-transparent shadow-none"
              style={{ fontSize: "0.9rem" }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <span
              className="text-muted d-flex align-items-center gap-3 pe-2"
              style={{ cursor: "pointer" }}
              onClick={handleSend}
            >
              <FaPaperPlane className="text-primary" />
            </span>
          </InputGroup>

          <div className="ms-3 d-flex gap-3 align-items-center text-white fs-5">
            <BsMicFill className="text-danger" />
            <div
              className="d-flex justify-content-center align-items-center rounded-circle bg-danger"
              style={{ width: "30px", height: "30px" }}
            >
              <FaPlus style={{ color: "var(--color-border)" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessengerPopup;
