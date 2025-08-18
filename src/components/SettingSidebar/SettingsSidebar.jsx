import React from 'react';
import {
    FaUser, FaWrench, FaMapMarkerAlt, FaUserFriends, FaUserPlus, FaEye, FaThumbsUp,
    FaBan, FaStickyNote, FaClock, FaLock, FaBell, FaTools, FaBug, FaUserSlash, FaPhone
} from 'react-icons/fa';

import "./css/style.css"
import { useNavigate } from 'react-router-dom';

const SettingSidebar = ({open}) => {
    const navigate = useNavigate()
    const menuItems = [
        { icon: <FaUser />, label: "Profile",PageLink:"/current-user-profile" },
        { icon: <FaWrench />, label: "Account",PageLink:"/profile-account" },
        { icon: <FaMapMarkerAlt />, label: "Location", PageLink: "/location" },
        { icon: <FaUserFriends />, label: "Friends",PageLink:"/profile-friends" },
        { icon: <FaUserPlus />, label: "Invite Friends",PageLink:"/invite-friend" },
        { icon: <FaEye />, label: "Views",PageLink:"/profile-views" },
        { icon: <FaThumbsUp />, label: "Likes/Dislike",PageLink:"/profile-like-dislike" },
        { icon: <FaBan />, label: "Blocklist", PageLink: "/blocklist" },
        { icon: <FaStickyNote />, label: "Notes", PageLink: "/notes" },
        { icon: <FaClock />, label: "Remembered", PageLink: "/remembered" },
        { icon: <FaLock />, label: "Privacy", PageLink: "/privacy" },
        { icon: <FaBell />, label: "Notifications" },
        { icon: <FaTools />, label: "Member Service", PageLink:"/profile-member-service" },
        { icon: <FaBug />, label: "Bug report",PageLink:"/bug-report" },
        { icon: <FaUserSlash />, label: "Hide profile", PageLink:"/hide-profile" },
        { icon: <FaPhone />, label: "Contact & Help",PageLink:"/contact-and-help" }
    ];

    const handleNavigate = (pageLink) =>{
         navigate(pageLink)
    }

    return (
        <div
            className={`text-white p-3   ${open ? " slide-left" : "slide-right"}`}
            style={{
                width: "250px",
                height: "100vh",
                position: "fixed",
                right: 0,
                top: 80,
                overflowY: "auto",
                zIndex: "2800",
                backgroundColor:"var(--color-background)"
            }}
        >
            <ul className={`list-unstyled m-0 `} style={{cursor:"pointer"}}>
                {menuItems.map((item, idx) => (
                    <li key={idx} className="d-flex align-items-center mb-3 hover-effect" onClick={()=>handleNavigate(item.PageLink)}>
                        <span className="me-2">{item.icon}</span>
                        <span>{item.label}</span>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default SettingSidebar;
