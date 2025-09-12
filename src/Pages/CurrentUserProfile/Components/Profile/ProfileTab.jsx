import React, { useEffect, useState } from "react";
import CurrentProfileCard from "../../../../components/cards/CurrentProfileCard";
import Table from "../Table/Table";

import ProfilePageCertificationCardContainerTab from "../../../../components/profileBottomTabSection/ProfilePageCertificationCardContainer";
import ProfilePageGroupCardContainerTab from "../../../../components/profileBottomTabSection/ProfilePageGroupCardContainer";
import PartiesAndeventCardContainerTab from "../../../../components/profileBottomTabSection/PartiesAndeventCardContainer";
import ProfilePageFollowingCardContainerTab from "../../../../components/profileBottomTabSection/ProfilePageFollowingCardContainer";
import FriendsCardContainerTab from "../../../../components/profileBottomTabSection/FriendsCardContainer";
import httpService from "../../../../helper/httpService";
import { FaFemale, FaMale } from "react-icons/fa";
import transgender from "../../../../assets/icons/custom_transgender.png";
import CustomCouple from "../../../../assets/icons/couple_custom.png";
import OverlayLoader from "../../../../helper/OverlayLoader";

// ✅ Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import GlobalImageCarouselPopup from "../../../../components/globalImageCarouselPopup/GlobalImageCarouselPopup";
import { useNavigate } from "react-router-dom";

const ProfileTab = ({ changeTab }) => {
    const [activeTabLower, setActiveTabLower] = useState("Certifications");
    const [allProfileImg, setAllProfileImg] = useState([]);
    const [allAdultImg, setAllAdultImg] = useState([]);
    const [allNonAdultImg, setAllNonAdultImg] = useState([]);
    const [allVideo, setAllVideo] = useState([]);
    const [user, setUser] = useState([]);
    const [loader, setLoader] = useState(true);
    const [iconText, setIconText] = useState("")
    const [popupToggle, setPopupToggle] = useState(false)

    const navigate = useNavigate()


    const miniTabLower = [
        { title: "Certifications" },
        { title: "Groups" },
        { title: "Parties & Events" },
        { title: "Following" },
        { title: "Friends" },
    ];

    const renderLowerContent = () => {
        switch (activeTabLower) {
            case "Certifications":
                return <ProfilePageCertificationCardContainerTab />;
            case "Groups":
                return <ProfilePageGroupCardContainerTab />;
            case "Parties & Events":
                return <PartiesAndeventCardContainerTab />;
            case "Following":
                return <ProfilePageFollowingCardContainerTab />;
            case "Friends":
                return <FriendsCardContainerTab />;
            default:
                return null;
        }
    };

    // ✅ Fetch user profile
    useEffect(() => {
        httpService("/auth/me", "GET")
            .then((response) => {
                console.log("user profile fetch", response);
                setUser(response?.data);
                setLoader(false);
            })
            .catch((err) => {
                console.error("Failed to fetch user profile:", err);
                setLoader(false);
            });
    }, []);

    // ✅ Fetch images when user is loaded
    useEffect(() => {
        if (!user?._id) return;

        // profile photos
        httpService(`/media-library/${user._id}?type=image&source=profile`, "GET")
            .then((res) => {
                console.log("profile img", res);
                setAllProfileImg(res?.data?.media);
                // setImages(res?.data?.media || []);
            })
            .catch((err) => {
                console.error("Failed to fetch profile image:", err);
            });

        // adult post photos
        httpService(
            `/media-library/${user._id}?type=image&source=post&adultContent=adult`,
            "GET"
        )
            .then((res) => {
                console.log("adult post img", res?.data?.media);
                setAllAdultImg(res?.data?.media);
            })
            .catch((err) => {
                console.error("Failed to fetch adult images:", err);
            });


        // non-adult post photos
        httpService(
            `/media-library/${user._id}?type=image&source=post&adultContent=non-adult`,
            "GET"
        )
            .then((res) => {
                console.log("non-adult post img", res?.data?.media);
                setAllNonAdultImg(res?.data?.media);
            })
            .catch((err) => {
                console.error("Failed to fetch adult images:", err);
            });

        // video post photos
        httpService(
            `/media-library/${user._id}?type=video&source=post`,
            "GET"
        )
            .then((res) => {
                console.log("non-adult post video", res?.data?.media);
                setAllVideo(res?.data?.media);
            })
            .catch((err) => {
                console.error("Failed to fetch adult images:", err);
            });
    }, [user?._id]);


    const geticonText = (data, toggle) => {
        setPopupToggle(toggle)
        setIconText(data)
        if(data === "Friends"){
            navigate("/profile-friends")
            setPopupToggle(false)
        }
    }

    const handleClose = () => {
        setPopupToggle(false)
    }

    return (
        <>
            <OverlayLoader show={loader} text="Please wait..." />

            <div className="row">
                <div className="col-lg-6">
                    <CurrentProfileCard
                        user={user}
                        userFriendsCount ={user?.friendCount}
                        allProfileImg={allProfileImg}
                        allAdultImg={allAdultImg}
                        allNonAdultImg={allNonAdultImg}
                        allVideo={allVideo}
                        geticonText={geticonText}
                    />
                    <GlobalImageCarouselPopup
                        handleClose={handleClose}
                        show={popupToggle}
                        currentMediaData={iconText==="Videos" && "video"}
                        images={
                            iconText === "Adult"
                                ? allAdultImg
                                : iconText === "Non-Adult"
                                    ? allNonAdultImg
                                    : iconText === "Videos"
                                        ? allVideo 
                                        : []
                        }
                    />

                </div>

                <div className="col-lg-6">
                    <div className="d-flex justify-content-between align-items-center border px-4 py-2 rounded-4 mb-4"
                        style={{ backgroundColor: "var(--color-border)" }}>
                        <div className="d-flex gap-2">
                            <div className="mb-0">Looking for:</div>
                            {user?.profile?.interestedIn?.map((interest, i) => (
                                <div key={i} className="text-light small">
                                    {interest === "male" ? (
                                        <FaMale className="fs-5 text-primary" />
                                    ) : interest === "female" ? (
                                        <FaFemale className="fs-5 text-danger" />
                                    ) : interest === "transgender" ? (
                                        <img src={transgender} height={21} alt="transgender" />
                                    ) : interest === "couple" ? (
                                        <img src={CustomCouple} height={21} alt="couple" />
                                    ) : null}
                                </div>
                            ))}
                        </div>
                        <button
                            className="custom-button rounded-4 px-3 py-1 border-0"
                            onClick={() => changeTab("Edit")}
                        >
                            Edit Profile
                        </button>
                    </div>

                    <div className="d-flex flex-column align-items-start justify-content-center">
                        <p>{user?.profile?.bio}</p>
                    </div>
                </div>
            </div>

            <div className="w-100 mt-4">
                <Table user={user?.profile} />
            </div>

            {/* lower mini tab  */}
            <div className="miniNav d-flex justify-content-start align-items-center gap-3 mt-5">
                {miniTabLower.map((tab, i) => (
                    <p
                        key={i}
                        onClick={() => setActiveTabLower(tab.title)}
                        className={`px-4 mb-1 ${activeTabLower === tab.title ? "active-tab" : "text-white"
                            }`}
                        style={{
                            borderBottom:
                                activeTabLower === tab.title
                                    ? "2px solid #096BFF"
                                    : "2px solid transparent",
                            color: activeTabLower === tab.title ? "#096BFF" : "white",
                            cursor: "pointer",
                        }}
                    >
                        {tab.title}
                    </p>
                ))}
            </div>
            <div className="mt-3">{renderLowerContent()}</div>


        </>
    );
};

export default ProfileTab;
