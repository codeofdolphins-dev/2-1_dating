import React, { useContext, useEffect, useState } from "react";
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
import httpService from "../../helper/httpService";

const FrontScreenTopBar = () => {
    const { setNotificationHandler } = useAuth();
    const [appear, SetApper] = useState(false)
    const [open, SetOpen] = useState(false)
    const navigate = useNavigate()
    const [user, SetUser] = useState([])

    const [showMenu, setShowMenu] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    //search state 
    const [search, setSearch] = useState("");
    // routesConfig.js


    useEffect(() => {
        if (!search) return; // prevent unnecessary calls when search is empty

        httpService("/users", "GET", {}, { params: { search } })
            .then((res) => {
                console.log("🔍 Search Result:", res?.data);
                SetUser(res?.data)
            })
            .catch((err) => {
                console.error("❌ Search API Error:", err);
            });
    }, [search]);


    const handleSetting = () => {
        SetOpen(!open)
        console.log(open)
    }


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
                            placeholder="Enter username to search...."
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
                                {user.length > 0 ? (
                                    user.map((u, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item d-flex align-items-center gap-2 text-white"
                                            style={{
                                                cursor: "pointer",
                                                backgroundColor: "transparent",
                                                border: "none",
                                                padding: "8px 12px",
                                            }}
                                            onClick={() => {
                                                navigate(`/profile/${u._id}`)
                                                setSearch("")
                                            }} // ✅ Go to profile by ID
                                        >
                                            {/* ✅ Profile Image */}
                                            <img
                                                src={u?.profile?.photos?.[0] || "https://dummyimage.com/300"} // fallback if no photo
                                                alt={u.username}
                                                style={{
                                                    width: "32px",
                                                    height: "32px",
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                }}
                                            />

                                            {/* ✅ Username */}
                                            <span
                                                style={{
                                                    fontSize: "14px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {u.username}
                                            </span>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-muted px-2">No users found</p>
                                )}

                            </ul>
                        )}

                    </div>

                </div>

                {/* Right: Icons */}
                <div className="d-flex align-items-center gap-4 text-white">
                    <FaFacebookMessenger onClick={() => navigate("/chat")} />
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
