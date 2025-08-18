import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';

import img1 from "../../../assets/ViwCardImags/img/couple.avif";
import img2 from "../../../assets/ViwCardImags/img/coupleImg.jpeg";
import img3 from "../../../assets/ViwCardImags/img/profileImg.png";
import img4 from "../../../assets/ViwCardImags/img/profileImg.webp";
import pc from "../../../assets/ViwCardImags/img/pc.png";
import phone from "../../../assets/ViwCardImags/img/phone.png";
import male from "../../../assets/ViwCardImags/img/male.png";
import female from "../../../assets/ViwCardImags/img/female.png";
import ActionMenu from "../../../components/ViewPageCard/ActionMenu/Actionmenu";

const images = [img1, img2, img3, img4];

const NotesCard = ({ index = "" }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [showMessagePopup, setShowMessagePopup] = useState(false);


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
        <div className="row g-3 rounded-4 text-white pb-2 ml-3 mt-2" style={{ backgroundColor: "var(--color-border)", border: "1px solid #ffffff", maxWidth: "675px" }}>
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
                                        height: "275px",
                                        borderRadius: "12px",
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

            {/* 📝 Info Column */}
            <div className="col-lg-6 d-flex flex-column justify-content-between ps-1 pe-1">
                <div>
                    <div className="d-flex justify-content-between">
                        <div>
                            <h5 className="fw-bold mb-2" style={{ color: "var(--color-primary-green)" }}>FOR2MORE</h5>
                        </div>
                        <div>
                            <div className='d-flex gap-2'>
                                <div><img src={phone} height={30} alt="phone" /></div>
                                <div><img src={pc} height={30} alt="pc" /></div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center flex-wrap gap-3 fw-semibold mb-1">
                        <div className="d-flex align-items-center gap-2">
                            <img src={female} height={16} alt="female" />
                            <span className="text-danger">57</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <img src={male} height={16} alt="male" />
                            <span className="text-primary">57</span>
                        </div>
                    </div>

                    <hr />
                    <div className="mb-2 d-flex align-items-center gap-3 pt-1">
                        {/* Label */}
                        <p className="mb-0 fw-semibold fs-5">Interests:</p>

                        {/* Icons */}
                        <div className="d-flex">
                            <img src={male} height={20} alt="male" />
                            <img src={female} height={20} alt="female" />
                            <img src={male} height={20} alt="male" />
                        </div>
                    </div>

                    <hr />
                    <div className="d-flex align-items-center gap-2 text-secondary small py-1">
                        <i className="bi bi-geo-alt-fill"></i>
                        <span>94555, CA 94555, USA | 8412 mi</span>
                    </div>

                    <hr />

                    <div className="d-flex gap-1 py-2" style={{ fontSize: "14px" }}>
                        <div className="d-flex align-items-center gap-1 text-white small py-1">
                            <i className="bi bi-camera-fill"></i><span>41</span>
                        </div>
                        <div className="d-flex align-items-center gap-1 text-white small py-1">
                            <i className="bi bi-person-fill"></i><span>12</span>
                        </div>
                        <div className="d-flex align-items-center gap-1 text-white small py-1">
                            <i className="bi bi-star-fill"></i><span>5</span>
                        </div>
                        <div className="d-flex align-items-center gap-1 text-white small py-1">
                            <i className="bi bi-hand-thumbs-up-fill"></i><span>29</span>
                        </div>
                        <div className="d-flex align-items-center gap-1 text-white small py-1">
                            <i className="bi bi-play-fill"></i><span>209</span>
                        </div>
                    </div>

                    <hr />

                    <p className="small my-1 text-white">
                        I hereby certify that the profile from CPLSUEPAUL is for real!
                    </p>

                    <hr />

                    <div className="text-start text-secondary small mt-1">
                        <div style={{ color: "#EC5252" }}>Feb 08, 2025</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotesCard;