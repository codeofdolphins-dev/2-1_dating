import React, { useEffect, useState } from 'react';
import FilterBar from "../../components/FilterBar/FilterBar";
import GlobalPageWrapper from '../../components/GlobalPageWrapper';
import ViewPageCard from '../../components/ViewPageCard/ViewPageCard';
import httpService from '../../helper/httpService';
import { showErrorToast, showSuccessToast } from '../../components/customToast/CustomToast';
import { useAuth } from '../../context/AuthContextAPI';
import OverlayLoader from '../../helper/OverlayLoader';
import PaginationWithSelector from '../../components/Pagination/PaginationWithSelector';
import Editor from 'react-simple-wysiwyg';
import { ToastContainer } from 'react-toastify';

const token = sessionStorage.getItem("jwtToken");

const options = [
  "accepted",
  "pending",
  "declined",
  "Latest",
  "Distance",
  "All",
  "Couples & females",
  "Couples",
  "Females",
  "Males",
  "Transgender"
];

const ProfileFriendsPage = () => {
  const [user, setUser] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [broadcastEditorPopup, setBroadcastEditorPopup] = useState(false);
  const [broadcastText, setBroadcastText] = useState('');
  const [broadcastUser, setBroadcastUser] = useState([]);
  const [viewType, setViewType] = useState("friends"); // 🔹 friends | requests

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [totalCount, setTotalCount] = useState(0);
  const [apiTotalPages, setApiTotalPages] = useState(0);

  const { filterOption } = useAuth();

  const handleRefreshByOkButton = () => {
    setRefresh((prev) => !prev);
  };

  // 🔹 Fetch data dynamically based on viewType
  const fetchData = () => {
    setLoading(true);

    const params = {
      page: currentPage,
      limit: itemsPerPage,
    };

    let apiURL = "/friends";
    if (viewType === "requests") {
      apiURL = "/friend-requests";
      params.status = "pending";
    } else if (filterOption && filterOption !== "All") {
      params.status = filterOption;
    }

    httpService(apiURL, "GET", {}, { params })
      .then((response) => {
        showSuccessToast(response?.message);

        const usersArray =
          response?.data?.friends ||
          response?.data?.data ||
          response?.data ||
          [];

        setUser(usersArray);
        setTotalCount(response?.meta?.pagination?.total || 0);
        setApiTotalPages(response?.data?.meta?.pagination?.totalPages || 0);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        showErrorToast(err?.response?.data?.message || "Something went wrong");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [refresh, filterOption, currentPage, itemsPerPage, viewType]);

  const broadcastBtn = () => {
    if (broadcastUser.length === 0) {
      showErrorToast("Select at least one member.");
      return;
    }

    setBroadcastEditorPopup((prev) => {
      let value = !prev;
      if (value === false) {
        setBroadcastText("");
        setBroadcastUser([]);
      }
      return value;
    });
  };

  const submitBroadcast = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    httpService(
      "/personal-messages/broadcast",
      "POST",
      {
        friendIds: broadcastUser,
        messageType: "text",
        content: broadcastText,
        mediaUrl: "https://www.google.com",
        fileName: "abc",
        fileSize: "15555766",
      },
      config
    )
      .then((res) => {
        if (res?.success) {
          showSuccessToast(res?.message || "Broadcast sent successfully!");
          setBroadcastEditorPopup(false);
          setBroadcastText("");
          setBroadcastUser([]);
        } else {
          showErrorToast(res?.message || "Failed to send broadcast");
        }
      })
      .catch((err) => {
        console.error(err);
        showErrorToast(err?.response?.data?.message || "Something went wrong");
      });
  };

  // 🔹 Toggle between Friends and Requests
  const toggleView = () => {
    setViewType((prev) => (prev === "friends" ? "requests" : "friends"));
  };

  return (
    <>
      <GlobalPageWrapper>
        <OverlayLoader show={loading} text="Please wait..." />
        <FilterBar
          pageName={viewType === "friends" ? "Friends" : "Friend Requests"}
          filterName2="Filter"
          filter2={options}
          okButton={true}
          handleRefreshByOkButton={handleRefreshByOkButton}
          broadcastBtn={broadcastBtn}
          // 🔹 Added toggle button callback
          frndReqButton={toggleView}
          toggleButtonLabel={
            viewType === "friends" ? "Friend Requests" : "Friends"
          }
        />

        <div className="container-fluid">
          {/* Broadcast Popup */}
          {broadcastEditorPopup && (
            <div className="my-2">
              <Editor
                className="bg-white"
                value={broadcastText}
                onChange={(e) => setBroadcastText(e.target.value)}
              />

              <div className="mt-3 d-flex gap-3 align-items-center justify-content-end">
                <button
                  onClick={broadcastBtn}
                  className="bg-secondary border-0 rounded-4 px-3 text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={submitBroadcast}
                  className="bg-primary border-0 rounded-4 px-5 text-white"
                >
                  Send
                </button>
              </div>
            </div>
          )}

          {/* Friend List */}
          <div className="row g-4 pt-4">
            {loading ? (
              <h4 className="text-white">Loading...</h4>
            ) : user.length > 0 ? (
              user.map((userData, index) => (
                <div
                  className="col-12 col-sm-6 col-lg-6 col-xl-4"
                  key={index}
                >
                  <ViewPageCard
                    card={userData}
                    checkbox={true}
                    userName={
                      userData?.username || userData?.senderId?.username
                    }
                    images={userData?.profile?.photos}
                    index={index}
                    showFriendOptions={true}
                    timestamp={false}
                    refresh={refresh}
                    setrefresh={setRefresh}
                    broadcastUser={broadcastUser}
                    setBroadcastUser={setBroadcastUser}
                  />
                </div>
              ))
            ) : (
              <h4 className="text-white text-center">
                {viewType === "friends"
                  ? "No Friends Found"
                  : "No Friend Requests"}
              </h4>
            )}

            {user?.length > 0 && (
              <PaginationWithSelector
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                totalCount={totalCount}
                apiTotalPages={apiTotalPages}
              />
            )}
          </div>
        </div>
      </GlobalPageWrapper>
        <ToastContainer />
    </>
  );
};

export default ProfileFriendsPage;
