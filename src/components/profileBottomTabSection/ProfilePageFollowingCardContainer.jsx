import React from "react";
import ProfileBottomTabWrapper from "../ProfileBottomTabWrapper"; // Make sure this is imported
import FollowingsCard from "../profilePageBottomCards/followingsCard/FollowingsCard";

const groups = [1, 2, 3, 4]; // This can be an array of group objects

const ProfilePageFollowingCardContainer = () => {
  return (
    <ProfileBottomTabWrapper>
      {groups.map((cert, index) => {
        return <FollowingsCard key={index} />;
      })}
    </ProfileBottomTabWrapper>
  );
};

export default ProfilePageFollowingCardContainer;
