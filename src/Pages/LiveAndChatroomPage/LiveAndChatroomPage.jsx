import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { BsArrowLeft, BsSend } from "react-icons/bs";
import "./style.css";
import GlobalPageWrapper from "../../components/GlobalPageWrapper";

import video from "../../assets/PopupDemoVideo/243647_small.mp4"

import FilterBar from "../../components/FilterBar/FilterBar"
import { useNavigate } from "react-router-dom";

const LiveAndChatroomPage = () => {
    const [messages, setMessages] = useState([
        { user: "HOTDUGOUT3", text: "Can't see her", color: "danger" },
        { user: "BISUNNY", text: "Pull the camera up", color: "primary" },
        { user: "CBADCOUPLE", text: "CBADCouple checking in. We can’t wait to see more", color: "warning" },
    ]);
    const [newMessage, setNewMessage] = useState("");

    const handleSend = () => {
        if (newMessage.trim() !== "") {
            setMessages([...messages, { user: "You", text: newMessage, color: "danger" }]);
            setNewMessage("");
        }
    };

    const navigate = useNavigate()

    const nagigatePrevPage =()=>{
       navigate("/livestream")
    }

    return (
        <GlobalPageWrapper>
            <div className="live-stream-container p-3 pt-5">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="text-white d-flex align-items-center gap-2 mb-0">
                        <i class="bi bi-chevron-left fs-1" style={{cursor:"pointer"}} onClick={nagigatePrevPage}></i> &nbsp; <div className="fs-1">Live & Chatroom</div>
                    </h5>
                </div>
                <div className="pl-5 mt-2">
                    <small className="text-white ">65 Viewers</small>
                </div>

                <Row className="gx-3">
                    {/* Video Section */}
                    <Col md={8}>
                        <div className="video-box rounded-4 overflow-hidden">
                            <video controls style={{ width: "100%",height:"100%", borderRadius: "1rem" }}>
                                <source src={video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </Col>

                    {/* Chat Section */}
                    <Col md={4} className="d-flex flex-column" style={{ height: '618px',border:"2px solid #ffffff",borderRadius:"13px" }}>
                        {/* Messages */}
                        <div
                            className="flex-grow-1 p-3"
                            style={{
                                overflowY: "auto",
                                backgroundColor: "#0A0F3B",
                                color: "#fff",
                                borderTopLeftRadius: "1rem",
                                borderTopRightRadius: "1rem",
                                scrollbarWidth: "thin"
                            }}
                        >
                            {messages.length === 0 ? (
                                <p className="text-muted">No messages yet.</p>
                            ) : (
                                messages.map((msg, idx) => (
                                    <p key={idx} className={`mb-2 text-${msg.color}`}>
                                        <strong>{msg.user}:</strong> <span className="text-white">{msg.text}</span>
                                    </p>
                                ))
                            )}
                        </div>

                        {/* Chat Input */}
                        <div
                            className="p-3"
                            style={{
                                backgroundColor: "#0A0F3B",
                                borderBottomLeftRadius: "1rem",
                                borderBottomRightRadius: "1rem"
                            }}
                        >
                            <div className="position-relative">
                                <Form.Control
                                    type="text"
                                    placeholder="Type your message here"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    className="pe-5 rounded-pill border-0"
                                    style={{ backgroundColor: "#fff" }}
                                />
                                <button
                                    onClick={handleSend}
                                    className="position-absolute top-50 end-0 translate-middle-y me-3 border-0 bg-transparent"
                                >
                                    <BsSend className="text-primary" size={18} />
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

        </GlobalPageWrapper>
    );
};

export default LiveAndChatroomPage;
