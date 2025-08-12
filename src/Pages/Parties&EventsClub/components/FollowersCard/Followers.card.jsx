import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';


import pc from "../../../../assets/ViwCardImags/img/pc.png";
import glassIcon from "../../../../assets/ViwCardImags/img/drink.png";
import male from "../../../../assets/ViwCardImags/img/male.png";
import female from "../../../../assets/ViwCardImags/img/female.png";
import phone from "../../../../assets/ViwCardImags/img/phone.png";

import ActionMenu from "./ActionMenu/Actionmenu";
import ViewpagePhotoGallery from "../../../../components/viewPagePhotovallery/ViewpagePhotoGallery";
import ViewpageMessengerPopup from "../../../../components/MessengerPopup/MessengerPopup";


import img1 from "../../../../assets/ViwCardImags/img/couple.avif";
import img2 from "../../../../assets/ViwCardImags/img/coupleImg.jpeg";
import img3 from "../../../../assets/ViwCardImags/img/profileImg.png";
import img4 from "../../../../assets/ViwCardImags/img/profileImg.webp";

const images = [img1, img2, img3, img4];


const FollowersCard = ({ index, timestamp }) => {
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
    <div className="row g-3 rounded-4 text-white pb-2 ml-3 m-0"
      style={{
        backgroundColor: "var(--color-border)",
        border: "2px solid #ffffff",
        // maxWidth: "650px" 
      }}
    >

      {/* Left: Image Carousel */}
      <div className="col-lg-6 pe-lg-3 position-relative mt-2 ">
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
                    height: "250px",
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
            <h5 className="fw-bold mb-0" style={{ fontSize: "18px" }}>BOLEROPALACE</h5>
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
            <p className="mb-0 fw-semibold" style={{ fontSize: "14px" }}>Swinger</p>
          </div>

          <hr />
          <div className="d-flex align-items-center gap-2 text-white small py-2">
            <i className="bi bi-geo-alt-fill"></i>
            <span style={{ fontSize: "10px" }}>Altedo, ITA | 4256 mi</span>
          </div>

          <hr />
          <div className="d-flex gap-3">
            <div className="d-flex align-items-center gap-2 text-white small py-2">
              <i className="bi bi-camera-fill"></i><span>41</span>
            </div>
            <div className="d-flex align-items-center gap-2 text-white small py-2">
              <i className="bi bi-person-fill"></i><span>12</span>
            </div>
            <div className="d-flex align-items-center gap-2 text-white small py-2">
              <i className="bi bi-star-fill"></i><span>5</span>
            </div>
            <div className="d-flex align-items-center gap-2 text-white small py-2">
              <i className="bi bi-play-fill"></i><span>209</span>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-end">
            <div className="d-flex gap-3 mt-2">
              <img src={glassIcon} alt="" height={30} />
              <img src={phone} alt="" height={30} />
              <img src={pc} alt="" height={30} />
            </div>

            {
              timestamp && <div className="text-danger">8h4m</div>
            }

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

export default FollowersCard;