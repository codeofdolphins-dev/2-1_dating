import React, { useState } from "react";
import {
  FaSearch,
  FaEllipsisH,
  FaPhone,
  FaVideo,
  FaCog,
  FaPaperPlane,
  FaMicrophone,
  FaPlus,
  FaSmile
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./chat.css";
import PageWrapper from "../../components/PageWrapper";
import { Form } from "react-bootstrap"; // ✅ Correct import
import { BsEmojiSmile, BsSend } from "react-icons/bs";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState("");

  const contacts = [
    { id: 1, name: "JUSTONCE", message: "Hello guys. We are an easy going couple", time: "40min", online: true, unread: false },
    { id: 2, name: "JUSTONCE", message: "Hello guys. We are an easy going couple", time: "40min", online: true, unread: false },
    { id: 3, name: "JUSTONCE", message: "Hello guys. We are an easy going couple", time: "40min", online: true, unread: false },
    { id: 4, name: "JUSTONCE", message: "Hello guys. We are an easy going couple", time: "40min", online: true, unread: false },
    { id: 5, name: "JUSTONCE", message: "Hello guys. We are an easy going couple", time: "40min", online: true, unread: false },
    { id: 6, name: "JUSTONCE", message: "Hello guys. We are an easy going couple", time: "40min", online: true, unread: false }
  ];

  return (
    <PageWrapper>
      <div className="chat-container mt-0">
        <div className="row p-0 g-0" style={{ height: "100vh" }}>
          {/* Sidebar */}
          <div className="col-md-4 col-lg-3 border rounded-4 my-5 d-flex flex-column">
            {/* Header */}
            <div className="p-3 border-bottom">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="text-white mb-0">Messages</h5>
                <div className="d-flex align-items-center">
                  <button className="btn btn-primary btn-sm me-2 rounded-pill mx-2">Select</button>
                  <button className="btn btn-icon me-2">
                    <FaCog className="icon-sm" />
                  </button>
                  <button className="btn btn-icon">
                    <FaEllipsisH className="icon-sm" />
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className="position-relative mb-3">
                <FaSearch
                  className="position-absolute"
                  style={{
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    color: "#ccc",
                    cursor: "pointer"
                  }}
                />
                <input
                  type="text"
                  className="form-control chat-search"
                  placeholder="Search"
                  style={{
                    paddingRight: "35px",
                    backgroundColor: "var(--color-border)",
                    color: "#fff",
                    border: "1px solid #555"
                  }}
                />
              </div>

              {/* Tabs */}
              <div className="nav-tabs-custom d-flex">
                <button className="nav-link active flex-fill">Messenger</button>
                <button className="nav-link flex-fill">Group Messenger</button>
              </div>
            </div>

            {/* Chat List */}
            <div className="chat-list flex-grow-1 overflow-auto">
              {contacts.map((contact, index) => (
                <div
                  key={contact.id}
                  className={`chat-item p-3 ${selectedChat === index ? "active" : ""}`}
                  onClick={() => setSelectedChat(index)}
                >
                  <div className="d-flex align-items-center">
                    <div className="position-relative">
                      <div className="avatar">
                        <span className="text-white fw-bold">J</span>
                      </div>
                      {contact.online && <div className="online-indicator"></div>}
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="text-white mb-0">{contact.name}</h6>
                        <span className="time-text">{contact.time}</span>
                      </div>
                      <p className="message-preview mb-0">{contact.message}</p>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                      <button className="btn btn-icon-sm mb-1">
                        <FaEllipsisH className="icon-xs" />
                      </button>
                      <div className="status-dot"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-md-8 col-lg-9 chat-area d-flex flex-column h-100 px-3 py-5 position-relative">
            {/* Chat Header */}
            <div className="chat-header p-3 border-bottom">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="position-relative">
                    <div className="avatar-sm">
                      <span className="text-white fw-bold">J</span>
                    </div>
                    <div className="online-indicator-sm"></div>
                  </div>
                  <div className="ms-3">
                    <h6 className="text-white mb-0">JUSTONCE</h6>
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

            {/* Chat Messages */}
            <div style={{ height: "100vh", overflowX: "auto" }}>
              {/* Receiver Message */}
              <div className="p-3 d-flex gap-2 align-items-center">
                <div className="message-bubble bg-success text-dark rounded-pill px-4" style={{ maxWidth: "60%" }}>
                  <p className="mb-0">Please add us to the USA DESI CPL group</p>
                  <span className="message-time small text-white">Mar 13, 2024 • 2 days</span>
                </div>
                <FaEllipsisH className="icon-sm" style={{ transform: "rotate(90deg)" }} />
              </div>

              {/* Sender Message */}
              <div className="p-3 d-flex justify-content-end align-items-center gap-2">
                <FaEllipsisH className="icon-sm" style={{ transform: "rotate(90deg)" }} />
                <div className="message-bubble bg-primary text-white rounded-pill px-4" style={{ maxWidth: "60%" }}>
                  <p className="mb-0">Sure! I’ll add you to the group now.</p>
                  <span className="message-time small text-light">Mar 13, 2024 • 2 days</span>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="message-input p-3">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center rounded-pill px-3 py-2 bg-light">
                    <Form.Control
                      type="text"
                      placeholder="Type your message here"
                      className="border-0 bg-transparent flex-grow-1"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <BsEmojiSmile className="text-secondary me-3 fs-5" role="button" title="Emoji" />
                    <BsSend className="text-primary fs-5" role="button" title="Send" />
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
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Chat;
