import React, { useEffect, useState } from 'react'

import FilterBar from "../../components/FilterBar/FilterBar"
import GlobalPageWrapper from '../../components/GlobalPageWrapper'


import ViewPageCard from '../../components/ViewPageCard/ViewPageCard';
import httpService from '../../helper/httpService';
import { showErrorToast, showSuccessToast } from '../../components/customToast/CustomToast';




const ProfileFriendsPage = () => {

    const [user,setUser]=useState([])
    useEffect(() => {
        httpService("/friend-requests", "GET")
            .then((response) => {
                console.log("Friend request sent:", response);
                showSuccessToast(response?.message);
                setUser(response?.data)
            })
            .catch((err) => {
                console.error("Failed to send friend request:", err);
                showErrorToast(err?.response?.data?.message);
            });
    }, []); // dependency on card._id

    return (
        <>
            <GlobalPageWrapper>
                <FilterBar clas pageName={"Friends"} filterName2={"Filter"} />

                <div className="container-fluid">
                    <div className="row g-4 pt-4">
                        {
                            user.map((userData, index) => (
                                <div className="col-12 col-sm-6 col-lg-6 col-xl-4 " key={index}>
                                    <ViewPageCard userData={userData} index={index} showFriendOptions={true} timestamp={false}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>

            </GlobalPageWrapper>
        </>
    )
}

export default ProfileFriendsPage