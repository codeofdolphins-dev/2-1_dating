import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { BsEmojiSmile, BsSend } from "react-icons/bs";
import { FaPlus, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WebSocketService from "../../services/websocket"; // ✅ Import websocket service

const ChatroomChatBox = ({ room_id }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const chatEndRef = useRef(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_URL;

  // ✅ Fetch chat history (once)
  const fetchMessages = async () => {
    try {
      const token = sessionStorage.getItem("jwtToken");
      const { data } = await axios.get(`${apiUrl}/chatrooms/${room_id}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(data.data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // ✅ Setup WebSocket connection + listeners
  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");
    if (!token) return;

    if (!WebSocketService.isConnected) {
      // WebSocketService.connect(token);
    }

    // Join chatroom
    WebSocketService.joinChatroom(room_id);

    // Listen for new room messages
    const handleNewMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };
    WebSocketService.socket?.on("new_room_message", handleNewMessage);

    fetchMessages();

    return () => {
      WebSocketService.leaveChatroom(room_id);
      WebSocketService.socket?.off("new_room_message", handleNewMessage);
    };
  }, [room_id]);

  // ✅ Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Send message
  const handleSend = async () => {
    if (!newMessage.trim() && !previewImage) return;

    try {
      // If sending image (upload to Cloudinary)
      if (previewImage) {
        const cloudFormData = new FormData();
        cloudFormData.append("file", previewImage);
        cloudFormData.append("upload_preset", "chat_media_upload");

        const cloudinaryRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dx23j3ldj/image/upload",
          cloudFormData
        );

        const mediaUrl = cloudinaryRes.data.secure_url;

        // Send via WebSocket
        WebSocketService.sendRoomMessage(room_id, mediaUrl, "image");

        setPreviewImage(null);
        setPreviewUrl(null);
      }

      // If text
      if (newMessage.trim()) {
        WebSocketService.sendRoomMessage(room_id, newMessage, "text");
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Container fluid className="mt-2">
      <Row>
        <Col style={{ height: "255px" }}>
          {/* Messages */}
          <div
            className="flex-grow-1 p-3 overflow-auto"
            style={{
              backgroundColor: "var(--color-background)",
              borderRadius: "1rem 1rem 0 0",
              height: "610px",
            }}
          >
            {messages.map((msg, idx) => (
              <div key={idx} className="mb-2">
                <span className={`text-${msg.color || "primary"} fw-semibold`}>
                  {msg?.userId?.username || "User"}:
                </span>{" "}
                <span className="text-info">
                  {msg?.messageType === "image" ? (
                    <img
                      src={msg?.content}
                      alt="sent media"
                      style={{ maxWidth: "200px", borderRadius: "8px" }}
                    />
                  ) : (
                    msg?.content
                  )}
                </span>
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>

          {/* Input */}
          <div
            className="p-3 rounded-bottom d-flex w-100 gap-2"
            style={{ backgroundColor: "var(--color-background)" }}
          >
            <div className="flex-grow-1">
              <div className="d-flex align-items-center rounded-pill px-3 py-2 bg-light position-relative">
                {/* Preview Image */}
                {previewUrl && (
                  <div className="me-2 position-relative">
                    <img
                      src={previewUrl}
                      alt="preview"
                      style={{
                        height: "40px",
                        width: "40px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                    <FaTimesCircle
                      size={18}
                      color="red"
                      style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-5px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setPreviewImage(null);
                        setPreviewUrl(null);
                      }}
                    />
                  </div>
                )}

                <Form.Control
                  type="text"
                  placeholder="Type your message here"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="border-0 bg-transparent flex-grow-1"
                />
                <BsEmojiSmile className="text-secondary me-3 fs-5" role="button" title="Emoji" />
                <BsSend className="text-primary fs-5" role="button" title="Send" onClick={handleSend} />
              </div>
            </div>

            {/* Upload */}
            <div className="d-flex align-items-center">
              <input
                type="file"
                id="mediaUpload"
                accept="image/*"
                style={{ display: "none" }}
                disabled={!!previewImage}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setPreviewImage(file);
                    const reader = new FileReader();
                    reader.onloadend = () => setPreviewUrl(reader.result);
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <div
                className={`p-2 rounded-circle d-flex align-items-center justify-content-center ${previewImage ? "bg-secondary" : "bg-danger"}`}
                role="button"
                style={{
                  opacity: previewImage ? 0.6 : 1,
                  cursor: previewImage ? "not-allowed" : "pointer",
                }}
                onClick={() => {
                  if (!previewImage) {
                    document.getElementById("mediaUpload").click();
                  }
                }}
              >
                <FaPlus className="fs-5" style={{ color: "var(--color-border)" }} title="Add Media" />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatroomChatBox;

