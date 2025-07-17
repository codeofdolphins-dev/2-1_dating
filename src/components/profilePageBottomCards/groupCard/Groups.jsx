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
      className="rounded-4 text-white pb-3 px-3 pt-3"
      style={{
        backgroundColor: "#343a40",
        width: "600px",
        minWidth: "600px",
        flexShrink: 0,
      }}
    >
      {/* 📸 Image */}
      <div className="row g-3">
        <div className="col-lg-6 pe-lg-2">
          <img
            src={img2}
            alt="Profile"
            className="w-100 rounded-3"
            style={{ objectFit: "cover", height: "250px" }}
          />
        </div>

        {/* 📝 Info */}
        <div className="col-lg-6 d-flex flex-column justify-content-between ps-2">
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-2">FOR2MORE</h5>
            </div>

            <hr className="my-2" />

            <div className="mb-2 d-flex gap-2 align-items-center">
              <p className="mb-0 fw-semibold fs-6">by FUN4TWO</p>
            </div>

            <hr className="my-2" />

            <div className="small text-secondary mb-2">
              94555, CA 94555, USA | 8412 mi
            </div>

            <hr className="my-2" />

            <p className="small mb-2 text-white">
              I hereby certify that the profile from CPLSUEPAUL is for real!
            </p>

            <hr className="my-2" />

            <div className="text-secondary small">
              <span className="text-danger">by FOR2MORE</span> Feb 08, 2025
            </div>
          </div>
        </div>
      </div>

      {/* Description & Join */}
      <p className="mt-3 text-light small">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, doloribus maiores placeat eaque rem enim.
      </p>
      <div
        className="text-primary d-flex align-items-center gap-1 mt-0"
        style={{ cursor: "pointer" }}
      >
        <i className="bi bi-plus" />
        <span>Join</span>
      </div>
    </div>

    );
};

export default Groups;

