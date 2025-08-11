//wrapper component
// import FrontScreenLeftSidebar from "./FrontScreenLeftBar/FrontScreenLeftSidebar";
import FrontScreenTopBar from "./FrontScreenTopBar/FrontScreenTopBar";
// import FrontScreenTopBar from "./FrontScreenTopBar/FrontScreenTopBar";
// import React from "react";
// import SettingSidebar from "./SettingSidebar/SettingsSidebar";

const GlobalPageWrapper = ({ children }) => {
  return (
    <>
      {/* <FrontScreenLeftSidebar /> */}
      <FrontScreenTopBar />
      
      {children}

      
    </>
  );
};
export default GlobalPageWrapper;