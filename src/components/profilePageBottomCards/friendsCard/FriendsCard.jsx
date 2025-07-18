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


const images = [img1, img2, img3, img4];

const FriendsCard = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [swiperInstance, setSwiperInstance] = useState(null);

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
        <div className="row g-3 rounded-4 text-white pb-2 ml-3 mt-4" style={{ backgroundColor: "var(--color-border)",border:"1px solid #ffffff", maxWidth: "650px" }}>
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
                            <h5 className="fw-bold mb-0" style={{color:"var(--color-primary-green)"}}>BOLEROPALACE</h5>
                        </div>
                        <div className="d-flex gap-2">
                            <img src={star} height={30} alt="Star" />
                        </div>
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

                    <hr />
                    <div className="mb-2 d-flex align-items-center gap-3 pt-2">
                        {/* Label */}
                        <p className="mb-0 fw-semibold fs-5">Interests:</p>

                        {/* Icons */}
                        <div className="d-flex gap-1">
                            <img src={male} height={20} alt="male" />
                            <img src={female} height={20} alt="female" />
                            <img src={male} height={20} alt="male" />
                        </div>
                    </div>

                    <hr />
                    <div className="d-flex align-items-center gap-2 text-white small py-2">
                        <i className="bi bi-geo-alt-fill"></i>
                        <span>Altedo, ITA | 4256 mi</span>
                    </div>

                    <hr />

                    <div className="d-flex gap-3">
                        <div>
                            <div className="d-flex align-items-center gap-2 text-white small py-2">
                                <i class="bi bi-camera-fill"></i>
                                <span>41</span>
                            </div>
                        </div>

                        <div>
                            <div className="d-flex align-items-center gap-2 text-white small py-2">
                                <i class="bi bi-person-fill"></i>
                                <span>12</span>
                            </div>
                        </div>

                        <div>
                            <div className="d-flex align-items-center gap-2 text-white small py-2">
                                <i class="bi bi-star-fill"></i>
                                <span>5</span>
                            </div>
                        </div>

                        <div>
                            <div className="d-flex align-items-center gap-2 text-white small py-2">
                                <i class="bi bi-play-fill"></i>
                                <span>209</span>
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

        </div>
    );
};

export default FriendsCard;

