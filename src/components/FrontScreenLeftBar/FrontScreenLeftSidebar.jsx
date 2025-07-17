import React from "react";
import {
    FaHome, FaEnvelope, FaEye, FaUsers, FaFire, FaComments, FaVideo,
    FaUserPlus, FaCalendarAlt, FaFilm, FaAward, FaCertificate, FaUsersCog,
    FaUserCheck, FaStar, FaAddressBook, FaBed, FaUserFriends, FaBullhorn,
    FaTags
} from "react-icons/fa";

import { Link } from "react-router-dom";
import logo from "./Img/logo.png";
import "./css/leftBar.css";

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
            <div style={{ overflowY: "auto" }} className="flex-grow-1 custom-scrollbar">
                <div className="text-start mb-4">
                    <img src={logo} alt="2+1 Logo" className="logo-img" height={50} />
                </div>
                <ul className="list-unstyled">
                    <SidebarItem icon={<FaHome />} label="Feed & updates" pageUrl="/feed" />
                    <SidebarItem icon={<FaEnvelope />} label="Instant Messages" pageUrl="/messages" />
                    <SidebarItem icon={<FaEye />} label="Viewed Me" pageUrl="/viewed" />
                    <SidebarItem icon={<FaUsers />} label="Online Now" pageUrl="/online" />
                    <SidebarItem icon={<FaFire />} label="Hot Date" pageUrl="/hotdate" />
                    <SidebarItem icon={<FaComments />} label="Chatrooms" pageUrl="/chatrooms" />
                    <SidebarItem icon={<FaVideo />} label="Live stream" pageUrl="/livestream" />
                    <SidebarItem icon={<FaUserPlus />} label="New Members" pageUrl="/new-members" />
                    <SidebarItem icon={<FaCalendarAlt />} label="Events and Parties" pageUrl="/events" />
                    <SidebarItem icon={<FaFilm />} label="Videos" pageUrl="/videos" />
                    <SidebarItem icon={<FaAward />} label="Travel Date" pageUrl="/travel" />
                    <SidebarItem icon={<FaCertificate />} label="Certifications" pageUrl="/certifications" />
                    <SidebarItem icon={<FaStar />} label="Wall of Fame" pageUrl="/wall-of-fame" />
                    <SidebarItem icon={<FaUsers />} label="Groups" pageUrl="/groups" />
                    <SidebarItem icon={<FaUserCheck />} label="Request Admin Verification" pageUrl="/admin-verification" />
                    <SidebarItem icon={<FaStar />} label="Spotlight Members" pageUrl="/spotlight" />
                    <SidebarItem icon={<FaAddressBook />} label="Contacts" pageUrl="/contacts" />
                    <SidebarItem icon={<FaBed />} label="Bed & Breakfast" pageUrl="/bnb" />
                    <SidebarItem icon={<FaUserFriends />} label="Invite Friends" pageUrl="/invite" />
                    <SidebarItem icon={<FaTags />} label="Classifieds" pageUrl="/classifieds" />
                    <SidebarItem icon={<FaBullhorn />} label="Advertise" pageUrl="/advertise" />

                    <button className="btn btn-danger w-75 rounded-pill mt-5">
                        Sign Out
                    </button>
                </ul>
            </div>
        </div>
    );
};

// Updated SidebarItem to support routing
const SidebarItem = ({ icon, label, pageUrl }) => {
    const content = (
        <div className="d-flex align-items-center text-white">
            <span className="me-2">{icon}</span>
            <span>{label}</span>
        </div>
    );

    return (
        <li className="sidebar-item mb-4">
            {pageUrl ? (
                <Link to={pageUrl} className="text-decoration-none">
                    {content}
                </Link>
            ) : (
                content
            )}
        </li>
    );
};

export default FrontScreenLeftSidebar;
