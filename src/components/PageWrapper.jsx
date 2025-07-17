//wrapper component
import FrontScreenLeftSidebar from "./FrontScreenLeftBar/FrontScreenLeftSidebar";
import FrontScreenTopBar from "./FrontScreenTopBar/FrontScreenTopBar";
import React from "react";
import SettingSidebar from "./SettingSidebar/SettingsSidebar";

const PageWrapper = ({ children },) => {
  return (
    <>
      <FrontScreenLeftSidebar />
      <FrontScreenTopBar />
      
      {children}
    </>
  );
};
export default PageWrapper;