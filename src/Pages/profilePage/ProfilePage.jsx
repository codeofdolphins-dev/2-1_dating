import React from 'react'
import PageWrapper from '../../components/PageWrapper'
import ProfileImg from "./img/profileImg.png"
import femaleIcon from "./img/female.png"
import male from "./img/male.png"
import ProfileImageCarousel from '../../components/profileImageCarousel/profileImageCarousel'
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
} from "react-icons/fa";
// import { MdLocalMovies, MdAdultContent } from "react-icons/md";
import { BsChatDots, BsBookmark } from "react-icons/bs";

const actionIcons = [
    { icon: <BsChatDots />, label: "Messenger" },
    // { icon: <MdLocalMovies />, label: "Adult" },
    // { icon: <MdAdultContent />, label: "Non-Adult" },
    { icon: <FaVideo />, label: "Videos" },
    { icon: <FaImages />, label: "Albums" },
    { icon: <FaUserFriends />, label: "Friends" },
    { icon: <FaThumbsUp />, label: "Likes" },
    { icon: <FaCheckCircle />, label: "Validate" },
    { icon: <FaShareAlt />, label: "Share" },
    { icon: <FaEnvelope />, label: "Invite" },
    { icon: <BsBookmark />, label: "Remember" },
    { icon: <FaHeart />, label: "Kiss" },
    { icon: <FaHeart />, label: "Kiss" },
    { icon: <FaHeart />, label: "Kiss" },
];


const ProfilePage = () => {
    return (
        <>
            <PageWrapper>
                <div className="container-fluid px-4 py-3">
                    <div className="row rounded-4 py-3" style={{ backgroundColor: "#343a40" }}>

                        {/* Left Column: Carousel */}
                        <div className="col-lg-4 mb-3 mb-lg-0">
                            <ProfileImageCarousel />
                        </div>

                        {/* Right Column: Content Placeholder */}
                        <div className="col-lg-8 text-white d-flex align-items-center justify-content-start">
                            <div className='w-100'>
                                <div className="px-2 rounded-4 text-white" style={{ backgroundColor: "#343a40" }}>
                                    <h5 className="fw-bold d-flex align-items-center gap-2">
                                        CPLSUEPAUL <span className="text-warning">★</span>
                                    </h5>
                                    <div className="d-flex gap-3 my-2">
                                        <span className="text-danger">♀ 57</span>
                                        <span className="text-primary">♂ 58</span>
                                    </div>

                                    <div className="mb-3">
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
                                    <div className="d-flex flex-wrap flex-lg-wrap justify-content-left gap-3 text-center mb-3">
                                        {actionIcons.map((item, index) => (
                                            <div key={index} className="d-flex flex-column align-items-center">
                                                <div
                                                    className="border border-1 rounded-circle fs-6 d-flex align-items-center justify-content-center"
                                                    style={{ width: "40px", height: "40px" }}
                                                >
                                                    {item.icon}
                                                </div>
                                                <small className="mt-1">{item.label}</small>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Bottom Info Strip */}
                                    <div className="bg-dark px-3 py-2 mt-5 rounded-3 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                                        <div className="text-white">
                                            <strong>Looking for:</strong>{" "}
                                            <span className="text-secondary">Girl on Girl | Soft Swap | Full Swap</span>
                                        </div>
                                        <div className="text-white">
                                            <strong>Interests:</strong>{" "}
                                            <span className="text-danger">♀ ♂</span>
                                        </div>
                                        <div className="text-white">
                                            <strong>Fantasy:</strong>{" "}
                                            <span className="text-secondary">Cuckold | Flashing | Wife swap</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            </PageWrapper>
        </>
    )
}

export default ProfilePage