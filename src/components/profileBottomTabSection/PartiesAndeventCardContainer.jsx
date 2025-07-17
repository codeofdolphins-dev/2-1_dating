import React from "react";
import Groups from "../profilePageBottomCards/groupCard/Groups";
import ProfileBottomTabWrapper from "../ProfileBottomTabWrapper"; // Make sure this is imported
import PartiesAndeventCard from "../profilePageBottomCards/parties&eventCard/PartiesAndeventCard";

const groups = [1, 2, 3, 4]; // This can be an array of group objects

const PartiesAndeventCardContainer = () => {
  return (
    <ProfileBottomTabWrapper>
      {groups.map((cert, index) => {
        return <PartiesAndeventCard key={index} />;
      })}
    </ProfileBottomTabWrapper>
  );
};

export default PartiesAndeventCardContainer;
