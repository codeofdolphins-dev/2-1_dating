import React, { useEffect, useState } from "react";
import GlobalPageWrapper from "../../components/GlobalPageWrapper";
import FilterBar from "../../components/FilterBar/FilterBar";
import ChatroomCard from "../../components/ChatroomCard/ChatroomCard";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { showErrorToast, showWarningToast } from "../../components/customToast/CustomToast";
import httpService from "../../helper/httpService";

import "react-toastify/dist/ReactToastify.css";
import OverlayLoader from "../../helper/OverlayLoader";

const ChatroomGroupPageList = () => {
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleToAnotherPage = () => {
    navigate("/create_chatroom");
  };

  const handlEtakeToChatRoom = async (card) => {
    console.log("chatroom card info", card);

    try {
      // ✅ Join chatroom
      const joinRes = await httpService(`/chatrooms/${card._id}/join`, "POST");
      console.log("join chatroom response", joinRes);

      toast.success("User joined successfully", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });

      // ✅ Optimistically update chatrooms
      setChatRooms((prevRooms) =>
        prevRooms.map((room) =>
          room._id === card._id
            ? { ...room, participants: [...room.participants, { _id: "temp-user" }] }
            : room
        )
      );

      // ✅ Fetch updated chatroom
      const chatroomRes = await httpService(`/chatrooms/${card._id}`, "GET");

      navigate("/chatroom", { state: chatroomRes?.data || card });
    } catch (error) {

      if (error?.response?.data?.message === "Already in room") {
        navigate("/chatroom", { state: card }); // fallback
        showWarningToast(error?.response?.data?.message)
      } else {
        console.error("Chatroom Join or Fetch Failed:", error);
        showErrorToast(error?.response?.data?.message || "Failed to join chatroom");
        navigate("/chatrooms", { state: card }); // fallback
      }
    }
  };

  useEffect(() => {
    httpService("/chatrooms", "GET")
      .then((res) => {
        setChatRooms(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch chatrooms:", err);
        setLoading(false);
        showErrorToast(
          `Please login again. ${err?.response?.data?.message || "An error occurred."}`
        );
      });
  }, []);

  return (
    <>
      {/* ✅ Toast Container (must exist once in the app) */}
      <ToastContainer />
      <GlobalPageWrapper>
        <OverlayLoader show={loading} text="Please wait..." />
        <FilterBar
          pageName={"Chatrooms"}
          navigationPageName2={"Chatroom"}
          navigationToAnotherPage2={handleToAnotherPage}
        />
        <div className="client-page-background mt-1 pb-4" style={{ minHeight: "100vh" }}>
          <div className="container-fluid">
            <div className="row g-4 justify-content-left px-2">
              {chatRooms.length === 0 ? (
                <div className="text-white">No chatroom Found</div>
              ) : (
                chatRooms.map((room) => (
                  <div
                    className="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center"
                    style={{ marginBottom: "-25px", padding: "5px" }}
                    key={room._id}
                  >
                    <ChatroomCard
                      groupId={room._id}
                      title={room.name}
                      date={room.updatedAt}
                      members={room.participants.length}
                      handlEtakeToChatRoom={() => handlEtakeToChatRoom(room)}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </GlobalPageWrapper>
    </>
  );
};

export default ChatroomGroupPageList;
