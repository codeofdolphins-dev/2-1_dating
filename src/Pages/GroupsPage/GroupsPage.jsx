import React, { useState, useEffect } from "react";
import GlobalPageWrapper from "../../components/GlobalPageWrapper";
import FilterBar from "../../components/FilterBar/FilterBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import Groups from "../../components/profilePageBottomCards/groupCard/Groups";
import CreateGroupPopup from "../../components/CreateGroupPopup/CreateGroupPopup";
import httpService from "../../helper/httpService";

const GroupsPage = () => {
    const [showGroupModal, setShowGroupModal] = useState(false);
    const [groupData, setGroupData] = useState([]);
    const navigate = useNavigate();

    

    // ✅ Fetch group data
    useEffect(() => {
        httpService("/groups", "GET")
            .then((res) => {
                console.log("group fetch res:", res);
                setGroupData(res?.data?.groups || []);
            })
            .catch((err) => {
                console.error("Error fetching groups:", err);
            });
    }, []);

    const handleNavigationPage1 = () => {
        navigate("/my-groups");
    };

    const handleNavigatePage2 = () => {
        setShowGroupModal(true);
    };

    return (
        <GlobalPageWrapper>
            <FilterBar
                pageName={"Groups"}
                navigationPageName1={"My Groups"}
                navigationPageName2={"+Create A Group"}
                navigationToAnotherPage={handleNavigationPage1}
                navigationToAnotherPage2={handleNavigatePage2}
                filterName2={"Filter"}
            />

            <div className="client-page-background">
                <div className="container-fluid">
                    <div className="row g-4 pt-4">
                        {groupData.length > 0 ? (
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
            />
        </GlobalPageWrapper>
    );
};

export default GroupsPage;
