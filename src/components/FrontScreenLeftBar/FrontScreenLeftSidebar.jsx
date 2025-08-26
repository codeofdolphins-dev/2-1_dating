import {
    FaHome, FaEnvelope, FaEye, FaUsers, FaFire, FaComments, FaVideo,
    FaUserPlus, FaCalendarAlt, FaFilm, FaAward, FaCertificate, FaUsersCog,
    FaUserCheck, FaStar, FaAddressBook, FaBed, FaUserFriends, FaBullhorn,
    FaTags
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "./Img/logo.png";
import "./css/leftBar.css";
import { showSuccessToast } from "../customToast/CustomToast";
import { ToastContainer } from "react-toastify";


const FrontScreenLeftSidebar = ({ visiblity }) => {



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
                    <SidebarItem icon={<FaHome />} label="2+1 Feed" pageUrl="/feed" />
                    <SidebarItem icon={<FaEnvelope />} label="Messages" pageUrl="/chat" />
                    <SidebarItem icon={<FaEye />} label="Viewed Me" pageUrl="/view" />
                    <SidebarItem icon={<FaUsers />} label="Online" pageUrl="/online" />
                    <SidebarItem icon={<FaFire />} label="Hot Date" pageUrl="/hotdate" />
                    <SidebarItem icon={<FaComments />} label="Chatrooms" pageUrl="/chatrooms" />
                    <SidebarItem icon={<FaVideo />} label="Live stream" pageUrl="/livestream" />
                    <SidebarItem icon={<FaUserPlus />} label="New Members" pageUrl="/new-members" />
                    <SidebarItem icon={<FaCalendarAlt />} label="Parties and Events" pageUrl="/events" />
                    <SidebarItem icon={<FaFilm />} label="Videos" pageUrl="/videos" />
                    <SidebarItem icon={<FaAward />} label="Travel Date" pageUrl="/traveldate" />
                    <SidebarItem icon={<FaCertificate />} label="Certifications" pageUrl="/certifications" />
                    <SidebarItem icon={<FaStar />} label="Wall of Fame" pageUrl="/wall-of-fame" />
                    <SidebarItem icon={<FaUsers />} label="Groups" pageUrl="/groups" />
                    {/* <SidebarItem icon={<FaUserCheck />} label="Admin Verification" pageUrl="/admin-verification" /> */}
                    <SidebarItem icon={<FaStar />} label="Featured Members" pageUrl="/featured-members" />
                    <SidebarItem icon={<FaAddressBook />} label="Contest" pageUrl="/contests" />
                    <SidebarItem icon={<FaBed />} label="Add Vacations Rental" pageUrl="/vacations-rental-details" />
                    <SidebarItem icon={<FaUserFriends />} label="2+1" pageUrl="/two-plus-one" />
                    {/* <SidebarItem icon={<FaTags />} label="Classifieds" pageUrl="/classifieds" />
                    <SidebarItem icon={<FaBullhorn />} label="Advertise" pageUrl="/advertise" /> */}
                    <SidebarItem className=" w-100 mt-4 text-center" label="Report" pageUrl="/advertise" />
                    <SidebarItem className="btn btn-danger w-100 rounded-pill mt-2" label="Logout" />
                </ul>
                {/* Bottom Sign Out Button */}
                {/* <button className="btn btn-danger w-100 rounded-pill">
                Sign Out
            </button> */}
                <div className="p-5 text-center">
                </div>
            </div>

        </div>
    );
};

const SidebarItem = ({ icon, label, pageUrl, className }) => {
    const content = (
        <div className="d-flex align-items-center text-white">
            <span className="me-2">{icon}</span>
            <span className={className}>{label}</span>
        </div>
    );
    const navigate =useNavigate() 
    const handleLogOut = () => {
        sessionStorage.removeItem('jwtToken');
        const token = sessionStorage.getItem("jwtToken");
        if (!token) {
            showSuccessToast("Logout success")
        }

        setTimeout(()=>{
          navigate("/login")
        },4500)
    }

    return (
        <li className="sidebar-item mb-3">
            {pageUrl ? (
                <Link to={pageUrl} className="text-decoration-none">
                    {content}
                </Link>
            ) : <button className="btn btn-danger w-100 rounded-pill" onClick={handleLogOut}>
                LogOut
            </button>}
        </li>
    );
};

export default FrontScreenLeftSidebar;
