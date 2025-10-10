import React, { useEffect, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { useAuth } from "../../../../context/AuthContextAPI";
import httpService from "../../../../helper/httpService";
// import { getLatestGroupMessage } from "../../../../helper/getLatestGroupMessage";
// import { useWebSocket } from "../../../../hooks/useWebSocket";
import { getLatestGroupMessage } from "../../../../helper/getLatestGroupMessage ";

const GroupMessangerTab = ({ websocket }) => {
  const { setGroupMessageId, setGroupMessageName } = useAuth();
  const [selectedChat, setSelectedChat] = useState("");
  const [groups, setGroups] = useState([]);
  // const websocket = useWebSocket();

  /** 🔹 Fetch groups on mount */
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await httpService("/groups/my-groups", "GET");
        let groupsData = res?.data?.groups || [];

        // Fetch latest messages for each group
        const groupsWithLatest = await Promise.all(
          groupsData.map(async (group) => {
            const latestMsg = await getLatestGroupMessage(group?.group?._id);
            return {
              ...group,
              latestMessage: latestMsg?.content || null,
              latestTime: latestMsg?.createdAt || null,
            };
          })
        );

        setGroups(groupsWithLatest);
      } catch (err) {
        console.log("❌ Error fetching groups:", err);
      }
    };

    fetchGroups();
  }, []);

  /** 🔹 Update selected group ID whenever it changes */
  useEffect(() => {
    setGroupMessageId(selectedChat);
  }, [selectedChat, setGroupMessageId]);

  /** 🔹 WebSocket listener for live updates */
  useEffect(() => {
    const handleNewGroupMessage = (message) => {
      setGroups((prevGroups) =>
        prevGroups.map((g) =>
          g?.group?._id === message.groupId
            ? {
                ...g,
                latestMessage: message.content,
                latestTime: message.createdAt,
              }
            : g
        )
      );
    };

    websocket.socket?.on("new_group_message", handleNewGroupMessage);

    return () => {
      websocket.socket?.off("new_group_message", handleNewGroupMessage);
    };
  }, [websocket]);

  /** 🔹 Pin / Mute handlers */
  const handlePin = (id) => {
    setGroups((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, pin: !item.pin } : item
      )
    );
  };

  const handleMute = (id) => {
    setGroups((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, mute: !item.mute } : item
      )
    );
  };

  return (
    <div className="chat-list flex-grow-1 overflow-auto">
      {groups.map((group, i) => (
        <div
          key={i}
          className={`chat-item p-3 ${
            selectedChat === group?.group?._id ? "active" : ""
          }`}
          onClick={() => {
            setSelectedChat(group?.group?._id);
            setGroupMessageName(group?.group?.name);
          }}
        >
          <div className="d-flex align-items-center">
            {/* Avatar */}
            <div className="position-relative">
              <div className="avatar">
                <span className="text-white fw-bold">G</span>
              </div>
              {group.online && <div className="online-indicator"></div>}
            </div>

            {/* Group Info */}
            <div className="flex-grow-1 ms-3">
              {/* Name & Actions */}
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="text-white mb-0">{group?.group?.name}</h6>
                <div className="d-flex justify-content-between align-items-center">
                  {(group.pin || group.mute) && (
                    <div className="d-flex gap-1 me-2">
                      {group.pin && (
                        <div
                          className="bg-primary rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: "23px", height: "23px" }}
                        >
                          <i className="bi bi-pin-angle-fill"></i>
                        </div>
                      )}
                      {group.mute && (
                        <div
                          className="bg-secondary rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: "23px", height: "23px" }}
                        >
                          <i className="bi bi-volume-mute-fill"></i>
                        </div>
                      )}
                    </div>
                  )}
                  <span className="time-text">
                    {group.latestTime
                      ? new Date(group.latestTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </span>
                </div>
              </div>

              {/* Message Preview & Dropdown */}
              <div className="d-flex justify-content-between align-items-center">
                <p className="message-preview mb-0">
                  {group.latestMessage || "Click to start message"}
                </p>

                <div className="dropdown">
                  <button
                    className="btn btn-icon-sm mb-1"
                    type="button"
                    id={`dropdownMenuButton-${group.id}`}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={(e) => e.stopPropagation()} // prevent parent click
                  >
                    <FaEllipsisH className="icon-xs" />
                  </button>

                  <ul
                    className="dropdown-menu dropdown-menu-dark"
                    aria-labelledby={`dropdownMenuButton-${group.id}`}
                    style={{ backgroundColor: "var(--color-border)" }}
                  >
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handlePin(group.id)}
                      >
                        Pin
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleMute(group.id)}
                      >
                        Mute
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item">Info Group</button>
                    </li>
                    <li>
                      <button className="dropdown-item text-danger">
                        Leave Group
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupMessangerTab;
