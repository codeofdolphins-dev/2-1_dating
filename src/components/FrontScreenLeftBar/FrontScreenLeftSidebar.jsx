import {
    FaHome, FaEnvelope, FaEye, FaUsers, FaFire, FaComments, FaVideo,
    FaUserPlus, FaCalendarAlt, FaFilm, FaAward, FaCertificate, FaStar,
    FaAddressBook, FaBed, FaUserFriends
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "./Img/logo.png";
import "./css/leftBar.css";
import { showSuccessToast } from "../customToast/CustomToast";

const FrontScreenLeftSidebar = ({ visiblity }) => {
    const location = useLocation(); // 🔹 Track current route

    return (
        <div
            className={`sidebar ${visiblity ? "slide-in" : "slide-out"} d-flex flex-column`}
            style={{
                backgroundColor: "var(--color-background)",
                width: "280px",
                position: "fixed",
                top: "80px",
                height: "100vh",
                zIndex: 1000,
            }}
        >
            {/* Scrollable content */}
            <div className="flex-grow-1 overflow-auto p-3">
                <div className="text-start mb-4">
                    <img src={logo} alt="2+1 Logo" className="logo-img" height={50} />
                </div>
                <ul className="list-unstyled">
                    <SidebarItem icon={<FaHome />} label="2+1 Feed" pageUrl="/feed" active={location.pathname === "/feed"} />
                    <SidebarItem icon={<FaEnvelope />} label="Messages" pageUrl="/chat" active={location.pathname === "/chat"} />
                    <SidebarItem icon={<FaEye />} label="Viewed Me" pageUrl="/view" active={location.pathname === "/view"} />
                    <SidebarItem icon={<FaUsers />} label="Online" pageUrl="/online" active={location.pathname === "/online"} />
                    <SidebarItem icon={<FaFire />} label="Hot Date" pageUrl="/hotdate" active={location.pathname === "/hotdate"} />
                    <SidebarItem icon={<FaComments />} label="Chatrooms" pageUrl="/chatrooms" active={location.pathname === "/chatrooms"} />
                    <SidebarItem icon={<FaVideo />} label="Live stream" pageUrl="/livestream" active={location.pathname === "/livestream"} />
                    <SidebarItem icon={<FaUserPlus />} label="New Members" pageUrl="/new-members" active={location.pathname === "/new-members"} />
                    <SidebarItem icon={<FaCalendarAlt />} label="Parties and Events" pageUrl="/events" active={location.pathname === "/events"} />
                    <SidebarItem icon={<FaFilm />} label="Videos" pageUrl="/videos" active={location.pathname === "/videos"} />
                    <SidebarItem icon={<FaAward />} label="Travel Date" pageUrl="/traveldate" active={location.pathname === "/traveldate"} />
                    <SidebarItem icon={<FaCertificate />} label="Certifications" pageUrl="/certifications" active={location.pathname === "/certifications"} />
                    <SidebarItem icon={<FaStar />} label="Wall of Fame" pageUrl="/wall-of-fame" active={location.pathname === "/wall-of-fame"} />
                    <SidebarItem icon={<FaUsers />} label="Groups" pageUrl="/groups" active={location.pathname === "/groups"} />
                    <SidebarItem icon={<FaStar />} label="Featured Members" pageUrl="/featured-members" active={location.pathname === "/featured-members"} />
                    <SidebarItem icon={<FaAddressBook />} label="Contest" pageUrl="/contests" active={location.pathname === "/contests"} />
                    <SidebarItem icon={<FaBed />} label="Add Vacations Rental" pageUrl="/vacations-rental-details" active={location.pathname === "/vacations-rental-details"} />
                    <SidebarItem icon={<FaUserFriends />} label="2+1" pageUrl="/two-plus-one" active={location.pathname === "/two-plus-one"} />
                    
                    <SidebarItem className=" w-100 mt-4 text-center" label="Report" pageUrl="/advertise" active={location.pathname === "/advertise"} />
                    <SidebarItem className="btn btn-danger w-100 rounded-pill mt-2" label="Logout" />
                </ul>
                <div className="p-5 text-center"></div>
            </div>
        </div>
    );
};

const SidebarItem = ({ icon, label, pageUrl, className, active }) => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        sessionStorage.removeItem("jwtToken");
        const token = sessionStorage.getItem("jwtToken");
        if (!token) {
            showSuccessToast("Logout success");
        }
        setTimeout(() => {
            navigate("/login");
        }, 4500);
    };

    const content = (
        <div
            className={`d-flex align-items-center sidebar-link px-3 py-2 rounded ${active ? "active-link" : ""}`}
            style={{ cursor: "pointer" }}
        >
            <span className="me-2">{icon}</span>
            <span className={className}>{label}</span>
        </div>
    );

    return (
        <li className="sidebar-item mb-3">
            {pageUrl ? (
                <Link to={pageUrl} className="text-decoration-none">
                    {content}
                </Link>
            ) : (
                <button className="btn btn-danger w-100 rounded-pill" onClick={handleLogOut}>
                    LogOut
                </button>
            )}
        </li>
    );
};

export default FrontScreenLeftSidebar;
