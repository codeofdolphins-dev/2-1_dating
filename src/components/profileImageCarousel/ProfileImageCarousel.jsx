import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import profileImg from "./img/profileImg.png";
import profileImg2 from "./img/coupleImg.jpeg";
import profileImg3 from "./img/profileImg.webp";
import profileImg4 from "./img/couple.avif";
import "./profileCarouselCss/style.css";

const images = [profileImg, profileImg2, profileImg3,profileImg4];

export default function ProfileImageCarousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  // Attach navigation to main swiper
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
    <>
      {/* 🔳 Main Swiper with click to open modal */}
      <div
        className="custom-swiper-wrapper position-relative h-100"
        style={{ cursor: "pointer" }}

      >
        <Swiper
          modules={[Navigation, Pagination]}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          slidesPerView={1}
          spaceBetween={50}
          className="h-100"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`Slide ${idx}`}
                className="w-100 rounded-4"
                style={{
                height: "380px",          // ✅ Fixed height
                width: "auto",            // Maintain aspect ratio
                objectFit: "cover",       // Cover the space without distortion
                maxWidth: "100%"          // Prevent overflow on smaller screens
              }}
                onClick={() => {
                  setModalIndex(activeIndex); // set current slide index in modal
                  setIsModalOpen(true);
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <div
          ref={prevRef}
          className="custom-prev position-absolute bottom-0 start-0 translate-middle-y rounded-circle bg-primary mx-1"
          style={{ zIndex: 10, cursor: "pointer", padding: "5px 10px" }}
        >
          <i className="bi bi-chevron-left text-white fs-6" />
        </div>
        <div
          ref={nextRef}
          className="custom-next position-absolute bottom-0 end-0 translate-middle-y rounded-circle bg-primary mx-1"
          style={{ zIndex: 10, cursor: "pointer", padding: "5px 10px" }}
        >
          <i className="bi bi-chevron-right text-white fs-6" />
        </div>

        {/* Slide Count */}
        <div
          className="position-absolute bottom-0 start-50 translate-middle-x text-white fs-5 px-3 py-1 mb-3"
          style={{ zIndex: 10 }}
        >
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* 🔲 Modal Swiper */}
      {isModalOpen && (
  <div
    className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center"
    style={{ zIndex: 2000 }}
    onClick={() => setIsModalOpen(false)}
  >
    <div
      className="position-relative  p-3 rounded-4 animate-popup d-flex flex-column align-items-center"
      style={{ width: "90%", maxWidth: "800px", maxHeight: "90vh",backgroundColor:"#6c757d" }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Swiper inside Modal */}
      <Swiper
        modules={[Navigation, Pagination]}
        initialSlide={modalIndex}
        onSlideChange={(swiper) => setModalIndex(swiper.activeIndex)}
        slidesPerView={1}
        spaceBetween={30}
        navigation
        className="modal-swiper w-100"
      >
        {images.map((img, idx) => (
          <SwiperSlide
            key={idx}
            className="d-flex justify-content-center"
          >
            <img
              src={img}
              alt={`Slide ${idx}`}
              className="rounded-3"
              style={{
                height: "650px",          // ✅ Fixed height
                width: "auto",            // Maintain aspect ratio
                objectFit: "cover",       // Cover the space without distortion
                maxWidth: "100%"          // Prevent overflow on smaller screens
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal Slide Count */}
      <div
        className="position-absolute bottom-0 start-50 translate-middle-x text-white fs-5 px-3 py-1 mb-3"
        style={{ zIndex: 10 }}
      >
        {modalIndex + 1} / {images.length}
      </div>

      {/* Close Button */}
      <button
        type="button"
        className="btn-close fs-2 btn-close-white position-absolute top-0 end-0 m-3 z-3"
        aria-label="Close"
        onClick={() => setIsModalOpen(false)}
      ></button>
    </div>
  </div>
)}

    </>
  );
}
