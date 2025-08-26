import React, { useState, useRef, useEffect, useCallback } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import {
  BsMessenger,
  BsHandThumbsUp,
  BsPersonPlus,
  BsBell,
} from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { showSuccessToast } from "../../customToast/CustomToast";
// import ViewPageMessangerPopup from "../viewPageMessangerPopup/viewPageMessangerPopup";

const ActionMenu = ({ showMeessagePopup, setshowMeessagePopup, targetUserId = "507f1f77bcf86cd799439011", handleFriendRequest }) => {

  const [showLikeSubmenu, setShowLikeSubmenu] = useState(false);
  const [isLiked, setIsLiked] = useState({ id: "", status: false });


  const likeRef = useRef(null);
  const submenuRef = useRef(null);

  // Close submenu when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        submenuRef.current &&
        !submenuRef.current.contains(e.target) &&
        !likeRef.current.contains(e.target)
      ) {
        setShowLikeSubmenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // const handleMessagePopup = () => {
  //   setShowChat(!showChat)
  // }

  // Fetch current like status
  const fetchLikeStatus = useCallback(() => {
    axios({
      method: 'get',
      url: `${import.meta.env.VITE_BASE_URL}/interactions`,
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
      }
    })
      .then(res => {
        console.log(res)
        const liked = res.data?.data?.find(like => like.targetUserId === targetUserId);
        if (liked) {
          setIsLiked({ id: liked._id, status: true });
        } else {
          setIsLiked({ id: "", status: false });
        }
      })
      .catch(console.error);
  }, [targetUserId]);


  useEffect(() => {
    fetchLikeStatus();
  }, [fetchLikeStatus]);

  // Like post
  const handleLike = useCallback(() => {
    axios({
      method: 'post',
      url: `${import.meta.env.VITE_BASE_URL}/interactions`,
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`,
        'Content-Type': 'application/json'
      },
      data: {
        targetUserId,
        interactionType: "like"
      }
    })
      .then(res => {
        setIsLiked({ id: res?.data?.data?._id, status: true });
        // Optionally re-fetch
        fetchLikeStatus();
        console.log(res?.data?.message)
        showSuccessToast(`You Liked The User`);
        // if (res?.status === 200) {
        // }
      })
      .catch(console.error);
  }, [targetUserId, fetchLikeStatus]);

  // Dislike post
  const handleDisLike = useCallback(() => {
    if (!isLiked.id) return;
    console.log(isLiked._id)
    axios({
      method: 'delete',
      url: `${import.meta.env.VITE_BASE_URL}/interactions/${isLiked.id}`,
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`,
      }
    })
      .then(res => {
        setIsLiked({ id: "", status: false });
        // Optionally re-fetch
        fetchLikeStatus();
        console.log(res)
        if (res?.status === 200) {
          showSuccessToast("You removed like");
        }
      })
      .catch(console.error);
  }, [isLiked.id, fetchLikeStatus]);


  // Not interested
  const handleNotInterested = useCallback(() => {
    axios({
      method: 'post',
      url: `${import.meta.env.VITE_BASE_URL}/interactions`,
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`,
        'Content-Type': 'application/json'
      },
      data: {
        targetUserId,
        interactionType: "dislike"
      }
    })
      .then(res => {
        setIsLiked({ id: res.data._id, status: true });
        // Optionally re-fetch
        fetchLikeStatus();
        console.log(res)
        showSuccessToast("You disliked");
        // if (res?.status === 200) {
        // }
      })
      .catch(console.error);
  }, [targetUserId, fetchLikeStatus]);

  const handelLikeDislike = () => {
    if (isLiked.status) handleDisLike();
    else handleLike();
  }




  const popover = (
    <Popover
      id="action-popover"
      className=" text-white border-0 rounded-3 shadow"
      style={{ cursor: "pointer", minWidth: "180px", backgroundColor: "var(--color-background)" }}
    >
      <Popover.Body className="p-2 position-relative" style={{ zIndex: "555" }}>
        <div className="d-flex align-items-center gap-2 p-2 rounded-2 hover-bg text-white" onClick={(() => setshowMeessagePopup(!showMeessagePopup))}>
          <BsMessenger />
          <span>Messenger</span>

        </div>

        {/* Like with submenu */}
        <div
          className="d-flex align-items-center gap-2 p-2 rounded-2 hover-bg text-white position-relative"
          ref={likeRef}
          onClick={() => setShowLikeSubmenu((prev) => !prev)}
        >
          <BsHandThumbsUp />
          <span>Like</span>

          {showLikeSubmenu && (
            <div
              ref={submenuRef}
              className="position-absolute text-white rounded-2 shadow ml-2"
              style={{
                top: 0,
                left: "102%",
                marginLeft: "8px",
                minWidth: "150px",
                zIndex: 1051,
                backgroundColor: "var(--color-background)"
              }}
            >
              <div onClick={handelLikeDislike} className={`d-flex align-items-center gap-2 p-2 hover-bg ${isLiked.status ? "text-primary" : "text-white"}`}>
                <i className="bi bi-hand-thumbs-up"></i>
                <span>Like</span>
              </div>
              <div className="d-flex align-items-center text-white gap-2 p-2 hover-bg" onClick={handleNotInterested}>
                <i className="bi bi-hand-thumbs-down"></i>
                <span>Not Interested</span>
              </div>

            </div>
          )}
        </div>

        <div className="d-flex align-items-center gap-2 p-2 rounded-2 hover-bg text-white" onClick={handleFriendRequest}>
          <BsPersonPlus />
          <span>Friend request</span>
        </div>
        <div className="d-flex align-items-center gap-2 p-2 rounded-2 hover-bg text-white">
          <BsBell />
          <span>Remember</span>
        </div>
      </Popover.Body>

    </Popover>
  );

  return (
    <>
      <OverlayTrigger trigger="click" placement="top" overlay={popover} rootClose>
        <button
          className="bg-danger border-0 rounded-circle text-white d-flex justify-content-center align-items-center"
          style={{ width: "32px", height: "32px" }}
        >
          <i className="bi bi-chevron-up"></i>
        </button>
      </OverlayTrigger>

    </>
  );
};

export default ActionMenu;

// import React, { useState } from 'react';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// import "./ActionMenuCss/style.css";
// import {
//   BsMessenger,
//   BsHandThumbsUp,
//   BsHandThumbsDown,
//   BsPersonPlus,
//   BsBell
// } from 'react-icons/bs';

// const ActionMenu = ({ index, card }) => {
//   const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
//   return (
//     <Popup
//       trigger={
//         <button className="btn btn-dark rounded-circle" onClick={() => index}>

//           <i className="bi bi-chevron-up"></i>
//         </button>
//       }
//       position="top right"
//       closeOnDocumentClick
//       arrow={false}
//       nested
//     >
//       <div
//         style={{
//           color: 'white',
//           borderRadius: '12px',
//           padding: '12px',
//           minWidth: '200px',
//           fontSize: '14px'
//         }}
//         onMouseLeave={() => setIsSubmenuOpen(false)}
//       >
//         <div className="d-flex align-items-center gap-2 py-2" style={{ cursor: 'pointer' }}>
//           <BsMessenger size={18} />
//           <span>Messenger</span>
//         </div>

//         <div
//           className="d-flex align-items-center gap-2 py-2 position-relative"
//           onMouseEnter={() => setIsSubmenuOpen(true)}
//           style={{ color: '#1976d2', cursor: 'pointer' }}
//         >
//           <BsHandThumbsUp size={18} />
//           <span>Like</span>
//           <span>{card.title}</span>

//           {isSubmenuOpen && (
//             <div
//               style={{
//                 position: 'absolute',
//                 top: '0',
//                 left: '100%',
//                 marginLeft: '8px',
//                 backgroundColor: '#2a2e35',
//                 borderRadius: '10px',
//                 padding: '10px 12px',
//                 boxShadow: '0 0 10px rgba(0,0,0,0.3)',
//                 zIndex: 999,
//                 minWidth: '160px'
//               }}
//             >
//               <div className="d-flex align-items-center gap-2 py-1 text-white" style={{ cursor: 'pointer' }}>
//                 <BsHandThumbsUp size={16} />
//                 <span>Like</span>
//               </div>
//               <div className="d-flex align-items-center gap-2 py-1 text-white" style={{ cursor: 'pointer' }}>
//                 <BsHandThumbsDown size={16} />
//                 <span>Not Interested</span>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="d-flex align-items-center gap-2 py-2" style={{ cursor: 'pointer' }}>
//           <BsPersonPlus size={18} />
//           <span>Friend request</span>
//         </div>

//         <div className="d-flex align-items-center gap-2 py-2" style={{ cursor: 'pointer' }}>
//           <BsBell size={18} />
//           <span>Remember</span>
//         </div>
//       </div>
//     </Popup>
//   );
// };

// export default ActionMenu;






