import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';

import img1 from "./img/couple.avif";
import img2 from "./img/coupleImg.jpeg";
import img3 from "./img/profileImg.png";
import img4 from "./img/profileImg.webp";
import pc from "./img/pc.png";
import chat from "./img/chat.png";
import male from "./img/male.png";
import female from "./img/female.png";
import drink from "./img/drink.png"
import phone from "./img/phone.png"
import star from "./img/star.png"
import { numberConversion } from "../../../helper/numberConversion";
import httpService from "../../../helper/httpService";
import { FaFemale, FaMale } from "react-icons/fa";
import transgender from "../../../assets/icons/custom_transgender.png";
import CustomCouple from "../../../assets/icons/couple_custom.png"
import AgeCalculator from "../../../helper/DobCalculator";
import ViewpagePhotoGallery from "../../viewPagePhotovallery/ViewpagePhotoGallery";
import GlobalImageCarouselPopup from "../../globalImageCarouselPopup/GlobalImageCarouselPopup";
import { useNavigate } from "react-router-dom";


const dummyimages = [img1, img2, img3, img4];

const FriendsCard = ({ friend }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [images, setImages] = useState([]);
    const [userData, setUserData] = useState("")
    const [allVideos, setAllVideos] = useState([])
    const [showGallery, setShowGallery] = useState(false)
    const [showVideo,setShowVideo] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (swiperInstance && prevRef.current && nextRef.current) {
            swiperInstance.params.navigation.prevEl = prevRef.current;
            swiperInstance.params.navigation.nextEl = nextRef.current;
            swiperInstance.navigation.destroy();
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
        }
    }, [swiperInstance]);

    useEffect(() => {
        setImages(friend.profile.photos.length >= 0 ? friend.profile.photos : dummyimages);

        httpService(`/users/${friend._id}`, "GET")
            .then((res) => {
                console.log("user friend data", res?.data)
                setUserData(res?.data)
            })
    }, [friend.profile.photos])


    useState(() => {
        httpService(`/media-library/${friend?._id}?type=video`)
            .then((res) => {
                setAllVideos(res?.data?.media)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])

    return (
        <div className="row g-3 rounded-4 text-white pb-2 ml-3 mt-4" style={{ backgroundColor: "var(--color-border)", border: "1px solid #ffffff", maxWidth: "650px" }}>
            {/* 📸 Carousel Column */}
            <div className="col-lg-6 pe-lg-3  position-relative" style={{ marginTop: "8px" }}>
                <div className="rounded-4 overflow-hidden">
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={10}
                        slidesPerView={1}
                        onSwiper={setSwiperInstance}
                    >
                        {images.map((img, idx) => (
                            <SwiperSlide key={idx}>
                                <img
                                    src={img}
                                    alt={`Slide ${idx}`}
                                    className="w-100"
                                    style={{
                                        objectFit: "cover",
                                        height: "250px",
                                        borderRadius: "12px",
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* 🔽 Navigation Buttons inside carousel column only */}
                <div
                    className="position-absolute bottom-0 start-2 m-2 d-flex gap-2"
                    style={{ zIndex: 10 }}
                >
                    <button
                        ref={prevRef}
                        className="bg-primary border-0 rounded-circle text-white p-2"
                        style={{ width: "32px", height: "32px" }}
                    >
                        <i className="bi bi-chevron-left"></i>
                    </button>
                    <button
                        ref={nextRef}
                        className="bg-primary border-0 rounded-circle text-white p-2"
                        style={{ width: "32px", height: "32px" }}
                    >
                        <i className="bi bi-chevron-right"></i>
                    </button>
                </div>
            </div>

            {/* 📝 Info Column */}
            <div className="col-lg-6 d-flex flex-column justify-content-between ps-3">
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <div>
                            <h5 className="fw-bold mb-0" style={{ color: "var(--color-primary-green)" }}> {friend?.username ?? "..."} </h5>
                        </div>
                        <div className="d-flex gap-2">
                            <img src={star} height={30} alt="Star" />
                        </div>
                    </div>

                    <div className="d-flex align-items-center flex-wrap gap-3 fw-semibold mb-2">
                        {/* Card Owner */}
                        {(() => {
                            const gender =
                                userData?.profile?.gender ||
                                userData?.viewedUserId?.profile?.gender ||
                                userData?.targetUserId?.profile?.gender ||
                                userData?.receiverId?.profile?.gender ||
                                userData?.senderId?.profile?.gender;

                            const dob =
                                userData?.profile?.dateOfBirth ||
                                userData?.viewedUserId?.profile?.dateOfBirth ||
                                userData?.targetUserId?.profile?.dateOfBirth ||
                                userData?.receiverId?.profile?.dateOfBirth ||
                                userData?.senderId?.profile?.dateOfBirth;

                            const partnerDob =
                                userData?.profile?.partner?.dateOfBirth ||
                                userData?.viewedUserId?.profile?.partner?.dateOfBirth ||
                                userData?.targetUserId?.profile?.partner?.dateOfBirth ||
                                userData?.receiverId?.profile?.partner?.dateOfBirth ||
                                userData?.senderId?.profile?.partner?.dateOfBirth
                            if (gender === "female") {
                                return (
                                    <div className="d-flex align-items-center gap-2">
                                        <FaFemale className="text-danger fs-6" />
                                        <span className="text-danger">
                                            <AgeCalculator birthDate={dob} />
                                        </span>
                                    </div>
                                );
                            }

                            if (gender === "male") {
                                return (
                                    <div className="d-flex align-items-center gap-2">
                                        <FaMale className="text-primary fs-6" />
                                        <span className="text-primary">
                                            <AgeCalculator birthDate={dob} />
                                        </span>
                                    </div>
                                );
                            }

                            if (gender === "couple") {
                                return (
                                    <>
                                        <div className="d-flex align-items-center gap-2">
                                            <FaFemale className="text-danger fs-6" />
                                            <span className="text-danger">
                                                <AgeCalculator birthDate={dob} />
                                            </span>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <FaMale className="text-primary fs-6" />
                                            <span className="text-primary">
                                                <AgeCalculator birthDate={partnerDob} />
                                            </span>
                                        </div>
                                    </>
                                );
                            }

                            return <p className="mb-0">Unknown</p>;
                        })()}
                    </div>

                    <hr />
                    <div className="mb-2 d-flex align-items-center gap-3 pt-2">
                        <span className="fw-semibold fs-5">Interests:</span>
                        <div className="d-flex align-items-center gap-1">
                            {(userData?.profile?.interestedIn ||
                                userData?.viewedUserId?.profile?.interestedIn ||
                                userData?.targetUserId?.profile?.interestedIn ||
                                userData?.receiverId?.profile?.interestedIn || []
                            ).map((interest, i) => (
                                <span key={i} className="text-light small">
                                    {interest === "male" ? (
                                        <FaMale className="fs-5 text-primary" />
                                    ) : interest === "female" ? (
                                        <FaFemale className="fs-5 text-danger" />
                                    ) : interest === "transgender" ? (
                                        <div className="d-flex gap-0">
                                            <img src={transgender} height={21} alt="transgender" />
                                        </div>
                                    ) : interest === "couple" ? (
                                        <div className="d-flex gap-0">
                                            <img src={CustomCouple} height={21} alt="couple" />
                                        </div>
                                    ) : null}
                                </span>
                            ))}
                        </div>
                    </div>


                    <hr />
                    <div className="d-flex align-items-center gap-2 text-white small py-2">
                        <i className="bi bi-geo-alt-fill"></i>
                        <div
                            className="d-block text-light small"
                            style={{
                                height: "30px",
                                overflowY: "auto"
                            }}
                        >
                            {userData?.profile?.address?.fullAddress}
                        </div>
                    </div>



                    <hr />

                    <div className="d-flex gap-3">
                        <div>
                            <div className="d-flex align-items-center gap-2 text-white small py-2" onClick={() => setShowGallery(true)}>
                                <i class="bi bi-camera-fill"></i>
                                <span> {numberConversion(userData?.profile?.photos?.length)} </span>
                            </div>
                        </div>

                        <div>
                            <div className="d-flex align-items-center gap-2 text-white small py-2" onClick={()=>navigate(`/global-frindlist/${userData?._id}`)}>
                                <i class="bi bi-person-fill"></i>
                                <span> {numberConversion(userData?.friendCount)} </span>
                            </div>
                        </div>

                        <div>
                            <div className="d-flex align-items-center gap-2 text-white small py-2">
                                <i class="bi bi-star-fill"></i>
                                <span> {numberConversion(friend?.f)} </span>
                            </div>
                        </div>

                        <div>
                            <div className="d-flex align-items-center gap-2 text-white small py-2" onClick={() =>setShowVideo(true)}>
                                <i class="bi bi-play-fill"></i>
                                <span> {numberConversion(allVideos.length)} </span>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex gap-3 mt-2">
                        {/* <div><img src={drink} alt="" height={30} /></div> */}
                        <div><img src={phone} alt="" height={30} /></div>
                        <div><img src={pc} alt="" height={30} /></div>
                    </div>
                </div>

            </div>
            <ViewpagePhotoGallery
                show={showGallery}
                handleClose={() => setShowGallery(false)}
                images={userData?.profile?.photos}
            />
            <GlobalImageCarouselPopup show={showVideo} handleClose={()=>setShowVideo(false)} images={allVideos} />
        </div>
    );
};

export default FriendsCard;

