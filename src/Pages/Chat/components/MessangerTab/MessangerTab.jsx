import React, { useEffect, useState } from "react";
import { FaPhone, FaVideo, FaEllipsisH } from "react-icons/fa";
import httpService from "../../../../helper/httpService";
import { useAuth } from "../../../../context/AuthContextAPI";

const MessangerTab = () => {
  const { setMessageReceiverId, setMessageReceiverName } = useAuth();

  const [selectedChat, setSelectedChat] = useState(null);
  const [contacts, setContacts] = useState([]);

  /** 🔹 Fetch contacts */
  useEffect(() => {
    httpService(`/users`, "GET")
      .then((response) => {
        setContacts(response?.data || []);
      })
      .catch((err) => {
        console.error("❌ Failed to load contacts:", err);
      });
  }, []);

  /** 🔹 Update context when chat changes */
  useEffect(() => {
    if (selectedChat) {
      setMessageReceiverId(selectedChat._id);
      setMessageReceiverName(selectedChat.username);
    }
  }, [selectedChat, setMessageReceiverId, setMessageReceiverName]);

  return (
    <div className="chat-list flex-grow-1 overflow-auto">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className={`chat-item p-3 ${selectedChat?._id === contact._id ? "active" : ""}`}
          onClick={() => setSelectedChat(contact)}
          style={{ cursor: "pointer" }}
        >
          <div className="d-flex align-items-center">
            {/* Avatar */}
            <div className="position-relative">
              <div className="avatar">
                <span className="text-white fw-bold">
                  {contact.username?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              {contact.online && <div className="online-indicator"></div>}
            </div>

            {/* Contact info */}
            <div className="flex-grow-1 ms-3">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="text-white mb-0">{contact.username}</h6>
                {/* <span className="time-text">{contact.time || "now"}</span> */}
              </div>
              <p className="message-preview mb-0">
                {contact.message || "Click to start chat"}
              </p>
            </div>

            {/* Actions */}
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
  );
};

export default MessangerTab;
