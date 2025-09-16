import React, { useEffect, useState } from "react";
import Groups from "../profilePageBottomCards/groupCard/Groups";
import ProfileBottomTabWrapper from "../ProfileBottomTabWrapper"; // Make sure this is imported
import FriendsCard from "../profilePageBottomCards/friendsCard/FriendsCard";
import axios from "axios";
import OverlayLoader from "../../helper/OverlayLoader";

const groups = [1, 2, 3, 4]; // This can be an array of group objects

const FriendsCardContainer = () => {

  const apiUrl = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);


  useEffect(() => {

    setLoading(true);
    const token = sessionStorage.getItem("jwtToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: { page: 1, limit: 20 },
    };

    axios.get(`${apiUrl}/friends`, config)
      .then((res) => {
        setFriends(res?.data?.data?.friends);
        setLoading(false);
      })
      .catch((err)=>{
       setLoading(false);
      })
  }, []);

  

  return (
    <ProfileBottomTabWrapper>
      <OverlayLoader show={loading} text="Please wait..." />

      {friends.map((friend, index) => {
        return <FriendsCard key={index} friend={ friend } />;
      })}
    </ProfileBottomTabWrapper>
  );
};

export default FriendsCardContainer;
