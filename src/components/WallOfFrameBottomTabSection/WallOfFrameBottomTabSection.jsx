import React, { Children } from "react";
import ProfilePageCertificationCard from "../profilePageBottomCards/certificationCard/ProfilePageCertificationCard";
import ProfileBottomTabWrapper from "../ProfileBottomTabWrapper";

const certifications = [1, 2, 3, 4]; // This can be an array of certification objects

const WallOfFrameBottomTabSection = ({children}) => {
  return (
    <>
    <div className="d-flex gap-2 flex-wrap justify-content-center py-4">
        {children}
    </div>
    </>
  );
};

export default WallOfFrameBottomTabSection;