//wrapper component
// import FrontScreenLeftSidebar from "./FrontScreenLeftBar/FrontScreenLeftSidebar";
import FrontScreenTopBar from "./FrontScreenTopBar/FrontScreenTopBar";
// import FrontScreenTopBar from "./FrontScreenTopBar/FrontScreenTopBar";
// import React from "react";
// import SettingSidebar from "./SettingSidebar/SettingsSidebar";

const GlobalPageWrapper = ({ children }) => {
  return (
    <>
    <div style={{backgroundColor:"var(--color-background)"}}>
      {/* <FrontScreenLeftSidebar /> */}
      <FrontScreenTopBar />
      
      {children}

    </div>
    </>
  );
};
export default GlobalPageWrapper;