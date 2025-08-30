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

import httpService from "../../helper/httpService";
import OverlayLoader from "../../helper/OverlayLoader"
import { ToastContainer } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../customToast/CustomToast";


import img1 from "../../assets/ViwCardImags/img/couple.avif";
import img2 from "../../assets/ViwCardImags/img/coupleImg.jpeg";
import img3 from "../../assets/ViwCardImags/img/profileImg.png";
import img4 from "../../assets/ViwCardImags/img/profileImg.webp";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { BsChatDots } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import DeviceInfoPopup from "../DeviceInfoPopup/DeviceInfoPopup";
import { timeAgo } from "../../helper/timeAgo";

// 📌 Add locale setup once
// TimeAgo.addDefaultLocale(en);


const cardList = [
  { username: "Card One" },
  { username: "Card Two" },
  { username: "Card Three" },
  { username: "Card Four" },
  { username: "Card Five" },
  { username: "Card Six" },
  { username: "Card Seven" },
  // ...
];

const imageList = [img1, img2, img3, img4];

const ViewPageCard = ({ index, userData, images = imageList, card = cardList, rawTimestamp, showFriendOptions, deleteOption = false, deleteUser, likeIcon = false, refresh, setrefresh, handleeDeleteFunction, showRemembered = true, showlikeDislike = true,showTime }) => {
  // console.log(card._id)
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [time, setTime] = useState("")
  // const [isCheckedFriendrequest, setIsCheckedFriendrequest] = useState(false);
  // console.log(isCheckedFriendrequest)
  // const[loading,setLoading] = useState(true)

  console.log(setrefresh, refresh)

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  // console.log("card",card._id)
  console.log(userData)
  const senderId = userData?.senderId?._id

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




  // handle friend request send
  const handleFriendRequest = async () => {
    try {
      const response = await httpService("/friend-requests", "POST", { receiverId: card._id ? card._id : senderId });
      console.log(response)
      showSuccessToast(response?.message)

    } catch (err) {
      console.error("Failed to send friend request:", err);
      showErrorToast(err?.response?.data?.message)
    }
  };

  // handle friend request decline
  const handleDeclineFriendRequest = async () => {
    console.log("all ok")
    try {
      const response = await httpService(`/friend-requests/${userData._id}/respond`, "PUT", { "action": "decline" })
      if (response) {
        console.log(response)
        showSuccessToast(response?.message);
        setrefresh(!refresh)
      }
    } catch (err) {
      console.log(err)
      showErrorToast(err?.response?.data?.message);
      setrefresh(!refresh)
    }
  }

  // useEffect(() => {
  //   httpService(`/friend-requests/${userData._id}/respond`, "PUT", { "action": "accept" })
  //     .then((response) => {
  //       console.log("Friend request sent:", response);
  //       showSuccessToast(response?.message);
  //       setrefresh(!refresh)
  //     })
  //     .catch((err) => {
  //       console.error("Failed to send friend request:", err);
  //       showErrorToast(err?.response?.data?.message);
  //       setrefresh(!refresh)
  //     });
  // }, []); // dependency on card._id

  const handleAcceptFriendrequest = async () => {
    console.log("all ok")
    try {
      const response = await httpService(`/friend-requests/${userData._id}/respond`, "PUT", { "action": "accept" })
      if (response) {
        console.log(response)
        showSuccessToast(response?.message);
        setrefresh(!refresh)
      }
    } catch (err) {
      console.log(err)
      showErrorToast(err?.response?.data?.message);
      setrefresh(!refresh)
    }
  }


  // handleDeviceInfo show popup

  const handleDeviceShowPopup = () => {
    console.log("all ok")
    setShow(true)
  }

  console.log("userData",card)

  console.log("showTime",showTime)

  return (
    <>
      <ToastContainer />
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
              handleFriendRequest={handleFriendRequest}
              targetUserId={card._id}
              showRemembered={showRemembered}
              showlikeDislike={showlikeDislike}
              receaverId={userData?.receiverId?._id}
            />
          </div>
        </div>

        {/* Right: Card Info */}
        <div className="col-lg-6 d-flex flex-column justify-content-between ps-3" >
          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h4 className="fw-bold mb-0" onClick={handleNavigateToProfilepage} style={{ cursor: "pointer", }}>{userData ? userData?.senderId?.username : card?.targetUserId?.username ? card?.targetUserId?.username : card?.receiverId?.username ? card?.receiverId?.username : card?.viewedUserId?.username ? card?.viewedUserId?.username : card?.username}</h4>

              {/* <div><img src={star} height={30} alt="Star" /></div> */}
              <div className="mb-0"><IoIosStar className="h3 text-warning" /></div>
            </div>

            <div className="d-flex align-items-center flex-wrap gap-3 fw-semibold mb-2">
              <div className="d-flex align-items-center gap-2">
                <FaFemale className="text-danger fs-6" />
                <span className="text-danger">57</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaMale className="text-primary fs-6" />
                <span className="text-primary">57</span>
              </div>
            </div>


            <hr />
            <div className="mb-2 d-flex align-items-center gap-3 pt-2">
              <span className="fw-semibold fs-5">Interests:</span>
              <div className="d-flex align-items-center gap-1">
                <FaMale className="fs-5 text-primary" />
                <FaFemale className="fs-5 text-danger" />
                <FaMale className="fs-5 text-primary" />
              </div>
            </div>


            <hr />
            <div className="d-flex align-items-center gap-2 text-white small py-2">
              <i className="bi bi-geo-alt-fill"></i>
              <span>Altedo, ITA | 4256 mi</span>
            </div>

            <hr />
            <div className="d-flex flex-wrap gap-2">
              <div className="d-flex align-items-center gap-1 text-white small py-2">
                <i className="bi bi-camera-fill"></i><span>41</span>
              </div>
              <div className="d-flex align-items-center gap-1 text-white small py-2">
                <i className="bi bi-person-fill"></i><span>12</span>
              </div>
              <div className="d-flex align-items-center gap-1 text-white small py-2">
                <i className="bi bi-star-fill"></i><span>5</span>
              </div>
              {deleteOption || likeIcon &&
                <div className="d-flex align-items-center gap-1 text-white small py-2">
                  <i className="bi bi-hand-thumbs-up-fill"></i><span>29</span>
                </div>
              }
              <div className="d-flex align-items-center gap-1 text-white small py-2">
                <i className="bi bi-play-fill"></i><span>209</span>
              </div>
            </div>

            <div className="d-flex justify-content-between gap-1 align-items-center">
              <div className="d-flex gap-3 mt-2">

                <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "30px", height: "30px", cursor: "pointer" }}>
                  <MdOutlinePhoneIphone className="text-primary fs-5" onClick={handleDeviceShowPopup} />
                </div>

                <div onClick={handleDeviceShowPopup} className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "30px", height: "30px", cursor: "pointer" }}>
                  <HiMiniComputerDesktop className="text-primary fs-5" />
                </div>

                {!deleteOption &&
                  <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "30px", height: "30px" }}>
                    <BsChatDots className="text-primary fs-6" style={{ cursor: "pointer" }} onClick={() => { setShowMessagePopup(!showMessagePopup) }} />
                  </div>
                }
              </div>

              {
                showFriendOptions && <div className="pt-2 pl-5">
                  {
                    userData.status === "accepted" ? "Friends" :
                      <div className="d-flex align-items-center gap-2 mt-0">
                        {/* Accept Friend Request Icon */}

                        {
                          userData?.status === "pending" &&
                          <FaCheckCircle
                            size={24}
                            style={{ cursor: "pointer", color: "var(--color-primary-green)" }}
                            onClick={handleAcceptFriendrequest}
                          />
                        }


                        {/* Decline Friend Request Icon */}
                        {/* <img
                          src={trash}
                          alt="delete"
                          height={22}
                          style={{ cursor: "pointer" }}
                          onClick={handleDeclineFriendRequest}
                        /> */}

                        {
                          userData?.status === "pending" && <MdDelete
                            className="text-danger"
                            onClick={handleDeclineFriendRequest}
                            style={{ fontSize: "28px", cursor: "pointer" }}
                          />
                        }
                      </div>
                  }

                  {
                    userData.status === "declined" && "declined"

                  }
                </div>
              }


              {deleteUser && <div className="pt-2 pl-5" >
                <div className="d-flex align-items-center gap-2 mt-0">
                  <div className="d-flex align-items-center">
                    <img src={trash} alt="delete" height={20} />
                  </div>
                </div>
              </div>
              }

              {deleteOption && (
                <div className="pt-2 ps-5">
                  <div
                    className="d-flex align-items-center gap-2"
                    onClick={() => {
                      handleeDeleteFunction(card)
                    }} // ✅ consistent
                    style={{ cursor: "pointer" }}
                  >
                    <MdDelete
                      className="text-danger"
                      style={{ fontSize: "28px" }}
                    />
                  </div>
                </div>
              )}


              {/* {

              dateObj && (
                <div className="text-danger">
                  <ReactTimeAgo date={dateObj} locale="en-US" />
                </div>
              )} */}

              {showTime && <div className="text-danger">{card?.createdAt ? timeAgo(card?.createdAt) :  timeAgo(card?.timestamp)}</div>}
              <div className="text-danger">{timeAgo(card?.timestamp)}</div>
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
        {showMessagePopup && <ViewpageMessengerPopup userName={card?.username} profileImg={images[2]} show={showMessagePopup} handleClose={() => setShowMessagePopup(false)} />}

        <DeviceInfoPopup show={show} setShow={setShow} />
      </div>
    </>
  );
};

export default ViewPageCard;
