import { useState } from "react";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';


import videocardImg from '../../assets/cardImgs/Images/Img.png'
import chat from '../../assets/cardImgs/Images/chat.png'
import pc from '../../assets/cardImgs/Images/pc.png'
import phone from '../../assets/ViwCardImags/img/phone.png'
import femaleIcon from "../../assets/cardImgs/Images/female.png"
import maleIcon from "../../assets/cardImgs/Images/male.png"
import starIcon from "../../assets/cardImgs/Images/star.png"
import clockIcon from "../../assets/ViwCardImags/img/clock_card_bottom.png"
import MessengerPopup from "../MessengerPopup/MessengerPopup";
import ActionMenu from "../ViewPageCard/ActionMenu/Actionmenu";
import LiveStreamingCardVideoPopup from "../LiveStreamingCardVideoPopup/LiveStreamingCardVideoPopup";

import video from "../../assets/PopupDemoVideo/243647_small.mp4"


const VideoCard = ({
    headerText = "demo",
    maleNumbers = "57",
    femaleNumbers = "58",
    location = "Altedo, ITA | 4256 mi",
    views = "68",
    onClick
}) => {
    const [showMessagePopup, setShowMessagePopup] = useState(false);
    const [showPlayerPopup, setShowPlayerPopup] = useState(false);


    return (
        <div className="row g-3 rounded-4 text-white pt-2 pb-2 m-1"
            style={{
                // backgroundColor: "var(--color-border)",
                backgroundColor: "#343A40",
                width: "auto",
                borderRadius: "15px"
            }}
        >
            {/* Left: Image with Swiper */}
            <div className="col-lg-6 position-relative mt-0">
                <div className="rounded-4 overflow-hidden position-relative" style={{ width: "100%", height: "210px" }}>

                    {/* Image */}
                    <img src={videocardImg} alt="" className="h-100 w-100" style={{ objectFit: "fill" }} />

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
                        onClick={() => onClick()}
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
            <div className="col-lg-6 d-flex flex-column justify-content-between mt-0">
                {/* <div className="d-flex justify-content-between align-items-center mb-2"> */}
                <div className="cardTitle">
                    <h5 className="fw-bold mb-0">{headerText}</h5>
                    <img src={starIcon} height={20} alt="star" />
                </div>
                {/* </div> */}

                <div className="d-flex align-items-center gap-3 mb-2 fw-semibold mt-2">
                    <div className="d-flex align-items-center gap-1">
                        <img src={femaleIcon} height={14} alt="female" />
                        <span className="text-danger"> {femaleNumbers} </span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                        <img src={maleIcon} height={14} alt="male" />
                        <span className="text-primary"> {maleNumbers} </span>
                    </div>
                </div>

                <hr />

                <div className="text-muted small d-flex align-items-center gap-1 mb-2 mt-2">
                    <div className="text-white py-1 d-flex justify-content-center align-items-center gap-3 ">Interests:
                        <div className="">
                            <img src={femaleIcon} height={14} alt="male" />
                            <img src={maleIcon} height={14} alt="male" />
                            <img src={femaleIcon} height={14} alt="male" />
                        </div>
                    </div>
                </div>

                <hr />

                <div className="text-muted small d-flex align-items-center gap-1 mb-2 mt-2">
                    <i className="bi bi-geo-alt-fill text-white" />
                    <div className="text-white py-1"> {location} </div>
                </div>

                <hr />

                <div className="d-flex align-items-center gap-4 mb-3 mt-2">

                </div>


                <div className="d-flex gap-3 align-items-center justify-content-between mb-2">
                    <div className="d-flex gap-1">
                        <img src={pc} height={22} alt="pc" />
                        <img src={chat} height={22} alt="chat" />
                        <img src={phone} height={22} alt="phone" />
                        <img src={clockIcon} height={22} alt="phone" />
                    </div>
                    <div className="d-flex align-items-center justify-content-center text-white-50">
                        <p className="mb-0" style={{ color: "#EC5252", fontSize: "10px" }}>{views} views</p>
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

export default VideoCard;
