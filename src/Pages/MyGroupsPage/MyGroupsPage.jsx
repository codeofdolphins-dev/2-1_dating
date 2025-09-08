import React, { useEffect, useState } from "react";
import GlobalPageWrapper from "../../components/GlobalPageWrapper";
import FilterBar from "../../components/FilterBar/FilterBar";
import { useNavigate } from "react-router-dom";
import Groups from "../../components/profilePageBottomCards/groupCard/Groups";
import CreateGroupPopup from "../../components/CreateGroupPopup/CreateGroupPopup";
import httpService from "../../helper/httpService";

const MyGroupsPage = () => {
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myGroupData, setMyGroupData] = useState([]);
  const [isMyGroupPage, setIsMyGroupPage] = useState(true); // ✅ start as My Groups

  const navigate = useNavigate();

  // ✅ Fetch my group data
  useEffect(() => {
    setLoading(true);
    httpService("/groups/my-groups", "GET")
      .then((res) => {
        console.log("group fetch res:", res?.data?.groups);
        setMyGroupData(res?.data?.groups || []);
      })
      .catch((err) => {
        console.error("Error fetching groups:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // ✅ Handle navigation toggle
  const handleNavigationToggle = () => {
    if (isMyGroupPage) {
      setIsMyGroupPage(false);
      navigate("/groups");
    } else {
      setIsMyGroupPage(true);
      navigate("/my-groups");
    }
  };

  const handleOpenGroupModal = () => {
    setShowGroupModal(true);
  };

  return (
    <GlobalPageWrapper>
      <FilterBar
        pageName={isMyGroupPage ? "My Groups" : "Groups"}
        navigationPageName1={isMyGroupPage ? "All Groups" : "My Groups"}
        navigationToAnotherPage={handleNavigationToggle}
        navigationPageName2={"+Create A Group"} // ✅ Hide when on My Groups
        navigationToAnotherPage2={handleOpenGroupModal}
        filterName2={!isMyGroupPage ? "Filter" : null} // ✅ Hide when on My Groups
      />

      <div className="client-page-background">
        <div className="container-fluid">
          <div className="row g-4 pt-4">
            {myGroupData.length > 0 ? (
              myGroupData.map((card, index) => (
                <div
                  className="col-12 col-sm-12 col-lg-12 col-xl-4 mt-0"
                  key={index}
                >
                  <Groups index={index} groupData={card} />
                </div>
              ))
            ) : (
              <p className="text-center text-muted">
                {loading ? "Loading groups..." : "No groups available."}
              </p>
            )}
          </div>
        </div>
      </div>

      <CreateGroupPopup
        show={showGroupModal}
        handleClose={() => setShowGroupModal(false)}
      />
    </GlobalPageWrapper>
  );
};

export default MyGroupsPage;
