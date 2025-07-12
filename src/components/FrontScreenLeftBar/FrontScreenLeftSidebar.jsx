import React from "react";
import {
    FaHome, FaEnvelope, FaEye, FaUsers, FaFire, FaComments, FaVideo,
    FaUserPlus, FaCalendarAlt, FaFilm, FaAward, FaCertificate, FaUsersCog,
    FaUserCheck, FaStar, FaAddressBook, FaBed, FaUserFriends, FaBullhorn,
    FaTags
} from "react-icons/fa";

import logo from "./Img/logo.png"
import "./css/leftBar.css"

const FrontScreenLeftSidebar = ({ visiblity }) => {
    return (
        <div
            className={`sidebar ${visiblity ? "slide-in" : "slide-out"} d-flex flex-column justify-content-between p-3`}
            style={{
                backgroundColor: "#343a40",
                width: "280px",
                position: "fixed",
                top: "80px",
                height: "100vh",
                zIndex: 1000,
                overflowY: "auto"
            }}
        >
            {/* Scrollable Content */}
            <div style={{ overflowY: "auto" }} className="flex-grow-1 custom-scrollbar">
                <div className="text-start mb-4">
                    <img src={logo} alt="2+1 Logo" className="logo-img" height={50} />
                </div>
                <ul className="list-unstyled" style={{ height: "150vh" }}>
                    <SidebarItem icon={<FaHome />} label="Feed & updates" />
                    <SidebarItem icon={<FaEnvelope />} label="Instant Messages" />
                    <SidebarItem icon={<FaEye />} label="Viewed Me" />
                    <SidebarItem icon={<FaUsers />} label="Online Now" />
                    <SidebarItem icon={<FaFire />} label="Hot Date" />
                    <SidebarItem icon={<FaComments />} label="Chatrooms" />
                    <SidebarItem icon={<FaVideo />} label="Live stream" />
                    <SidebarItem icon={<FaUserPlus />} label="New Members" />
                    <SidebarItem icon={<FaCalendarAlt />} label="Events and Parties" />
                    <SidebarItem icon={<FaFilm />} label="Videos" />
                    <SidebarItem icon={<FaAward />} label="Travel Date" />
                    <SidebarItem icon={<FaCertificate />} label="Certifications" />
                    <SidebarItem icon={<FaStar />} label="Wall of Fame" />
                    <SidebarItem icon={<FaUsers />} label="Groups" />
                    <SidebarItem icon={<FaUserCheck />} label="Request Admin Verification" />
                    <SidebarItem icon={<FaStar />} label="Spotlight Members" />
                    <SidebarItem icon={<FaAddressBook />} label="Contacts" />
                    <SidebarItem icon={<FaBed />} label="Bed & Breakfast" />
                    <SidebarItem icon={<FaUserFriends />} label="Invite Friends" />
                    <SidebarItem icon={<FaTags />} label="Classifieds" />
                    <SidebarItem icon={<FaBullhorn />} label="Advertise" />
                    <button className="btn btn-danger w-75 rounded-pill mt-5">
                        Sign Out
                    </button>

                </ul>
            </div>

            {/* Fixed Bottom Button */}

        </div>


    );
};

const SidebarItem = ({ icon, label }) => (
    <li className="sidebar-item d-flex align-items-center mb-4 text-white">
        <span className="me-2">{icon}</span>
        <span>{label}</span>
    </li>
);

export default FrontScreenLeftSidebar;
