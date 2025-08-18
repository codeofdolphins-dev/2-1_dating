import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';

// import ReactTimeAgo from 'react-time-ago';
// import TimeAgo from 'javascript-time-ago';
// import en from 'javascript-time-ago/locale/en.json';

import pc from "../../assets/ViwCardImags/img/pc.png";
import chat from "../../assets/ViwCardImags/img/chat.png";
import male from "../../assets/ViwCardImags/img/male.png";
import female from "../../assets/ViwCardImags/img/female.png";
import phone from "../../assets/ViwCardImags/img/phone.png";
import star from "../../assets/ViwCardImags/img/star.png";
import trash from "../../assets/icons/trash.png";

import ActionMenu from "./ActionMenu/Actionmenu";
import ViewpagePhotoGallery from "../viewPagePhotovallery/ViewpagePhotoGallery";
import ViewpageMessengerPopup from "../MessengerPopup/MessengerPopup";
import { useNavigate } from "react-router-dom";

// 📌 Add locale setup once
// TimeAgo.addDefaultLocale(en);

const ViewPageCard = ({ index, images, card, rawTimestamp, showFriendOptions, deleteOption = false }) => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [time, setTime] = useState("")

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

  const navigate = useNavigate();
  const handleNavigateToProfilepage = () => {
    navigate("/profile", {
      state: {
        userId: card?._id,
        username: card?.username,
        role: card?.role
      }
    });
  };

  // 🕒 Convert timestamp string to Date object
  // let dateObj = null;
  // if (typeof rawTimestamp === "string") {
  //   const parsed = Date.parse(rawTimestamp); // works if timestamp is ISO or similar
  //   console.log(parsed)
  //   if (!isNaN(parsed)) {
  //     dateObj = new Date(parsed);
  //   }
  // }

  // timestamp in milliseconds

  useEffect(() => {
    if (rawTimestamp) {
      // Ensure timestamp is a number
      const timestampMs = typeof rawTimestamp === "string"
        ? Date.parse(rawTimestamp)
        : rawTimestamp;

      if (!isNaN(timestampMs)) {
        const now = Date.now();
        const diffMs = now - timestampMs; // difference in milliseconds

        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMinutes / 60);

        let timeAgo = '';
        if (diffMinutes <= 0) {
          timeAgo = "just now";
        } else if (diffHours > 0) {
          timeAgo = `${diffHours} H${diffHours > 1 ? 's' : ''} ${diffMinutes % 60} M${diffMinutes % 60 !== 1 ? '' : ''}`;
        } else {
          timeAgo = `${diffMinutes} M${diffMinutes > 1 ? '' : ''}`;
        }

        setTime(timeAgo);
        console.log(timeAgo);
      }
      else {
        console.error("Invalid timestamp:", rawTimestamp);
      }
    }
  }, [rawTimestamp])



  return (
    <div className="row g-3 rounded-4 text-white pb-2 ml-3"
      style={{ backgroundColor: "var(--color-border)", border: "2px solid #ffffff", maxWidth: "650px" }}
    >
      {/* Left: Image Carousel */}
      <div className="col-lg-6 pe-lg-3 position-relative mt-2">
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
      <div className="col-lg-6 d-flex flex-column justify-content-between ps-3" onClick={handleNavigateToProfilepage}>
        <div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h4 className="fw-bold mb-0">{card?.username}</h4>
            <div><img src={star} height={30} alt="Star" /></div>
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
            <p className="mb-0 fw-semibold fs-5">Interests:</p>
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
          <div className="d-flex gap-2">
            <div className="d-flex align-items-center gap-2 text-white small py-2">
              <i className="bi bi-camera-fill"></i><span>41</span>
            </div>
            <div className="d-flex align-items-center gap-2 text-white small py-2">
              <i className="bi bi-person-fill"></i><span>12</span>
            </div>
            <div className="d-flex align-items-center gap-2 text-white small py-2">
              <i className="bi bi-star-fill"></i><span>5</span>
            </div>
            {deleteOption &&
              <div className="d-flex align-items-center gap-2 text-white small py-2">
                <i className="bi bi-hand-thumbs-up-fill"></i><span>29</span>
              </div>
            }
            <div className="d-flex align-items-center gap-2 text-white small py-2">
              <i className="bi bi-play-fill"></i><span>209</span>
            </div>
          </div>

          <div className="d-flex justify-content-between gap-5 align-items-center">
            <div className="d-flex gap-3 mt-2">
              <img src={phone} alt="" height={30} />
              <img src={pc} alt="" height={30} />
              {!deleteOption &&
                <img src={chat} alt="" height={30} />
              }
            </div>

            {
              showFriendOptions && <div className="pt-2 pl-5">
                <div className="d-flex align-items-center gap-2 mt-0">
                  <div className=" mt-2">
                    <input
                      className=" mt-0"
                      type="checkbox"
                      style={{ height: 20, width: 20, cursor: "pointer" }}
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    <img src={trash} alt="delete" height={20} />
                  </div>
                </div>
              </div>
            }

            {
              deleteOption && <div className="pt-2 pl-5">
                <div className="d-flex align-items-center gap-2 mt-0">
                  <div className="d-flex align-items-center">
                    <img src={trash} alt="delete" height={20} />
                  </div>
                </div>
              </div>
            }

            {/* {

              dateObj && (
                <div className="text-danger">
                  <ReactTimeAgo date={dateObj} locale="en-US" />
                </div>
              )} */}

            {time && <div className="text-danger">{time}</div>}

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

export default ViewPageCard;
