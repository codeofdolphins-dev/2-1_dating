import React, { useState } from "react";
import httpService from "../../helper/httpService";
import { showErrorToast, showSuccessToast } from "../customToast/CustomToast";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../context/AuthContextAPI";
import WarningPopup from "../WarningPopup/WarningPopup";

const CardAction = ({ data, friendRequestId, feedId }) => {
  console.log("dddd", feedId)
  const [warningMessage, setWarningMessage] = useState("");
  const [warningShow, setWarningShow] = useState(false);
  const [actionType, setActionType] = useState(null); // "accept" | "delete"
  const { setGlobalToggle, globalToggle } = useAuth();

  const handleConfirm = () => {
    if (actionType === "accept") {
      httpService(`/friend-requests/${friendRequestId}/respond`, "PUT", { action: "accept" })
        .then((res) => {
          showSuccessToast(res?.message || "Friend request accepted successfully!");
          setGlobalToggle(!globalToggle);
          if (res?.message) {
            httpService(`/feed/${feedId}`, "DELETE")
              .then(() => {
                setGlobalToggle(!globalToggle);
              })
              .catch((err) => {
                showErrorToast(err?.response?.data?.message || "Failed to remove friend request.");
              })
          }
        })
        .catch((err) => {
          showErrorToast(err?.response?.data?.message || "Something went wrong!");
        })
        .finally(() => setWarningShow(false));
    } else if (actionType === "delete") {
      httpService(`/feed/${feedId}`, "DELETE")
        .then(() => {
          showSuccessToast("Friend request removed successfully!");
          setGlobalToggle(!globalToggle);
        })
        .catch((err) => {
          showErrorToast(err?.response?.data?.message || "Failed to remove friend request.");
        })
        .finally(() => setWarningShow(false));
    }
  };

  const handleAcceptFriendRequest = () => {
    setActionType("accept");
    setWarningMessage("Are you sure you want to accept this friend request?");
    setWarningShow(true);
  };

  const handleRemoveFriendRequest = () => {
    setActionType("delete");
    setWarningMessage("Are you sure you want to delete this friend request?");
    setWarningShow(true);
  };

  return (
    <>
      <div
        className="text-white p-2 rounded d-flex flex-column align-center justify-content-center h-100"
        style={{
          backgroundColor: "var(--color-border)",
          border: "2px solid #ffffff",
        }}
      >
        <div className="d-flex flex-column align-items-center gap-5 my-5">
          <button
            type="button"
            className="btn btn-primary rounded-pill"
            style={{ padding: "5px 120px" }}
            onClick={handleAcceptFriendRequest}
          >
            Accept
          </button>
          <button
            type="button"
            className="btn btn-danger rounded-pill"
            style={{ padding: "5px 120px" }}
            onClick={handleRemoveFriendRequest}
          >
            Deny
          </button>
        </div>

        <WarningPopup
          text={warningMessage}
          setWarningShowPopup={setWarningShow}
          warningShowPopup={warningShow}
          onConfirm={handleConfirm}
        />
      </div>

      <ToastContainer />
    </>
  );
};

export default CardAction;
