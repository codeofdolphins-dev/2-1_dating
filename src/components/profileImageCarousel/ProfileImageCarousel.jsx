import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import profileImg from "./img/profileImg.png";
import profileImg2 from "./img/coupleImg.jpeg";
import profileImg3 from "./img/profileImg.webp";

import "./profileCarouselCss/style.css";

const images = [profileImg, profileImg2, profileImg3];

export default function ProfileImageCarousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null); // Store swiper instance
  const [activeIndex, setActiveIndex] = useState(0);

  // 🔧 Attach navigation buttons after Swiper is initialized and refs are set
  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.destroy(); // Clean up existing nav
      swiperInstance.navigation.init();    // Re-init navigation
      swiperInstance.navigation.update();  // Update it
    }
  }, [swiperInstance]);

  return (
    <div className="custom-swiper-wrapper position-relative">
      <Swiper
        modules={[Navigation, Pagination]}
        onSwiper={setSwiperInstance} // 🔧 Save Swiper instance
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        slidesPerView={1}
        spaceBetween={50}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img}
              alt={`Slide ${idx}`}
              className="w-100 rounded-4"
              style={{ height: "300px", objectFit: "cover" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 🔧 Custom Prev Button */}
      <div
        ref={prevRef}
        className="custom-prev position-absolute bottom-0 start-0 translate-middle-y rounded-circle bg-primary mx-1"
        style={{ zIndex: 10, cursor: "pointer", padding: "5px 10px" }}
      >
        <i className="bi bi-chevron-left text-white fs-6" />
      </div>

      {/* 🔧 Custom Next Button */}
      <div
        ref={nextRef}
        className="custom-next position-absolute bottom-0 end-0 translate-middle-y rounded-circle bg-primary mx-1"
        style={{ zIndex: 10, cursor: "pointer", padding: "5px 10px" }}
      >
        <i className="bi bi-chevron-right text-white fs-6" />
      </div>

      {/* 🔢 Custom Slide Count */}
      <div
        className="position-absolute bottom-0 start-50 translate-middle-x text-white fs-5 px-3 py-1 mb-3"
        style={{ zIndex: 10 }}
      >
        {activeIndex + 1} / {images.length}
      </div>
    </div>
  );
}
