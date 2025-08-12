import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import "./groupcss.css"

import img1 from "./img/couple.avif";
import img2 from "./img/coupleImg.jpeg";
import img3 from "./img/profileImg.png";
import img4 from "./img/profileImg.webp";
import pc from "./img/pc.png";
import chat from "./img/chat.png";
import male from "./img/male.png";
import female from "./img/female.png";

const images = [img1, img2, img3, img4];

const Groups = () => {
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
      className="rounded-4 text-white pb-3 px-3 pt-3 group position-relative overflow-hidden mt-4 mx-auto"
      style={{
        backgroundColor: "var(--color-border)",
        border: "1px solid #ffffff",
        width: "540px",
        minWidth: "540px",
        flexShrink: 0,
      }}
    >
      {/* 📸 Image & Info */}
      <div className="row g-3">
        <div className="col-lg-6 pe-lg-2">
          <img
            src={img2}
            alt="Profile"
            className="w-100 rounded-3"
            style={{ objectFit: "cover", height: "250px" }}
          />
        </div>

        <div className="col-lg-6 d-flex flex-column justify-content-between ps-2">
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="fw-bold mb-3" style={{color:"var(--color-primary-green)"}}>FOR2MORE</h4>
            </div>

            <hr className="my-2" />

            <div className="mb-2 d-flex gap-2 align-items-center">
              <p className="mb-0 fw-semibold fs-6">by FUN4TWO</p>
            </div>

            <hr className="my-2" />

            <div className="small text-white gap-2 mb-2 d-flex">
              <div>
                <i className="bi bi-geo-alt-fill"></i>
              </div>
              <div>94555, CA 94555, USA | 8412 mi</div>
            </div>

            <hr className="my-2" />

            <div className="d-flex gap-2">
              <div className="d-flex gap-2">
                <div className="small text-white">
                  <i className="bi bi-file-earmark-text-fill"></i>
                </div>
                <div className="small text-white">
                  <p>556</p>
                </div>
              </div>
              <div className="d-flex gap-2">
                <div className="small text-white">
                  <i className="bi bi-file-earmark-text-fill"></i>
                </div>
                <div className="small text-white">
                  <p>556</p>
                </div>
              </div>
            </div>

            <hr className="my-2" />

            <div className="text-secondary small">
              <span className="" style={{color:"var(--color-primary-green)"}}>by FOR2MORE</span> Feb 08, 2025
            </div>
          </div>
        </div>
      </div>

      {/* 👇 Hidden Description & Join - visible on hover */}
      <div
        className="hover-overlay position-absolute bottom-0 start-0 w-100 p-4 text-light transition-all "
        style={{
          opacity: 0.2, // ✅ Valid opacity value (20%)
          visibility: "hidden",
          backgroundColor: "var(--color-border)"
        }}
      >
        <p className="mb-2 small">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, doloribus maiores placeat eaque rem enim.
        </p>
        <div
          className="text-primary d-flex align-items-center gap-1"
          style={{ cursor: "pointer" }}
        >
          <i className="bi bi-plus" />
          <span>Join</span>
        </div>
      </div>

    </div>


  );
};

export default Groups;

