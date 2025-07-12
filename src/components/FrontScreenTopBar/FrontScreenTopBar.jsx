import React, { useState } from "react";
import { FaBars, FaSearch, FaFacebookMessenger, FaBell, FaCog,FaTimes } from "react-icons/fa";

import "./css/topbar.css"
import FrontScreenLeftSidebar from "../FrontScreenLeftBar/FrontScreenLeftSidebar";

const FrontScreenTopBar = () => {
    const [appear, SetApper] = useState(true)
    return (
        <>
            <div
                className="topbar d-flex justify-content-between align-items-center px-3 py-4"
                style={{
                    background: "#212529",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1050,
                    height: "80px", // optional fixed height
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
                        />
                    </div>
                </div>

                {/* Right: Icons */}
                <div className="d-flex align-items-center gap-4 text-white">
                    <FaFacebookMessenger />
                    <FaBell className="position-relative" />
                    <div className="d-flex align-items-center gap-2">
                        <FaCog />
                        <span className="d-none d-md-inline">Settings</span>
                    </div>
                </div>
            </div>

            <FrontScreenLeftSidebar visiblity={appear} />

            {/* Add this to separate topbar from rest of the page */}
            <div style={{ height: "80px" }}></div>

            <hr
                style={{
                    margin: 0,
                    border: "none",
                    borderTop: "1px solid #343a40",
                    height: "0",
                }}
            />


        </>
    );
};

export default FrontScreenTopBar;
