import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { BsEmojiSmile, BsSend } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ChatroomChatBox = () => {
    const [messages, setMessages] = useState([
        { user: "NYCCPL4BBC", color: "danger" },
        { user: "WEWILLPLAY", color: "warning" },
        { user: "KANDSINLE", color: "success" },
        { user: "OCEANFRONT", color: "info" },
        { user: "KHUFUANDKADESH", text: "Kands grm", color: "success" },
        { user: "KANDSINLE", text: "Khufu", color: "success" },
        { user: "KANDSINLE", color: "success" },
        { user: "NYCCPL4BBC", color: "danger" },
        { user: "WPBCOUPLEP99", color: "primary" },
        { user: "KANDSINLE", color: "success" },
        { user: "DEBENDTIX", color: "light" },
        { user: "NYCCPL4BBC", color: "danger" },
        { user: "KHUFUANDKADESH", color: "success" },
        { user: "OCEANFRONT", color: "info" },
        { user: "TIMEOFYOURLIVES", color: "light" },
        { user: "SPICYBRUSSELS", color: "danger" },
        { user: "DEBENDTIX", color: "light" },
        { user: "KHUFUANDKADESH", color: "success" },
        { user: "WPBCOUPLEFORPLAY", color: "warning" },
    ]);
    const [newMessage, setNewMessage] = useState("");

    const chatEndRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (newMessage.trim() !== "") {
            setMessages([...messages, { user: "You", text: newMessage, color: "danger" }]);
            setNewMessage("");
        }
    };

    return (
        <Container fluid className="mt-2" >
            <Row className="" >
                <Col className="" style={{ height: "255px" }}>
                    {/* Chat List */}
                    <div className="flex-grow-1 p-3 overflow-auto" style={{ backgroundColor: "var(--color-background)", borderRadius: "1rem 1rem 0 0", height: "610px" }}>
                        {messages.map((msg, idx) => (
                            <div key={idx} className="mb-2">
                                <span className={`text-${msg.color} fw-semibold`}>{msg.user}:</span>{" "}
                                <span className="text-info">
                                    {msg.text ? msg.text : "Click here to see my picture."}
                                </span>
                            </div>
                        ))}
                        <div ref={chatEndRef}></div>
                    </div>

                    {/* Chat Input */}
                    <div className="p-3 rounded-bottom d-flex w-100 gap-2" style={{backgroundColor:"var(--color-background)"}}>
                        {/* Input & Icons */}
                        <div className="flex-grow-1">
                            <div className="d-flex align-items-center rounded-pill px-3 py-2 bg-light position-relative">
                                <Form.Control
                                    type="text"
                                    placeholder="Type your message here"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    className="border-0 bg-transparent flex-grow-1"
                                />
                                <BsEmojiSmile
                                    className="text-secondary me-3 fs-5"
                                    role="button"
                                    title="Emoji"
                                />
                                <BsSend
                                    className="text-primary fs-5"
                                    role="button"
                                    title="Send"
                                    onClick={handleSend}
                                />
                            </div>
                        </div>

                        {/* Plus Button */}
                        <div className="d-flex align-items-center">
                            <div className="bg-danger p-2 rounded-circle d-flex align-items-center justify-content-center">
                                <FaPlus className="fs-5" role="button" style={{color:"var(--color-border)"}} title="Add" />
                            </div>
                        </div>
                    </div>

                </Col>
            </Row>
        </Container>
    );
};

export default ChatroomChatBox;

