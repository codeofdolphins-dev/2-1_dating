import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
// import "./groupcss.css"

import img1 from "./img/couple.avif";
import img2 from "./img/coupleImg.jpeg";
import img3 from "./img/profileImg.png";
import img4 from "./img/profileImg.webp";
import pc from "./img/pc.png";
import chat from "./img/chat.png";
import male from "./img/male.png";
import female from "./img/female.png";

const images = [img1, img2, img3, img4];

const PartiesAndeventCard = () => {
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
   <div
  className="rounded-4 text-white pb-3 px-3 pt-3 group position-relative overflow-hidden mt-4"
  style={{
    backgroundColor: "#343a40",
    width: "600px",
    minWidth: "600px",
    flexShrink: 0,
  }}
>
  {/* 📸 Image & Info */}
  <div className="row g-3 align-items-center" style={{ height: "100%" }}>
  {/* Left Image */}
  <div className="col-lg-6 pe-lg-2">
    <img
      src={img2}
      alt="Profile"
      className="w-100 rounded-3"
      style={{ objectFit: "cover", height: "250px" }}
    />
  </div>

  {/* Right Content - Vertically Centered */}
  <div className="col-lg-6 d-flex align-items-center ps-2">
    <div className="w-100">
      <div className="text-center mb-3">
        <h5 className="fw-bold text-start">
          PORNSTARS ENVY HARDCORE NASTY WITH CLASS DALLAS TX
        </h5>
      </div>

      <hr className="my-2" />

      <div className="small text-white d-flex gap-2 align-items-center mb-2">
        <i className="bi bi-geo-alt-fill"></i>
        <span>94555, CA 94555, USA | 8412 mi</span>
      </div>

      <hr className="my-2" />

      <div className="text-secondary small">
        <span className="text-danger">by FOR2MORE</span> Feb 08, 2025
      </div>
    </div>
  </div>
</div>


  {/* 👇 Hidden Description & Join - visible on hover */}
  <div className="hover-overlay position-absolute bottom-0 start-0 w-100 p-3 bg-dark bg-opacity-75 text-light transition-all" style={{ opacity: 0, visibility: "hidden" }}>
    <p className="mb-2 small">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, doloribus maiores placeat eaque rem enim.
    </p>
    <div className="text-primary d-flex align-items-center gap-1" style={{ cursor: "pointer" }}>
      <i className="bi bi-plus" />
      <span>Join</span>
    </div>
  </div>
</div>


  );
};

export default PartiesAndeventCard;

