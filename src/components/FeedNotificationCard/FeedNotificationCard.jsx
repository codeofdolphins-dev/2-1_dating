import React from "react";
// import moment from "moment";

const FeedNotificationCard = ({ notification }) => {
  return (
    <div
      className="d-flex flex-column p-3 mb-3 rounded"
      style={{
        backgroundColor: "var(--color-border)",
        border: "1px solid #ffffff",
        color: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="m-0 text-primary">{notification.title}</h5>
        {/* <span
          style={{
            backgroundColor:
              notification.priority === "high"
                ? "#dc3545"
                : notification.priority === "medium"
                ? "#ffc107"
                : "#198754",
            color: "#000",
            fontSize: "12px",
            borderRadius: "6px",
            padding: "2px 8px",
          }}
        >
          {notification.priority.toUpperCase()}
        </span> */}
      </div>

      <p className="mb-2" style={{ fontSize: "14px", color: "#ccc" }}>
        {notification.message}
      </p>

      <div
        className="d-flex justify-content-between align-items-center"
        style={{ fontSize: "12px", color: "#999" }}
      >
        <span>Type: {notification.type}</span>
        <span>{notification.createdAt}</span>
      </div>
    </div>
  );
};

export default FeedNotificationCard;
