import React, { useContext, useState } from "react";
import { FaBars, FaSearch, FaFacebookMessenger, FaBell, FaCog, FaTimes } from "react-icons/fa";

import "./css/topbar.css"
import FrontScreenLeftSidebar from "../FrontScreenLeftBar/FrontScreenLeftSidebar";
import SettingSidebar from "../SettingSidebar/SettingsSidebar";
import { useAuth } from "../../context/AuthContextAPI";
import { useNavigate } from "react-router-dom";
import {
    FaHome, FaEnvelope, FaEye, FaUsers, FaFire, FaComments, FaVideo,
    FaUserPlus, FaCalendarAlt, FaFilm, FaAward, FaCertificate, FaUsersCog,
    FaUserCheck, FaStar, FaAddressBook, FaBed, FaUserFriends, FaBullhorn,
    FaTags
} from "react-icons/fa";

const FrontScreenTopBar = () => {
    const { setNotificationHandler } = useAuth();
    const [appear, SetApper] = useState(false)
    const [open, SetOpen] = useState(false)
    const navigate = useNavigate()

    //search state 
    const [search, setSearch] = useState("");
    // routesConfig.js

    const users = [
  { path: "/", name: "Home", icon: <FaHome /> },
  { path: "/subscription", name: "Subscription", icon: <FaEnvelope /> },
  { path: "/login", name: "Login", icon: <FaEye /> },
  { path: "/registration", name: "Registration", icon: <FaFire /> },
  { path: "/second_registration", name: "Second Registration", icon: <FaUserPlus /> },
  { path: "/chat", name: "Chat", icon: <FaComments /> },
  { path: "/business_profile", name: "Business Profile", icon: <FaFilm /> },

  // Front-screen
  { path: "/feed", name: "Feed", icon: <FaCertificate /> },
  { path: "/profile", name: "Profile", icon: <FaAward /> },
  { path: "/view", name: "Views", icon: <FaUsers /> },
  { path: "/online", name: "Online", icon: <FaUsers /> },
  { path: "/hotdate", name: "Hot Date", icon: <FaCalendarAlt /> },
  { path: "/create-speeddate", name: "Create Speeddate", icon: <FaCalendarAlt /> },
  { path: "/livestream", name: "Live Stream", icon: <FaVideo /> },
  { path: "/messages", name: "Messages", icon: <FaComments /> },
  { path: "/events", name: "Events", icon: <FaCalendarAlt /> },
  { path: "/search", name: "Search", icon: <FaSearch /> },
  { path: "/groups", name: "Groups", icon: <FaUsers /> },
  { path: "/privacy", name: "Privacy", icon: <FaUsersCog /> },
  { path: "*", name: "Not Found", icon: <FaUserCheck /> },
];


    const handleSetting = () => {
        SetOpen(!open)
        console.log(open)
    }

    // Filter users based on search term
    const filteredUsers = users.filter((user) =>
        user?.name.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <>
            <div
                className="topbar d-flex justify-content-between align-items-center px-3 py-4"
                style={{
                    background: "var(--color-border)",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 55550,
                    height: "80px", // optional fixed height
                    cursor: "pointer"
                }}
            >
                {/* Left: Hamburger + Search */}
                <div className="d-flex align-items-center gap-3">
                    <button
                        className="btn btn-outline-light rounded-circle icon-btn position-relative overflow-hidden"
                        onClick={() => SetApper(!appear)}
                        style={{
                            width: "50px",
                            height: "50px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <span className={`icon-layer ${appear ? "fade-out" : "fade-in"}`}>
                            <FaBars />
                        </span>
                        <span className={`icon-layer ${appear ? "fade-in" : "fade-out"}`}>
                            <FaTimes />
                        </span>
                    </button>

                    <div className="search-container position-relative">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            className="form-control search-input"
                            placeholder="Enter text to search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                backgroundColor: "var(--color-background)",
                                border: "2px solid #343a40",
                            }}
                        />

                        {search && (
                            <ul
                                className="search-list position-absolute mt-1"
                                style={{
                                    top: "100%",
                                    left: 0,
                                    width: "100%",
                                    backgroundColor: "var(--color-border)",
                                    border: "1px solid #ddd",
                                    borderRadius: "5px",
                                    zIndex: 1000,
                                }}
                            >
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user, index) => (
                                        <li key={index} className="list-group-item" onClick={()=>navigate(`${user?.path}`)}>
                                            {user.icon} {user.name}
                                        </li>
                                    ))
                                ) : (
                                    <li className="list-group-item text-white">No results found</li>
                                )}
                            </ul>
                        )}
                    </div>

                </div>

                {/* Right: Icons */}
                <div className="d-flex align-items-center gap-4 text-white">
                    <FaFacebookMessenger  onClick={()=>navigate("/chat")}/>
                    <FaBell className="position-relative" onClick={() => {
                        navigate("/feed")
                        setNotificationHandler()
                    }
                    } />
                    <div className="d-flex align-items-center gap-2" onClick={handleSetting}>
                        <FaCog />
                        <span className="d-none d-md-inline" >Settings</span>
                    </div>
                </div>
            </div>

            <FrontScreenLeftSidebar visiblity={appear} />

            {/* Add this to separate topbar from rest of the page */}
            <div style={{ height: "40px" }}></div>

            <hr
                style={{
                    margin: 0,
                    border: "none",
                    borderTop: "1px solid #343a40",
                    height: "0",
                }}
            />
            <SettingSidebar open={open} />

        </>
    );
};

export default FrontScreenTopBar;
