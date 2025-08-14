import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { BsEmojiSmile, BsSend } from "react-icons/bs";
import { FaPlus, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChatroomChatBox = ({ room_id }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const chatEndRef = useRef(null);
    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_BASE_URL;

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

    const handleSend = async () => {
        if (!newMessage.trim() && !previewImage) return;

        try {
            const token = sessionStorage.getItem("jwtToken");

            // If sending image
            if (previewImage) {
                const cloudFormData = new FormData();
                cloudFormData.append("file", previewImage);
                cloudFormData.append("upload_preset", "chat_media_upload");

                const cloudinaryRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/dx23j3ldj/image/upload",
                    cloudFormData
                );

                const mediaUrl = cloudinaryRes.data.secure_url;

                const { data } = await axios.post(
                    `${apiUrl}/chatrooms/${room_id}/messages`,
                    { content: mediaUrl, messageType: "image" },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setMessages((prev) => [...prev, data.message]);
                setPreviewImage(null); // ✅ Re-enable upload after send
            }

            // If sending text
            if (newMessage.trim()) {
                const { data } = await axios.post(
                    `${apiUrl}/chatrooms/${room_id}/messages`,
                    { content: newMessage },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setMessages((prev) => [...prev, data.message]);
                setNewMessage("");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, [room_id]);

    return (
        <Container fluid className="mt-2">
            <Row>
                <Col style={{ height: "255px" }}>
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
                                    {msg?.userId?.username}:
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

                    <div
                        className="p-3 rounded-bottom d-flex w-100 gap-2"
                        style={{ backgroundColor: "var(--color-background)" }}
                    >
                        <div className="flex-grow-1">
                            <div className="d-flex align-items-center rounded-pill px-3 py-2 bg-light position-relative">
                                {/* Preview Image */}
                                {previewImage && (
                                    <div className="me-2 position-relative">
                                        <img
                                            src={URL.createObjectURL(previewImage)}
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
                                            onClick={() => setPreviewImage(null)} // ✅ Enable upload again
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
                                disabled={!!previewImage} // ✅ Disable when image selected
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setPreviewImage(file);
                                    }
                                }}
                            />
                            <div
                                className={`p-2 rounded-circle d-flex align-items-center justify-content-center ${previewImage ? "bg-secondary" : "bg-danger"}`}
                                role="button"
                                style={{ opacity: previewImage ? 0.6 : 1, cursor: previewImage ? "not-allowed" : "pointer" }}
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
