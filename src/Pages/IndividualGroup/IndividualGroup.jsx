import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaStar,
  FaMapMarkerAlt,
  FaThumbsUp,
  FaComment,
  FaCheck,
  FaPhotoVideo,
} from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import httpService from "../../helper/httpService";
import { showSuccessToast } from "../../components/customToast/CustomToast";
import { ToastContainer } from "react-toastify";
import GlobalPageWrapper from "../../components/GlobalPageWrapper";
import FilterBar from "../../components/FilterBar/FilterBar";
import ViewPageCard from "../../components/ViewPageCard/ViewPageCard";
import style from "./style.module.css";

export default function IndividualGroup() {
  const [groupData, setGroupdata] = useState(null);
  const [members, setMembers] = useState([]);
  const [activeTab, setActiveTab] = useState("MEMBERS"); // default active tab

  const [searchParams] = useSearchParams();
  const id = searchParams.get("user");
  const navigate = useNavigate();

  const tabs = [
    { label: "FORUM", count: members.length },
    { label: "VISUALS", count: groupData?.photos?.length || 0 },
    { label: "MEMBERS", count: groupData?.posts?.length || 0 },
  ];

  useEffect(() => {
    if (!id) return;

    // Get group info
    httpService(`/groups/${id}`, "GET")
      .then((res) => {
        setGroupdata(res?.data?.group);
        setMembers(res?.data?.group?.recentMembers || []);
      })
      .catch((err) => console.error("Group fetch error:", err));

    // Get all members
    httpService(`/groups/${id}/members`, "GET")
      .then((res) => {
        setMembers((prev) => [...prev, ...(res?.data?.members || [])]);
      })
      .catch((err) => console.error("Members fetch error:", err));
  }, [id]);

  const handleLeaveGroup = () => {
    httpService(`/groups/${id}/leave`, "POST")
      .then((res) => {
        showSuccessToast(res?.message);
        setTimeout(() => navigate("/groups"), 500);
      })
      .catch((err) => console.error("Leave group error:", err));
  };

  const timestamp = groupData?.updatedAt;
  const date = timestamp ? new Date(timestamp) : null;
  const formattedDate = date
    ? date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : "";

  return (
    <>
      <GlobalPageWrapper>
        <FilterBar pageName={groupData?.name} filterName1="filter" />

        <div className="container-fluid p-0">
          {/* Header */}
          <div className="text-white p-3 rounded mb-3 d-flex flex-wrap gap-3">
            <div className="h-25">
              <img
                src="https://dummyimage.com/300x100"
                alt="logo"
                className="me-2"
              />
            </div>
            <div className="my-auto">
              <div>
                <h5>
                  since {formattedDate} | {members.length} members
                </h5>
              </div>
              <h3 className="fw-bold mt-2">{groupData?.name}</h3>
              <div className="text-info">
                <a
                  href="#"
                  className="me-3"
                  style={{ textDecoration: "none" }}
                  onClick={handleLeaveGroup}
                >
                  Leave group
                </a>
                | &nbsp;
                <a href="#" className="me-3" style={{ textDecoration: "none" }}>
                  Block Notifications
                </a>
                | &nbsp;
                <a href="#" style={{ textDecoration: "none" }}>
                  Share
                </a>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-bottom d-flex flex-wrap justify-content-between align-items-center px-3 py-3 gap-3 mt-0">
            <div className="d-flex flex-wrap gap-4 flex-grow-1 align-items-center">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.label;
                return (
                  <div
                    key={tab.label}
                    className="d-flex align-items-center gap-1 pb-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => setActiveTab(tab.label)}
                  >
                    <span
                      className={`${isActive ? "fw-semibold" : "text-light"}`}
                      style={
                        isActive
                          ? {
                              color: "var(--color-primary-green)",
                              borderBottom:
                                "2px solid var(--color-primary-green)",
                            }
                          : { color: "#ffffff" }
                      }
                    >
                      {tab.label}
                    </span>
                    <span
                      style={
                        isActive
                          ? { color: "var(--color-primary-green)" }
                          : { color: "#ffffff" }
                      }
                    >
                      ({tab.count})
                    </span>
                  </div>
                );
              })}
            </div>

           
          </div>

          {/* Member Grid */}
          <div className="row g-3 mt-2">
            {members.map((m, index) => (
              <div
                className="col-12 col-sm-6 col-lg-6 col-xl-4 pt-3 "
                key={index}
              >
                <ViewPageCard index={index} timestamp card={m} showTime />
              </div>
            ))}
          </div>
        </div>
      </GlobalPageWrapper>
      <ToastContainer />
    </>
  );
}
