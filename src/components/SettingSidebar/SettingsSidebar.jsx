import React from 'react';
import {
    FaUser, FaWrench, FaMapMarkerAlt, FaUserFriends, FaUserPlus, FaEye, FaThumbsUp,
    FaBan, FaStickyNote, FaClock, FaLock, FaBell, FaTools, FaBug, FaUserSlash, FaPhone
} from 'react-icons/fa';

import "./css/style.css"

const SettingSidebar = ({open}) => {
    console.log(open)
    const menuItems = [
        { icon: <FaUser />, label: "Profile" },
        { icon: <FaWrench />, label: "Account" },
        { icon: <FaMapMarkerAlt />, label: "Location" },
        { icon: <FaUserFriends />, label: "Friends" },
        { icon: <FaUserPlus />, label: "Invite Friends" },
        { icon: <FaEye />, label: "Views" },
        { icon: <FaThumbsUp />, label: "Likes / Dislike" },
        { icon: <FaBan />, label: "Blocklist" },
        { icon: <FaStickyNote />, label: "Notes" },
        { icon: <FaClock />, label: "Remembered" },
        { icon: <FaLock />, label: "Privacy" },
        { icon: <FaBell />, label: "Notifications" },
        { icon: <FaTools />, label: "Member Service" },
        { icon: <FaBug />, label: "Bug report" },
        { icon: <FaUserSlash />, label: "Hide profile" },
        { icon: <FaPhone />, label: "Contact & Help" }
    ];

    return (
        <div
            className={`bg-dark text-white p-3   ${open ? " slide-left" : "slide-right"}`}
            style={{
                width: "250px",
                height: "100vh",
                position: "fixed",
                right: 0,
                top: 0,
                overflowY: "auto",
            }}
        >
            <ul className={`list-unstyled m-0 `}>
                {menuItems.map((item, idx) => (
                    <li key={idx} className="d-flex align-items-center mb-3 hover-effect">
                        <span className="me-2">{item.icon}</span>
                        <span>{item.label}</span>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default SettingSidebar;
