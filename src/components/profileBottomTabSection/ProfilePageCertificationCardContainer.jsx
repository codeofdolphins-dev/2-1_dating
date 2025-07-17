import React from "react";
import ProfilePageCertificationCard from "../profilePageBottomCards/certificationCard/ProfilePageCertificationCard";
import ProfileBottomTabWrapper from "../ProfileBottomTabWrapper";

const certifications = [1, 2, 3, 4]; // This can be an array of certification objects

const ProfilePageCertificationCardContainer = () => {
  return (
    <ProfileBottomTabWrapper>
    {certifications.map((cert, index) => (
      <ProfilePageCertificationCard key={index} />
      
    ))}
  </ProfileBottomTabWrapper>
  );
};

export default ProfilePageCertificationCardContainer;
