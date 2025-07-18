// import React, { useState, useRef, useEffect } from "react";
// import { OverlayTrigger, Popover } from "react-bootstrap";
// import {
//     BsMessenger,
//     BsHandThumbsUp,
//     BsPersonPlus,
//     BsBell,
// } from "react-icons/bs";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import ViewPageMessangerPopup from "../viewPageMessangerPopup/viewPageMessangerPopup";

// const ActionMenu = () => {
//     const [showLikeSubmenu, setShowLikeSubmenu] = useState(false);
//      const[showChat,setShowChat]=useState(false)
//     const likeRef = useRef(null);
//     const submenuRef = useRef(null);

//     // Close submenu when clicked outside
//     useEffect(() => {
//         const handleClickOutside = (e) => {
//             if (
//                 submenuRef.current &&
//                 !submenuRef.current.contains(e.target) &&
//                 !likeRef.current.contains(e.target)
//             ) {
//                 setShowLikeSubmenu(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     const handleMessagePopup=()=>{
//         setShowChat(!showChat)
//     }

//     const popover = (
//         <Popover
//             id="action-popover"
//             className=" text-white border-0 rounded-3 shadow"
//             style={{ cursor: "pointer", minWidth: "180px",backgroundColor:"var(--color-background)" }}
//         >
//             <Popover.Body className="p-2 position-relative" style={{zIndex:"555"}}>
//                 <div className="d-flex align-items-center gap-2 p-2 rounded-2 hover-bg text-white" onClick={handleMessagePopup}>
//                     <BsMessenger />
//                     <span>Messenger</span>
//                 </div>

//                 {/* Like with submenu */}
//                 <div
//                     className="d-flex align-items-center gap-2 p-2 rounded-2 hover-bg text-primary position-relative"
//                     ref={likeRef}
//                     onClick={() => setShowLikeSubmenu((prev) => !prev)}
//                 >
//                     <BsHandThumbsUp />
//                     <span>Like</span>

//                     {showLikeSubmenu && (
//                         <div
//                             ref={submenuRef}
//                             className="position-absolute text-white rounded-2 shadow ml-2"
//                             style={{
//                                 top: 0,
//                                 left: "102%",
//                                 marginLeft: "8px",
//                                 minWidth: "150px",
//                                 zIndex: 1051,
//                                 backgroundColor:"var(--color-background)"
//                             }}
//                         >
//                             <div className="d-flex align-items-center text-white gap-2 p-2 hover-bg">
//                                 <i className="bi bi-hand-thumbs-up"></i>
//                                 <span>Like</span>
//                             </div>
//                             <div className="d-flex align-items-center text-white gap-2 p-2 hover-bg">
//                                 <i className="bi bi-hand-thumbs-down"></i>
//                                 <span>Not Interested</span>
//                             </div>

//                         </div>
//                     )}
//                 </div>

//                 <div className="d-flex align-items-center gap-2 p-2 rounded-2 hover-bg text-white">
//                     <BsPersonPlus />
//                     <span>Friend request</span>
//                 </div>
//                 <div className="d-flex align-items-center gap-2 p-2 rounded-2 hover-bg text-white">
//                     <BsBell />
//                     <span>Remember</span>
//                 </div>
//             </Popover.Body>
//         </Popover>
//     );

//     return (
//         <>
//         <OverlayTrigger trigger="click" placement="top" overlay={popover} rootClose>
//             <button
//                 className="bg-danger border-0 rounded-circle text-white d-flex justify-content-center align-items-center"
//                 style={{ width: "32px", height: "32px" }}
//             >
//                 <i className="bi bi-chevron-up"></i>
//             </button>
//         </OverlayTrigger>
//             {showChat && <ViewPageMessangerPopup/>}
//         </>
//     );
// };

// export default ActionMenu;

import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { BsHandThumbsUp } from 'react-icons/bs';

const CardComponent = ({ item }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);

  const toggleSubmenu = () => setShowSubmenu(!showSubmenu);

  return (
    <div className="card p-3 m-2" style={{ backgroundColor: '#222', color: '#fff' }}>
      <h5>{item.title}</h5>

      {/* Scoped Popup for each card */}
      <Popup
        trigger={
          <button className="btn btn-outline-light">
            <BsHandThumbsUp /> Action
          </button>
        }
        position="top center"
        closeOnDocumentClick
        arrow={false}
        nested
      >
        <div
          style={{
            backgroundColor: '#010B3C',
            borderRadius: '10px',
            padding: '10px 15px',
            color: 'white',
            minWidth: '200px',
          }}
        >
          <div onClick={toggleSubmenu}>Like</div>

          {showSubmenu && (
            <div
              style={{
                backgroundColor: '#01174A',
                borderRadius: '8px',
                marginTop: '5px',
                padding: '8px 12px',
              }}
            >
              <div className="text-white py-1 px-2" style={{ cursor: 'pointer' }}>
                Like
              </div>
              <div className="text-white py-1 px-2" style={{ cursor: 'pointer' }}>
                Not Interested
              </div>
            </div>
          )}
        </div>
      </Popup>
    </div>
  );
};

export default CardComponent;





