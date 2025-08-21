import React, { useEffect, useState } from 'react'

import FilterBar from "../../components/FilterBar/FilterBar"
import GlobalPageWrapper from '../../components/GlobalPageWrapper'


import ViewPageCard from '../../components/ViewPageCard/ViewPageCard';
import httpService from '../../helper/httpService';
import { showErrorToast, showSuccessToast } from '../../components/customToast/CustomToast';




const ProfileFriendsPage = () => {

    const [user, setUser] = useState([])
    const [refresh, setrefresh] = useState(false)
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
    }, [refresh]); // dependency on card._id




    return (
        <>
            <GlobalPageWrapper>
                <FilterBar clas pageName={"Friends"} filterName2={"Filter"} />

                <div className="container-fluid">
                    <div className="row g-4 pt-4">
                        {user.length > 0 ? (
                            user.map((userData, index) =>
                                userData.status !== "declined"  && (
                                    <div
                                        className="col-12 col-sm-6 col-lg-6 col-xl-4"
                                        key={index}
                                    >
                                        <ViewPageCard
                                            userData={userData}
                                            index={index}
                                            showFriendOptions={true}
                                            timestamp={false}
                                            // handleDeclineFriendRequest={() => handleDeclineFriendRequest(userData._id)}
                                            refresh={refresh}
                                            setrefresh={setrefresh}
                                        />
                                    </div>
                                )
                            )
                        ) : (
                            <h1>No Friend request</h1>
                        )}
                    </div>
                </div>


            </GlobalPageWrapper>
        </>
    )
}

export default ProfileFriendsPage