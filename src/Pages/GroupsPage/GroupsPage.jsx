import React, { useState, useEffect } from "react";
import GlobalPageWrapper from "../../components/GlobalPageWrapper";
import FilterBar from "../../components/FilterBar/FilterBar";
import { useNavigate } from "react-router-dom";
import Groups from "../../components/profilePageBottomCards/groupCard/Groups";
import CreateGroupPopup from "../../components/CreateGroupPopup/CreateGroupPopup";
import httpService from "../../helper/httpService";
import OverlayLoader from "../../helper/OverlayLoader";

const GroupsPage = () => {
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupData, setGroupData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isMyGroupPage, setIsMyGroupPage] = useState(false); // ✅ false = Groups, true = My Groups

  const navigate = useNavigate();

  // ✅ Fetch groups
  useEffect(() => {
    setLoading(true);
    httpService("/groups", "GET")
      .then((res) => {
        console.log("group fetch res:", res);
        setGroupData(res?.data?.groups || []);
      })
      .catch((err) => {
        console.error("Error fetching groups:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refresh]);

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
        navigationPageName2={"+Create A Group"} // ✅ Hide when "My Groups"
        navigationToAnotherPage2={handleOpenGroupModal}
        filterName2={!isMyGroupPage ? "Filter" : null} // ✅ Hide when "My Groups"
      />

      <div className="client-page-background">
        <div className="container-fluid">
          <div className="row g-4 pt-4">
            {loading ? null : groupData.length > 0 ? (
              groupData.map((card, index) => (
                <div
                  className="col-12 col-sm-12 col-lg-12 col-xl-4 mt-0"
                  key={index}
                >
                  <Groups index={index} groupData={card} />
                </div>
              ))
            ) : (
              <p className="text-center text-muted">No groups available.</p>
            )}
          </div>
        </div>
      </div>

      <CreateGroupPopup
        show={showGroupModal}
        handleClose={() => setShowGroupModal(false)}
        refreshGroups={() => setRefresh((prev) => !prev)}
      />

      {/* ✅ Loader */}
      <OverlayLoader show={loading} text="Loading groups..." />
    </GlobalPageWrapper>
  );
};

export default GroupsPage;
