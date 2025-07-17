import React from "react";
import Groups from "../profilePageBottomCards/groupCard/Groups";
import ProfileBottomTabWrapper from "../ProfileBottomTabWrapper"; // Make sure this is imported
import FriendsCard from "../profilePageBottomCards/friendsCard/FriendsCard";

const groups = [1, 2, 3, 4]; // This can be an array of group objects

const FriendsCardContainer = () => {
  return (
    <ProfileBottomTabWrapper>
      {groups.map((cert, index) => {
        return <FriendsCard key={index} />;
      })}
    </ProfileBottomTabWrapper>
  );
};

export default FriendsCardContainer;
