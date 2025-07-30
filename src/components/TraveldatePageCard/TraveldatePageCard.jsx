import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';


import pc from "../../assets/ViwCardImags/img/pc.png";
import chat from "../../assets/ViwCardImags/img/chat.png";
import male from "../../assets/ViwCardImags/img/male.png";
import female from "../../assets/ViwCardImags/img/female.png";
import phone from "../../assets/ViwCardImags/img/phone.png";
import star from "../../assets/ViwCardImags/img/star.png";
import clock from "../../assets/ViwCardImags/img/clock_card_bottom.png";
import plane from "../../assets/cardImgs/Images/plane.png";
import calender from "../../assets/cardImgs/Images/calender.png";

import ActionMenu from "../ViewPageCard/ActionMenu/Actionmenu";
import ViewpagePhotoGallery from "../viewPagePhotovallery/ViewpagePhotoGallery";
import ViewpageMessengerPopup from "../MessengerPopup/MessengerPopup";




const TraveldatePageCard = ({ index, images }) => {
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [showGallery, setShowGallery] = useState(false);
    const [showMessagePopup, setShowMessagePopup] = useState(false);

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    useEffect(() => {
        if (swiperInstance && prevRef.current && nextRef.current) {
            swiperInstance.params.navigation.prevEl = prevRef.current;
            swiperInstance.params.navigation.nextEl = nextRef.current;
            swiperInstance.navigation.destroy();
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
        }
    }, [swiperInstance]);


    return (
        <div className="row g-3 rounded-4 text-white pb-2 ml-3 "
            style={{ backgroundColor: "var(--color-border)", border: "2px solid #ffffff", maxWidth: "650px" }}>

            {/* Left: Image Carousel */}
            <div className="col-lg-6 pe-lg-3 position-relative mt-2">
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
                                    onClick={() => setShowGallery(true)}
                                    style={{
                                        objectFit: "cover",
                                        height: "370px",
                                        borderRadius: "12px",
                                        cursor: "pointer"
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Carousel Controls + ActionMenu */}
                <div className="position-absolute bottom-0 start-0 end-0 px-3 d-flex justify-content-between align-items-center mb-2" style={{ zIndex: 55 }}>
                    <div className="d-flex gap-2">
                        <button
                            ref={prevRef}
                            className="bg-primary border-0 rounded-circle text-white d-flex justify-content-center align-items-center"
                            style={{ width: "32px", height: "32px" }}
                        >
                            <i className="bi bi-chevron-left"></i>
                        </button>
                        <button
                            ref={nextRef}
                            className="bg-primary border-0 rounded-circle text-white d-flex justify-content-center align-items-center"
                            style={{ width: "32px", height: "32px" }}
                        >
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    </div>

                    <ActionMenu
                        index={index}
                        showMeessagePopup={showMessagePopup}
                        setshowMeessagePopup={setShowMessagePopup}
                    />
                </div>
            </div>

            {/* Right: Card Info */}
            <div className="col-lg-6 d-flex flex-column justify-content-between ps-3">
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="fw-bold mb-0">BOLEROPALACE</h5>
                        <div><img src={star} height={30} alt="Star" /></div>
                    </div>

                    <div className="d-flex align-items-center flex-wrap gap-3 fw-semibold mb-2">
                        <div className="d-flex align-items-center gap-2">
                            <img src={female} height={16} alt="female" />
                            <span className="text-danger">57</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <img src={male} height={16} alt="male" />
                            <span className="text-primary">57</span>
                        </div>
                    </div>

                    {/* <hr /> */}
                    <div className="mb-2 d-flex align-items-center justify-content-between gap-3 pt-2 w-100">
                        {/* Label */}
                        <p className="mb-0 fw-semibold fs-6">With:</p>

                        {/* Icons */}
                        <div className="d-flex ">
                            <img src={male} height={20} alt="male" />
                            <img src={female} height={20} alt="female" />
                            <img src={male} height={20} alt="male" />
                        </div>
                    </div>


                    <hr />
                    <div className="d-flex py-2 gap-2 align-items-start">
                        <div className="text-white small">
                            <img src={plane} height={18} alt="male" />
                        </div>
                        <div>
                            <p className="mb-0 text-danger small">
                                Mar 08, 2025 – Mar 09, 2025 – Mar 15, 2025 – Mar 16, 2025
                            </p>
                        </div>
                    </div>

                    <hr />
                    <div className="d-flex align-items-center gap-2 text-white small py-2">
                        <i className="bi bi-geo-alt-fill"></i>
                        <span>Hyderabad, IND | 1 mi</span>
                    </div>
                    <hr />
                    <div className=" text-white small py-2">
                        <p>Travelling to Hyderabad for one day , genuine singles can, more</p>
                    </div>
                    <div >
                        <a href="" className="text-danger">See who else is going here</a>
                    </div>

                    <div className="d-flex justify-content-between align-items-end">
                        <div className="d-flex gap-2 mt-3">
                            <img src={phone} alt="" height={30} />
                            <img src={pc} alt="" height={30} />
                            <img src={chat} alt="" height={30} />
                            <img src={clock} alt="" height={30} />
                            <img src={calender} alt="" height={30} />
                            
                        </div>

                        <div className="text-danger">8h4m</div>
                    </div>
                </div>
            </div>

            {/* 📷 Image Gallery Popup */}
            <ViewpagePhotoGallery
                show={showGallery}
                handleClose={() => setShowGallery(false)}
                images={images}
            />

            {/* 💬 Messenger Popup */}
            {showMessagePopup && <ViewpageMessengerPopup profileImg={images[2]} show={showMessagePopup} handleClose={() => setShowMessagePopup(false)} />}
        </div>
    );
};

export default TraveldatePageCard;


