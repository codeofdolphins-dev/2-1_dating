import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
// import "./groupcss.css"

import img2 from "./img/coupleImg.jpeg";


const PartiesAndeventCard = ({
  title = "",
  address = "",
  createdBy = "",
  date = ""
}) => {
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
      className="rounded-4 text-white pb-3 px-3 pt-3 group position-relative overflow-hidden"
      style={{
        backgroundColor: "var(--color-border)",
        // width: "600px",
        // minWidth: "600px",
        flexShrink: 0,
        border: "1px solid #ffffff"
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
              <h5 className="fw-bold text-start" style={{ color: "var(--color-primary-green)" }}>
                { title || "PORNSTARS ENVY HARDCORE NASTY WITH CLASS DALLAS TX"}
              </h5>
            </div>

            <hr className="my-2" />

            <div className="small text-white d-flex gap-2 align-items-center mb-2">
              <i className="bi bi-geo-alt-fill"></i>
              <span>{ address || "94555, CA 94555, USA | 8412 mi"}</span>
            </div>

            <hr className="my-2" />

            <div className="text-secondary small">
              <span className="" style={{ color: "var(--color-primary-green)" }}>by { createdBy || "FOR2MORE"}</span> { date || "Feb 08, 2025"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartiesAndeventCard;

