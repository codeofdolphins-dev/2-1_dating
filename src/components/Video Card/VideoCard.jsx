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
import AgeCalculator from "../../helper/DobCalculator";

import couple from "../../assets/icons/couple_custom.png"


const VideoCard = ({ card }) => {
    console.log("video src",card)
    const [showMessagePopup, setShowMessagePopup] = useState(false);
    const [showPlayerPopup, setShowPlayerPopup] = useState(false);


    return (
        <div className="row g-3 rounded-4 text-white pt-2 pb-2 m-1"
            style={{
                backgroundColor: "var(--color-border)",
                // backgroundColor: "#343A40",
                border: "2px solid #ffff",
                width: "auto",
                borderRadius: "15px"
            }}
        >
            {/* Left: Image with Swiper */}
            <div className="col-lg-6 position-relative mt-0">
                <div className="rounded-4 overflow-hidden position-relative" style={{ width: "100%", }}>

                    {/* Image */}
                    <img src={videocardImg} alt="" className="h-100 w-100" style={{ objectFit: "fill" }} />

                    {/* Play Button */}
                    <div
                        className="position-absolute top-50 start-50 translate-middle"
                        style={{ zIndex: 2 }}
                        // onClick={() => setShowPlayerPopup(true)}
                        onClick={() => (setShowPlayerPopup(true))}
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
                        videoSrc={card?.url} // Replace with your video URL
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
                    <h4 className="fw-bold mb-0">{card?.user?.username || "User"}</h4>
                    <img src={starIcon} height={20} alt="star" />
                </div>
                {/* </div> */}

                <div className="d-flex align-items-center gap-3 mb-2 fw-semibold mt-2 border-bottom pb-2">
                    {
                        card?.user?.partner?.age === !null && <div className="d-flex align-items-center gap-1">
                            <img src={femaleIcon} height={14} alt="female" />
                            <span className="text-danger"> {AgeCalculator(card?.user?.partner?.age || 0)} </span>
                        </div>
                    }

                    <div className="d-flex align-items-center gap-1">
                        <img src={maleIcon} height={14} alt="male" />
                        <span className="text-primary"> {card?.user?.age} </span>
                    </div>
                </div>

                <div className="text-muted small d-flex align-items-center gap-1 border-bottom pb-2">
                    <div className="text-white py-1 d-flex justify-content-center align-items-center gap-3 ">Interests:
                        <div className="">
                            {card?.user?.interestedIn?.map((e, idx) =>
                                e === "male" ? (
                                    <img key={idx} src={maleIcon} height={14} alt="male" />
                                ) : e === "female" ? (
                                    <img key={idx} src={femaleIcon} height={14} alt="female" />
                                ) : e === "couple" ? (
                                    <img key={idx} src={couple} height={14} alt="female" />
                                ) : null
                            )}
                        </div>

                    </div>
                </div>

                <div className="text-muted small d-flex align-items-start gap-1 mb-2 mt-2 border-bottom pb-2">
                    <i className="bi bi-geo-alt-fill text-white" />
                    <div
                        className="text-white py-1"
                        style={{
                            maxHeight: "40px",       // limit height
                            overflowY: "auto",       // make scrollable if too long
                            wordBreak: "break-word", // handle very long words
                            flex: 1                  // take remaining space
                        }}
                    >
                        {card?.user?.location?.address?.fullAddress || "No Address"}
                    </div>
                </div>



                <div className="d-flex align-items-center gap-4 mb-3 mt-2">

                </div>


                <div className="d-flex gap-3 align-items-center justify-content-between mb-2">
                    <div className="d-flex gap-1">
                        <img src={pc} height={25} alt="pc" />
                        <img src={chat} height={25} alt="chat" />
                        <img src={phone} height={25} alt="phone" />
                        <img src={clockIcon} height={25} alt="phone" />
                    </div>
                    <div className="d-flex align-items-center justify-content-center text-white-50">
                        {/* <p className="mb-0 fs-6" style={{ color: "#EC5252", fontSize: "10px" }}>{views} views</p> */}
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
