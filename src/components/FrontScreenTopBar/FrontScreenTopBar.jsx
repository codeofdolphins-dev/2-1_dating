import React, { useState } from "react";
import { FaBars, FaSearch, FaFacebookMessenger, FaBell, FaCog } from "react-icons/fa";
import "./css/topbar.css"
import FrontScreenLeftSidebar from "../FrontScreenLeftBar/FrontScreenLeftSidebar";

const FrontScreenTopBar = () => {
    const [appear, SetApper] = useState(true)
    return (
        <>
            <div className="topbar d-flex justify-content-between align-items-center px-3 py-4" style={{ background: "#212529" }}>
                {/* Left: Hamburger + Search */}
                <div className="d-flex align-items-center gap-3">
                    <button className="btn btn-outline-light rounded-circle icon-btn" onClick={() => SetApper(!appear)}>
                        <FaBars />
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
            <hr
                style={{
                    margin: 0,
                    border: "none",
                    borderTop: "1px solid #343a40", // custom color
                    height: "0" // must be 0 for proper rendering
                }}
            />

        </>
    );
};

export default FrontScreenTopBar;
