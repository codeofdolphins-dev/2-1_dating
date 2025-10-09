import React from "react";
import httpService from "../../helper/httpService";

const CardAction = ({ data }) => {
  console.log("info show", data)

  const handleAcceptFriendRequest = () => {
    httpService(`/friend-requests/${data?.relatedUserId?._id}/respond`, "PUT", { "action": "accept" })
      .then((res) => {
        console.log("friend request", res)
      })
      .catch((err) => {
        console.log("friend request", err)
      })
  }

  return (
    <div
      className="text-white  p-2 rounded d-flex flex-column align-center justify-content-center h-100"
      style={{
        backgroundColor: "var(--color-border)",
        border: "2px solid #ffffff",
      }}
    >
      <div className="d-flex flex-column align-items-center gap-5 my-5">
        <button
          type="button"
          className="btn btn-primary rounded-pill "
          style={{ padding: "5px 120px" }}
          onClick={handleAcceptFriendRequest}
        >
          Accept
        </button>
        <button
          type="button"
          className="btn btn-danger rounded-pill "
          style={{ padding: "5px 120px" }}
        >
          Deny
        </button>
      </div>
    </div>
  );
};

export default CardAction;
