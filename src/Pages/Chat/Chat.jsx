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
// import httpService from "../../helper/httpService";

import ChatComponent from "../../services/ChatComponent"
import { useAuth } from "../../context/AuthContextAPI";
import GroupChatComponent from "../../services/GroupChatComponent";
import WebSocketService from "../../services/websocket";
import { useWebSocket } from "../../hooks/useWebSocket";
// import WebSocketService from './services/websocket';


const Chat = () => {
  const { messagereceiverId, groupMessageId } = useAuth()
  // const [message, setMessage] = useState("");
  // const [users, Setusers] = useState([])


  const [showPopup, setShowPopup] = useState(false)
  
  const websocket = useWebSocket();


  const [activeTab, setActiveTab] = useState("group");
  const renderContent = () => {
    switch (activeTab) {
      case "messanger":
        return <MessangerTab websocket={websocket} />
      case "group":
        return <GroupMessangerTab websocket={websocket} />
      default:
        return null;
    }
  };


  console.log("taking user id for message", messagereceiverId)


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
          {
            activeTab === "messanger" ? <ChatComponent receiverId={messagereceiverId} websocket={websocket} /> : activeTab === "group" && <GroupChatComponent groupMessageId={groupMessageId} websocket={websocket} />
          }


        </div>
      </div>
    </GlobalPageWrapper>
  );
};

export default Chat;
