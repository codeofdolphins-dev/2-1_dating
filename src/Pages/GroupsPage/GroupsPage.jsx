import React, { useState, useEffect } from "react";
import GlobalPageWrapper from "../../components/GlobalPageWrapper";
import FilterBar from "../../components/FilterBar/FilterBar";
import { useNavigate } from "react-router-dom";
import Groups from "../../components/profilePageBottomCards/groupCard/Groups";
import CreateGroupPopup from "../../components/CreateGroupPopup/CreateGroupPopup";
import httpService from "../../helper/httpService";
import OverlayLoader from "../../helper/OverlayLoader"; // ✅ import your loader

const GroupsPage = () => {
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupData, setGroupData] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ handles loader
  const [refresh, setRefresh] = useState(false); // ✅ trigger refetch
  const [isMyGroupPage, setIsMyGroupPage] = useState("groups"); // ✅ default page

  const navigate = useNavigate();

  // ✅ Fetch group data
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
  }, [refresh]); // ✅ refetch when refresh changes

  const handleNavigation = (page) => {
    if (page === "my-groups") {
      setIsMyGroupPage("my-groups");
      navigate("/my-groups");
    } else if (page === "groups") {
      setIsMyGroupPage("groups");
      navigate("/groups");
    }
  };

  const handleOpenGroupModal = () => {
    setShowGroupModal(true);
  };

  return (
    <GlobalPageWrapper>
      {isMyGroupPage === "groups" ? (
        <FilterBar
          pageName={"Groups"}
          navigationPageName1={"My Groups"}
          navigationPageName2={"+Create A Group"}
          navigationToAnotherPage={() => handleNavigation("my-groups")}
          navigationToAnotherPage2={handleOpenGroupModal}
          filterName2={"Filter"}
        />
      ) : (
        <FilterBar
          pageName={"My Groups"}
          navigationPageName1={"Groups"}
          navigationToAnotherPage={() => handleNavigation("groups")}
          navigationToAnotherPage2={handleOpenGroupModal}
        />
      )}

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
        refreshGroups={() => setRefresh((prev) => !prev)} // ✅ toggle refresh to refetch
      />

      {/* ✅ Loader overlay */}
      <OverlayLoader show={loading} text="Loading groups..." />
    </GlobalPageWrapper>
  );
};

export default GroupsPage;
