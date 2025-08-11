import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import "./groupcss.css"

import img2 from "../../../../assets/ViwCardImags/img/profileImg.png";


const Groups = ({
    title= "",
    createdBy = "",
    location = "",
    number1 = "",
    number2 = "",
    date = "",
    description = ""
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
        backgroundColor: "#343A40",
        border: "1px solid #ffffff",
        // maxWidth: "450px",
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
              <h5 className="fw-bold mb-3" style={{color:"var(--color-primary-green)"}}> {title || "---"} </h5>
            </div>

            <hr className="my-2" />

            <div className="mb-2 d-flex gap-2 align-items-center">
              <p className="mb-0 fw-semibold fs-6">by {createdBy || "---"} </p>
            </div>

            <hr className="my-2" />

            <div className="small text-white gap-2 mb-2 d-flex">
              <div>
                <i className="bi bi-geo-alt-fill"></i>
              </div>
              <div> {location || "---"} </div>
            </div>

            <hr className="my-2" />

            <div className="d-flex gap-2">
              <div className="d-flex gap-2">
                <div className="small text-white">
                  <i className="bi bi-file-earmark-text-fill"></i>
                </div>
                <div className="small text-white">
                  <p> {number1 || "---"} </p>
                </div>
              </div>
              <div className="d-flex gap-2">
                <div className="small text-white">
                  <i class="bi bi-people-fill"></i>
                </div>
                <div className="small text-white">
                  <p> {number2 || "---"} </p>
                </div>
              </div>
            </div>

            <hr className="my-2" />

            <div className="text-danger small">
              <span className="text-danger"></span>Since {date || "--- --, ----"}
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
        <p className="mb-2 small"> {description || "lorem ipsum"} </p>
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