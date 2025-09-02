import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaEllipsisH,
  FaPhone,
  FaVideo,
  FaCog,
  FaPaperPlane,
  FaMicrophone,
  FaPlus,
  FaSmile,
  FaFolderOpen
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./chat.css";
import PageWrapper from "../../components/PageWrapper";
import { Form } from "react-bootstrap"; // ✅ Correct import
import { BsEmojiSmile, BsSend } from "react-icons/bs";
import GlobalPageWrapper from "../../components/GlobalPageWrapper";
import MessangerTab from "./components/MessangerTab/MessangerTab";
import GroupMessangerTab from "./components/GroupMessangerTab/GroupMessangerTab";
import httpService from "../../helper/httpService";

import ChatComponent from "../../services/ChatComponent"
import { useAuth } from "../../context/AuthContextAPI";

const Chat = () => {
  const {messagereceiverId} =useAuth()
  const [message, setMessage] = useState("");
  const [users, Setusers] = useState([])

  // const contacts = [
  //   { id: 1, name: "JUSTONCE", message: "Hello guys. We are an easy going couple", time: "40min", online: true, unread: false },
  //   { id: 2, name: "JUSTONCE", message: "Hello guys. We are an easy going couple", time: "40min", online: true, unread: false },
  //   { id: 3, name: "JUSTONCE", message: "Hello guys. We are an easy going couple", time: "40min", online: true, unread: false },
  //   { id: 4, name: "JUSTONCE", message: "Hello guys. We are an easy going couple", time: "40min", online: true, unread: false },
  //   { id: 5, name: "JUSTONCE", message: "Hello guys. We are an easy going couple", time: "40min", online: true, unread: false },
  //   { id: 6, name: "JUSTONCE", message: "Hello guys. We are an easy going couple", time: "40min", online: true, unread: false }
  // ];

  const [showPopup, setShowPopup] = useState(false)
  const [selected, setSelected] = useState(["Viewed me"]);
  const handleToggle = (label) => {
    setSelected((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  // const filter = [
  //   "Latest",
  //   "Online",
  //   "Unread",
  //   "Sent",
  //   "Archive"
  // ];

  const [activeTab, setActiveTab] = useState("messanger");
  const renderContent = () => {
    switch (activeTab) {
      case "messanger":
        return <MessangerTab />
      case "group":
        return <GroupMessangerTab />
      default:
        return null;
    }
  };

 
  console.log("taking user id for message",messagereceiverId)


  return (
    <GlobalPageWrapper>
      <div className="chat-container mt-0">
        <div className="row p-0 g-0" style={{ height: "100vh" }}>
          {/* Sidebar */}
          <div className="col-md-4 col-lg-3 border rounded-4 my-5 d-flex flex-column">
            {/* Header */}
            <div className="p-3 border-bottom position-relative">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="text-white mb-0">Messages</h5>
                <div className="d-flex align-items-center">
                  <button className="btn btn-primary btn-sm me-2 rounded-pill mx-2">Select</button>
                  <button className="btn btn-icon me-2">
                    <FaCog className="icon-sm" />
                  </button>
                  <button className="btn btn-icon me-2">
                    <FaFolderOpen className="icon-sm" />
                  </button>
                  <button className="btn btn-icon " onClick={() => setShowPopup(!showPopup)}>
                    <FaEllipsisH className="icon-sm" />
                    {showPopup && (
                      <div
                        className="position-absolute left-0 mt-2 p-3"
                        style={{ zIndex: 1050, width: "250px" }}
                      >
                        <div
                          className="checkbox-dropdown p-3 rounded-2"
                          style={{
                            backgroundColor: "var(--color-border)",
                            border: "2px solid #343A40",
                          }}
                        >
                          {filter.map((label) => (
                            <div key={label}>
                              <label className="form-check d-flex align-items-center mb-2">
                                <input
                                  type="checkbox"
                                  className="form-check-input me-2"
                                  checked={selected.includes(label)}
                                  onChange={() => handleToggle(label)}
                                />
                                <span className="text-white">{label}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

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
                <button
                  className={`nav-link flex-fill ${activeTab === "messanger" ? "active" : ""}`}
                  onClick={() => setActiveTab("messanger")}
                  >Messenger</button>
                <button
                  className={`nav-link flex-fill ${activeTab === "group" ? "active" : ""}`}
                  onClick={() => setActiveTab("group")}
                >Group Messenger</button>
              </div>
            </div>

            {/* render optional component */}
            <div className="mt-3 w-100">{renderContent()}</div>

          </div>

          {/* Chat Area */}
          {/* <div className="col-md-8 col-lg-9 chat-area d-flex flex-column h-100 px-3 py-5 position-relative">

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

            
            <div style={{ height: "100vh", overflowX: "auto" }}>
              
              <div className="p-3 d-flex gap-2 align-items-center">
                <div className="message-bubble bg-success text-dark rounded-pill px-4" style={{ maxWidth: "60%" }}>
                  <p className="mb-0">Please add us to the USA DESI CPL group</p>
                  <span className="message-time small text-white">Mar 13, 2024 • 2 days</span>
                </div>
                <FaEllipsisH className="icon-sm" style={{ transform: "rotate(90deg)" }} />
              </div>

              
              <div className="p-3 d-flex justify-content-end align-items-center gap-2">
                <FaEllipsisH className="icon-sm" style={{ transform: "rotate(90deg)" }} />
                <div className="message-bubble bg-primary text-white rounded-pill px-4" style={{ maxWidth: "60%" }}>
                  <p className="mb-0">Sure! I’ll add you to the group now.</p>
                  <span className="message-time small text-light">Mar 13, 2024 • 2 days</span>
                </div>
              </div>
            </div>

            
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
          </div> */}
            <ChatComponent receiverId={messagereceiverId}/>

        </div>
      </div>
    </GlobalPageWrapper>
  );
};

export default Chat;
