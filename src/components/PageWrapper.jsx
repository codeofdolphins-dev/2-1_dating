//wrapper component
import FrontScreenLeftSidebar from "./FrontScreenLeftBar/FrontScreenLeftSidebar";
import FrontScreenTopBar from "./FrontScreenTopBar/FrontScreenTopBar";
import React from "react";

const PageWrapper = ({ children }) => {
  return (
    <>
      <FrontScreenLeftSidebar />
      <FrontScreenTopBar />
      {children}
    </>
  );
};
export default PageWrapper;