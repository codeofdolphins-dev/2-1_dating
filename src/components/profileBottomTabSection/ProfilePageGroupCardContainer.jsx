import React, { useEffect, useState } from "react";
import Groups from "../profilePageBottomCards/groupCard/Groups";
import ProfileBottomTabWrapper from "../ProfileBottomTabWrapper"; // Make sure this is imported
import httpService from "../../helper/httpService";

const groups = [1, 2, 3, 4]; // This can be an array of group objects

const ProfilePageGroupCardContainer = () => {
  const [groupData,setGroupdata] = useState([])
  
  useEffect(() => {
  httpService("/groups/my-groups","GET")
  .then((res)=>{
  console.log("eeee",res?.data?.groups)
  setGroupdata(res?.data?.groups)
  })
  },[])

  return (
    <ProfileBottomTabWrapper>
      {groupData.map((cert, index) => {
        return <Groups key={index} groupData={cert}/>;
      })}
    </ProfileBottomTabWrapper>
  );
};

export default ProfilePageGroupCardContainer;
