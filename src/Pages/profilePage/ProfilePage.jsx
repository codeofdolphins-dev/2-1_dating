import React, { useEffect, useState } from 'react'
import PageWrapper from '../../components/PageWrapper'
import ProfileImg from "./img/profileImg.png"
import femaleIcon from "./img/female.png"
import male from "./img/male.png"
import couple from "./img/couple.png"
import ProfileImageCarousel from '../../components/profileImageCarousel/profileImageCarousel'
import cameraxxx from "./img/camera-xxx.png";
// import camera from "./img/camera-xxx.png"
import { Container, Row, Col } from "react-bootstrap";
import {
    FaMapMarkerAlt,
    FaUserFriends,
    FaImages,
    FaVideo,
    FaCheckCircle,
    FaThumbsUp,
    FaShareAlt,
    FaEnvelope,
    FaHeart,
    FaCamera
} from "react-icons/fa";
// import { MdLocalMovies, MdAdultContent } from "react-icons/md";
import { BsChatDots, BsBookmark } from "react-icons/bs";
// import ProfilePageTable from '../../components/profilePageTable/ProfilePageTable'
import ProfilePageCertificationCard from '../../components/profilePageBottomCards/certificationCard/ProfilePageCertificationCard'
import ProfilePageCertificationCardContainer from '../../components/profileBottomTabSection/ProfilePageCertificationCardContainer'
import ProfilePageTable from '../../components/profilePageTable/ProfilePageTable'
import ProfilePageGroupCardContainer from '../../components/profileBottomTabSection/ProfilePageGroupCardContainer'
import PartiesAndeventCardContainer from '../../components/profileBottomTabSection/PartiesAndeventCardContainer'
import ProfilePageFollowingCardContainer from '../../components/profileBottomTabSection/ProfilePageFollowingCardContainer'
import FriendsCardContainer from '../../components/profileBottomTabSection/FriendsCardContainer'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import { showErrorToast, showSuccessToast, showWarningToast } from '../../components/customToast/CustomToast'

const actionIcons = [
    { icon: <BsChatDots />, label: "Messenger" },
    // { icon: <MdLocalMovies />, label: "Adult" },
    // { icon: <MdAdultContent />, label: "Non-Adult" },
    { icon: <FaCamera />, label: "Non-adult" },
    // { icon: cameraxxx, label: "Adult Photo" }, ,
    { icon: <FaVideo />, label: "Videos" },
    { icon: <FaImages />, label: "Albums" },
    { icon: <FaUserFriends />, label: "Friends" },
    { icon: <FaThumbsUp />, label: "Likes" },
    { icon: <FaCheckCircle />, label: "Validate" },
    { icon: <FaShareAlt />, label: "Share" },
    { icon: <FaEnvelope />, label: "Invite" },
    { icon: <BsBookmark />, label: "Remember" },
    { icon: <FaHeart />, label: "Kiss" }
];

const tabs = [
    { label: "Certifications" },
    { label: "Groups", count: 983 },
    { label: "Parties & Events" },
    { label: "Following", count: 129 },
    { label: "Friends", count: 1737 },
];

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("Certifications");
    // const [userData, setUserData] = useState(null)
    // const [chckToken, setCheckToken] = useState(null)
    const location = useLocation();
    const { userId, username, role } = location.state || {};
    console.log("profileId", userId)
    console.log(location.state)

    useEffect(() => {
        axios({
            method: 'post',
            url: `${import.meta.env.VITE_BASE_URL}/users/${userId}/view`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`,
                'Content-Type': 'application/json' // optional
            },
            data: {
                source: "profile_link"
            }
        }).then(response => {
            console.log(response)
            showWarningToast(response?.data?.message)
        })
            .catch(error => {
                console.error(error);
                showErrorToast(error)
            });
    }, [])


    return (
        <>
            <PageWrapper>
                <div className="container-fluid px-4 py-3 pt-5" style={{ backgroundColor: "var(--color-background)" }}>
                    {/* Profile slider section */}
                    <div className="row rounded-4 py-3" style={{ backgroundColor: "var(--color-border)", border: "1px solid #ffffff" }}>
                        {/* Left Column: Carousel */}
                        <div className="col-lg-4 mb-3 mb-lg-0">
                            <ProfileImageCarousel />
                        </div>

                        {/* Right Column: Content Placeholder */}
                        <div className="col-lg-8 text-white d-flex align-items-center justify-content-start">
                            <div className="w-100">
                                <div className="px-2 rounded-4 text-white" style={{ backgroundColor: "var(--color-border)" }}>
                                    <div className="mb-4">
                                        <h5 className="fw-bold fs-2 d-flex align-items-center gap-2">
                                            {username} <span className="text-warning">★</span>
                                        </h5>
                                        <div className="d-flex gap-3 my-2 fw-bold">
                                            <div className="d-flex align-items-center gap-1">
                                                <img src={femaleIcon} alt="female" height={15} />
                                                <div className="text-danger">57</div>
                                            </div>
                                            <div className="d-flex align-items-center gap-1">
                                                <img src={male} alt="male" height={15} />
                                                <div className="text-danger">57</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-5">
                                        <div className="d-flex align-items-center gap-2 mb-1">
                                            <FaMapMarkerAlt />
                                            <span>94555, CA 94555, USA | 8412 mi</span>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <FaMapMarkerAlt />
                                            <span>Vancouver, CAN | 7645 mi</span>
                                        </div>
                                    </div>

                                    {/* Action Icons */}
                                    <div className="d-flex flex-wrap gap-3 text-center mb-3">
                                        {actionIcons.map((item, index) => (
                                            <div key={index} className="d-flex flex-column align-items-center">
                                                <div
                                                    className="border border-1 rounded-circle fs-6 d-flex align-items-center justify-content-center"
                                                    style={{ width: "40px", height: "40px" }}
                                                >
                                                    {React.isValidElement(item.icon)
                                                        ? item.icon
                                                        : <img src={item.icon} alt="" height={20} />}
                                                </div>
                                                <small className="mt-1">{item.label}</small>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Bottom Info Strip */}
                                    <div className=" px-3 py-3 mt-5 rounded-3 d-flex flex-wrap gap-3 justify-content-between align-items-center" style={{ backgroundColor: "var(--color-primary-green)" }}>
                                        <div className="text-black">
                                            <strong>Looking for:</strong>{" "}
                                            <span className="text-secondary">Girl on Girl | Soft Swap | Full Swap</span>
                                        </div>
                                        <div className="text-black d-flex gap-2">
                                            <div><strong>Interests:</strong>{" "}</div>
                                            <div className='d-flex'>
                                                <div><img src={femaleIcon} height={20} alt="" /></div>
                                                <div><img src={couple} alt="" height={20} /></div>
                                            </div>
                                        </div>
                                        <div className="text-black">
                                            <strong>Fantasy:</strong>{" "}
                                            <span className="text-secondary">Cuckold | Flashing | Wife swap</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lifetime member section */}
                    <div className="row mt-2">
                        <div className="col-12 ">
                            <div className="rounded-4 py-4 px-4" style={{ backgroundColor: "var(--color-border)", border: "1px solid white" }}>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h4 className="mb-0 text-white fs-2">Lifetime Member</h4>
                                    <div className="px-4 py-2 rounded-pill text-black fw-semibold" style={{ backgroundColor: "var(--color-primary-green)", cursor: "pointer" }}>
                                        Translate
                                    </div>
                                </div>
                                <div className='text-white fs-6'>
                                    <div style={{ lineHeight: "10px" }}>Brown Couple for fun </div> <br />

                                    <div > We like to experience more fun with other couples and very select single females. We tried this fun and liked it so much that we decided to explore more. We like to add verity and spice to our routine.We are easy going, fun loving, looking to have fun. We like go out dancing, clubs We like to meet like minded folks who can be discrete friends with extra benefits.</div>

                                    <br /> <div>WE ARE NOT INTO ONE NIGHTERS</div> <br />

                                    <div>
                                        Looking for couples or very select single females to add some spice to our routine. Just write us, and we'll go from there. We like people with good sense of humor, easygoing and fun to be around with. We like to go dancing, beaches and fine dining. We like to get to know the others and go from there. Drop us a line if you like what you see and read and we can go from there.
                                    </div> <br />

                                    <div>PLEASE NO ONE NIGHTERS - We are not a couple who's goign to wham-bam after meeting for ten minutes, we know some people think lets meet and bang is fun but we are not for that. We want to get to know you first & If there is a connection then it's go!!!!</div> <br />

                                    <div>He likes to watch and join in. She likes to watch and join in. She likes to have girl on girl fun and Loves it.</div> <br />

                                    <div>
                                        To: Any other institutions using this or any site or its associated sites for projects - You do not have</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* profile table */}
                    <div className='p-3 rounded-4 mt-4' style={{ backgroundColor: "var(--color-border)" }}>
                        <ProfilePageTable femaleIcon={femaleIcon} male={male} />
                    </div>

                    {/* bottom tab section */}

                    <div
                        className="border-bottom d-flex flex-wrap justify-content-between align-items-center px-3 py-3 gap-3"
                        style={{ cursor: "pointer" }}
                    >
                        <div className="d-flex flex-wrap align-items-center justify-content-between px-3 py-3 gap-3">
                            {/* Tabs */}
                            <div className="d-flex flex-wrap gap-4 flex-grow-1 align-items-center">
                                {tabs.map((tab) => {
                                    const isActive = activeTab === tab.label;
                                    return (
                                        <div
                                            className="d-flex align-items-center gap-1 cursor-pointer pb-2"
                                            key={tab.label}
                                            onClick={() => setActiveTab(tab.label)}
                                        >
                                            <span
                                                className={`${isActive ? "fw-semibold  " : "text-light"}`}
                                                style={
                                                    isActive
                                                        ? {
                                                            color: "var(--color-primary-green)",
                                                            borderBottom: "2px solid var(--color-primary-green)"
                                                        }
                                                        : {
                                                            color: "#ffffff"
                                                        }
                                                }
                                            >
                                                {tab.label}
                                            </span>

                                            {tab.count !== undefined && (
                                                <span style={
                                                    isActive
                                                        ? {
                                                            color: "var(--color-primary-green)",
                                                        }
                                                        : {
                                                            color: "#ffffff"
                                                        }
                                                }>
                                                    ({tab.count})
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                        {/* Show All Button aligned right */}
                        <div className="ms-auto">
                            <button className="px-4 py-2 text-black rounded-pill border-0" style={{ backgroundColor: "var(--color-primary-green)" }}>
                                Show All
                            </button>
                        </div>


                    </div>



                    {activeTab === "Certifications" ? <ProfilePageCertificationCardContainer /> : activeTab === "Groups" ? <ProfilePageGroupCardContainer /> : activeTab === "Parties & Events" ? <PartiesAndeventCardContainer /> : activeTab === "Following" ? <ProfilePageFollowingCardContainer /> : activeTab === "Friends" && <FriendsCardContainer />}
                    {/* <ProfilePageCertificationCard/> */}
                </div>

             <ToastContainer/>

            </PageWrapper>
        </>
    )
}

export default ProfilePage;