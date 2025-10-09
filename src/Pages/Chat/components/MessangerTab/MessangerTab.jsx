import React, { useEffect, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import httpService from "../../../../helper/httpService";
import { useAuth } from "../../../../context/AuthContextAPI";
import { useWebSocket } from "../../../../hooks/useWebSocket";
import { getUsersLatstMessage } from "../../../../helper/getUsersLatstMessage";

const MessangerTab = ({ websocket }) => {
  const {
    setMessageReceiverId,
    setMessageReceiverName,
    setMessageSenderName,
    myUserId,
  } = useAuth();

  const [selectedChat, setSelectedChat] = useState(null);
  const [contacts, setContacts] = useState([]);
  // const websocket = useWebSocket();

  /** 🔹 Fetch contacts with latest message once on mount */
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await httpService(`/friends`, "GET");
        let contactsData = res?.data?.friends || [];
        console.log("friends", res);


        const contactsWithLatest = await Promise.all(
          contactsData.map(async (contact) => {
            const latestMsg = await getUsersLatstMessage(contact._id);
            return {
              ...contact,
              latestMessage: latestMsg?.content || null,
              latestTime: latestMsg?.createdAt || null,
            };
          })
        );

        setContacts(contactsWithLatest);
        localStorage.setItem("chatImg",contacts?.profile?.photos?.[0])
      } catch (err) {
        console.error("❌ Failed to load contacts:", err);
      }
    };

    fetchContacts();

  }, []); // ✅ empty array ensures it runs only once


  /** 🔹 Update context when chat changes */
  useEffect(() => {
    if (selectedChat) {
      setMessageReceiverId(selectedChat._id);
      setMessageReceiverName(selectedChat.username);
      setMessageSenderName(selectedChat.username);
    }
  }, [selectedChat, setMessageReceiverId, setMessageReceiverName, setMessageSenderName]);

  /** 🔹 WebSocket listener for live personal messages */
  useEffect(() => {
    const handleNewPersonalMessage = (message) => {
      setContacts((prevContacts) =>
        prevContacts.map((c) =>
          c._id === (message.senderId === myUserId ? message.receiverId : message.senderId)
            ? {
              ...c,
              latestMessage: message.content,
              latestTime: message.createdAt,
            }
            : c
        )
      );
    };

    websocket.socket?.on("new_personal_message", handleNewPersonalMessage);

    return () => {
      websocket.socket?.off("new_personal_message", handleNewPersonalMessage);
    };

  
  }, [websocket, myUserId]);

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
                  <div
                    className="avatar d-flex align-items-center justify-content-center bg-secondary text-white fw-bold"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      overflow: "hidden",
                      fontSize: 16,
                      textTransform: "uppercase",
                    }}
                  >
                    {/* {contact?.profile?.photos?.[0] ? (
                      <img
                        src={contact.profile.photos[0]}
                        alt={contact.username}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      contact.username?.charAt(0) || "U"
                    )} */}

                     
                     
                     {contact?.username?.charAt(0) || "U"}
                    
                  </div>

                </span>
              </div>
              {contact.online && <div className="online-indicator"></div>}
            </div>

            {/* Contact info */}
            <div className="flex-grow-1 ms-3">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="text-white mb-0">{contact.username}</h6>
                <span className="time-text">
                  {contact.latestTime
                    ? new Date(contact.latestTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    : ""}
                </span>
              </div>
              <p className="message-preview mb-0">
                {contact.latestMessage || "Click to start chat"}
              </p>
            </div>

            {/* Actions */}
            <div className="d-flex flex-column align-items-end">
              <button
                className="btn btn-icon-sm mb-1"
                onClick={(e) => e.stopPropagation()} // stop parent click
              >
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
