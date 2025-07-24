import { useRef, useEffect, useState } from "react";
import { FaMale, FaFemale, FaEye, FaClock, FaMobileAlt, FaComments, FaTabletAlt } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./style.css";

import videocardImg from '../../assets/cardImgs/Images/Img.png'
import chat from '../../assets/cardImgs/Images/chat.png'
import pc from '../../assets/cardImgs/Images/pc.png'
import phone from '../../assets/ViwCardImags/img/phone.png'
import female from "../../assets/cardImgs/Images/female.png"
import male from "../../assets/cardImgs/Images/male.png"
import MessengerPopup from "../MessengerPopup/MessengerPopup";
import ActionMenu from "../ViewPageCard/ActionMenu/Actionmenu";
import LiveStreamingCardVideoPopup from "../LiveStreamingCardVideoPopup/LiveStreamingCardVideoPopup";

import video from "../../assets/PopupDemoVideo/243647_small.mp4"
import { useNavigate } from "react-router-dom";


const LiveStreamCard = () => {
    const [showMessagePopup, setShowMessagePopup] = useState(false);
    const [showPlayerPopup, setShowPlayerPopup] = useState(false);
    const navigate= useNavigate()


    const navigateToTheChatRoom=()=>{
          navigate("/liveandchatroom")
    }

    return (
        <div className="row g-3 rounded-4 text-white mx-auto pt-2 pb-2 mt-0"
            style={{
                backgroundColor: "var(--color-border)",
                border: "2px solid #ffffff",
                maxWidth: "600px",
                borderRadius: "20px"
            }}
        >
            {/* Left: Image with Swiper */}
            <div className="col-lg-6 position-relative mt-0 ">
                <div className="rounded-4 overflow-hidden position-relative">

                    {/* Image */}
                    <img src={videocardImg} alt="" className="w-100" />

                    {/* Dark overlay */}
                    {/* <div
                        className="position-absolute top-0 start-0 w-100 h-100"
                        style={{
                            background: "rgba(0, 0, 0, 0.0)",
                            backdropFilter: "blur(2px)",
                            zIndex: 1
                        }}
                    /> */}

                    {/* Play Button */}
                    <div
                        className="position-absolute top-50 start-50 translate-middle"
                        style={{ zIndex: 2 }}
                        // onClick={() => setShowPlayerPopup(true)}
                        onClick={navigateToTheChatRoom}
                    >
                        <div
                            className="rounded-circle d-flex justify-content-center align-items-center"
                            style={{
                                width: 48,
                                height: 48,
                                background: "rgba(255, 255, 255, 0.15)",
                                backdropFilter: "blur(8px)",
                                WebkitBackdropFilter: "blur(8px)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                cursor: "pointer"
                            }}
                        >
                            <span className="text-white fs-5">&#9658;</span>
                        </div>
                    </div>

                    {/* Video Modal */}
                    <LiveStreamingCardVideoPopup
                        show={showPlayerPopup}
                        handleClose={() => setShowPlayerPopup(false)}
                        videoSrc={video} // Replace with your video URL
                    />
                </div>


                {/* Carousel Controls + ActionMenu */}
                <div className="position-absolute bottom-0  end-0 px-3 d-flex justify-content-between align-items-center mb-2" style={{ zIndex: 55 }}>

                    <ActionMenu
                        showMeessagePopup={showMessagePopup}
                        setshowMeessagePopup={setShowMessagePopup}
                    />
                </div>

            </div>

            {/* Right: Card Info */}
            <div className="col-lg-6 d-flex flex-column justify-content-between ps-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="fw-bold mb-0">Happytime</h5>
                </div>

                <div className="d-flex align-items-center gap-3 mb-2 fw-semibold mt-2">
                    <div className="d-flex align-items-center gap-1">
                        <img src={female} height={14} alt="female" />
                        <span className="text-danger">57</span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                        <img src={male} height={14} alt="male" />
                        <span className="text-primary">58</span>
                    </div>
                </div>

                <hr />

                <div className="text-muted small d-flex align-items-center gap-1 mb-2 mt-2">
                    <i className="bi bi-geo-alt-fill text-white" />
                    <div className="text-white py-1">Altedo, ITA | 4256 mi</div>
                </div>

                <hr />

                <div className="d-flex align-items-center gap-4 mb-3 mt-2">
                    <span className="d-flex align-items-center gap-2 text-white-50 fs-5">
                        <FaEye /> 68
                    </span>
                    <span className="d-flex align-items-center gap-2 text-white-50 fs-6">
                        <FaClock /> 55m
                    </span>
                </div>


                <div className="d-flex gap-3 mt-auto align-items-center justify-content-between mb-2">
                    <div className="d-flex gap-3">
                        <img src={pc} height={28} alt="pc" />
                        <img src={chat} height={28} alt="chat" />
                        <img src={phone} height={28} alt="phone" />
                    </div>
                </div>
            </div>

            {showMessagePopup && (
                <MessengerPopup
                    profileImg={videocardImg}
                    show={showMessagePopup}
                    handleClose={() => setShowMessagePopup(false)}
                />
            )}
        </div>
    );

};

export default LiveStreamCard;
