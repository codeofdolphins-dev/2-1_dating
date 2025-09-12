import { useState, useEffect } from "react";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import videocardImg from '../../assets/cardImgs/Images/Img.png';
import chat from '../../assets/cardImgs/Images/chat.png';
import pc from '../../assets/cardImgs/Images/pc.png';
import phone from '../../assets/ViwCardImags/img/phone.png';
import femaleIcon from "../../assets/cardImgs/Images/female.png";
import maleIcon from "../../assets/cardImgs/Images/male.png";
import starIcon from "../../assets/cardImgs/Images/star.png";
// import clockIcon from "../../assets/ViwCardImags/img/clock_card_bottom.png";
import MessengerPopup from "../MessengerPopup/MessengerPopup";
import ActionMenu from "../ViewPageCard/ActionMenu/Actionmenu";
import LiveStreamingCardVideoPopup from "../LiveStreamingCardVideoPopup/LiveStreamingCardVideoPopup";

import DeviceInfoPopup from "../../components/DeviceInfoPopup/DeviceInfoPopup"

import couple from "../../assets/icons/couple_custom.png";
import httpService from "../../helper/httpService";
import { ToastContainer } from "react-toastify";
import { showSuccessToast, showErrorToast } from "../customToast/CustomToast"
import VideoModal from "../Video Modal/VideoModal";


const VideoCard = ({ card }) => {
    const [showMessagePopup, setShowMessagePopup] = useState(false);
    const [showPlayerPopup, setShowPlayerPopup] = useState(false);
    const [allVideo, setAllVideo] = useState([]);
    const [viewCount, setViewCount] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [handlePopup, setHandlePopup] = useState(false)

    console.log("videoInfo", toggle);

    // ✅ get all videos regarding the user
    useEffect(() => {
        if (card?.user?._id) {
            httpService(`/media-library/${card.user._id}?type=video`)
                .then((res) => {
                    console.log("Fetched videos:", res);
                    setAllVideo(res?.data?.media || []); // ✅ safe fallback
                })
                .catch((err) => {
                    console.log("Error fetching videos:", err?.response?.data?.message);
                    showErrorToast(err?.response?.data?.message)
                });
        }
    }, [toggle]);

    const handleFriendRequest = () => {
        httpService("/friend-requests", "POST", { "receiverId": card?.user?._id })
            .then((res) => {
                console.log("ffff", res)
                showSuccessToast(res?.data?.message)

            })
            .catch((err) => {
                console.log(err)
                showErrorToast(err?.response?.data?.message)
            })
    }

    return (
        <>
            <div
                className="row g-3 rounded-4 text-white pt-2 pb-2 m-1"
                style={{
                    backgroundColor: "var(--color-border)",
                    border: "2px solid #ffff",
                    width: "auto",
                    borderRadius: "15px",
                }}
            >
                {/* Left: Image with Play Button */}
                <div className="col-lg-6 position-relative mt-0">
                    <div className="rounded-4 overflow-hidden position-relative" style={{ width: "100%" }}>
                        {/* Thumbnail */}
                        <img
                            src={card?.thumbnailUrl}
                            alt=""
                            className="h-100 w-100"
                            style={{ objectFit: "fill" }}
                        />

                        {/* Play Button */}
                        <div
                            className="position-absolute top-50 start-50 translate-middle"
                            style={{ zIndex: 2 }}
                            onClick={() => { setShowPlayerPopup(true); setToggle(!toggle) }}
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
                                    cursor: "pointer",
                                }}
                            >
                                <span className="text-white fs-5">&#9658;</span>
                            </div>
                        </div>

                        {/* Video Popup */}
                        {/* <LiveStreamingCardVideoPopup
                            show={showPlayerPopup}
                            handleClose={() => setShowPlayerPopup(false)}
                            videoSrc={card?.url}
                            card={card}
                            setViewCount={setViewCount}
                            allVideo={allVideo} // ✅ passing fetched videos here
                        /> */}

                        <VideoModal show={showPlayerPopup}
                            handleClose={() => setShowPlayerPopup(false)}
                            videoSrc={card?.url}
                            card={card}
                            setViewCount={setViewCount}
                            allVideo={allVideo} />
                    </div>

                    {/* ActionMenu */}
                    <div
                        className="position-absolute bottom-0 end-0 px-3 d-flex justify-content-between align-items-center mb-2"
                        style={{ zIndex: 55 }}
                    >
                        <ActionMenu
                            showMeessagePopup={showMessagePopup}
                            setshowMeessagePopup={setShowMessagePopup}
                            targetUserId={card?.user?._id}
                            handleFriendRequest={handleFriendRequest}
                            showRemembered={true}
                            showlikeDislike={true}
                        />
                    </div>
                </div>

                {/* Right: Card Info */}
                <div className="col-lg-6 d-flex flex-column justify-content-between mt-0">
                    <div className="cardTitle">
                        <h4 className="fw-bold mb-0">{card?.user?.username || "User"}</h4>
                        <img src={starIcon} height={20} alt="star" />
                    </div>

                    {/* Ages */}
                    <div className="d-flex align-items-center gap-3 mb-2 fw-semibold mt-2 border-bottom pb-2">
                        {card?.user?.partner?.age && (
                            <div className="d-flex align-items-center gap-1">
                                <img src={femaleIcon} height={14} alt="female" />
                                <span className="text-danger"> {card?.user?.partner?.age || 0} </span>
                            </div>
                        )}

                        <div className="d-flex align-items-center gap-1">
                            <img src={maleIcon} height={14} alt="male" />
                            <span className="text-primary"> {card?.user?.age} </span>
                        </div>
                    </div>

                    {/* Interests */}
                    <div className="text-muted small d-flex align-items-center gap-1 border-bottom pb-2">
                        <div className="text-white py-1 d-flex justify-content-center align-items-center gap-3">
                            Interests:
                            <div>
                                {card?.user?.interestedIn?.map((e, idx) =>
                                    e === "male" ? (
                                        <img key={idx} src={maleIcon} height={14} alt="male" />
                                    ) : e === "female" ? (
                                        <img key={idx} src={femaleIcon} height={14} alt="female" />
                                    ) : e === "couple" ? (
                                        <img key={idx} src={couple} height={14} alt="couple" />
                                    ) : null
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="text-muted small d-flex align-items-start gap-1 mb-2 mt-2 border-bottom pb-2">
                        <i className="bi bi-geo-alt-fill text-white" />
                        <div
                            className="text-white py-1"
                            style={{
                                maxHeight: "40px",
                                overflowY: "auto",
                                wordBreak: "break-word",
                                flex: 1,
                            }}
                        >
                            {card?.user?.location?.address?.fullAddress || "No Address"}
                        </div>
                    </div>

                    {/* Bottom icons + views */}
                    <div className="d-flex gap-3 align-items-center justify-content-between mb-2">
                        <div className="d-flex gap-1" style={{ cursor: "pointer" }}>
                            <img src={pc} height={25} alt="pc" onClick={() => setHandlePopup(true)} />
                            <img src={chat} height={25} alt="chat" onClick={() => setShowMessagePopup(true)} />
                            <img src={phone} height={25} alt="phone" onClick={() => setHandlePopup(true)} />
                            {/* <img src={clockIcon} height={25} alt="clock" /> */}
                        </div>
                        <div className="d-flex align-items-center justify-content-center text-white-50">
                            <p className="mb-0 fs-6" style={{ color: "#EC5252", fontSize: "10px" }}>
                                {card?.moderationInfo?.viewCount} views
                            </p>
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

                <DeviceInfoPopup show={handlePopup} setShow={setHandlePopup} />
            </div>
            <ToastContainer />
        </>
    );
};

export default VideoCard;
