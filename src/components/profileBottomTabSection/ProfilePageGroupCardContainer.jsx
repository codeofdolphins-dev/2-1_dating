import React, { useRef } from "react";
import Groups from "../profilePageBottomCards/groupCard/Groups";
// import "./horizontalScroll.css";


const ProfilePageGroupCardContainer = () => {
  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDown.current = true;
    scrollRef.current.classList.add("active");
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    scrollRef.current.classList.remove("active");
  };

  const handleMouseUp = () => {
    isDown.current = false;
    scrollRef.current.classList.remove("active");
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Increase for faster scroll
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div
      className="scroll-container d-flex overflow-x-auto gap-4 px-4 py-2 mt-4"
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <Groups />
      <Groups />
      <Groups />
      <Groups />
      <Groups />
      <Groups />
    </div>
  );
};

export default ProfilePageGroupCardContainer;
