import React, { useEffect, useState } from 'react'

import starIcon from "./Images/star.png";
import femaleIcon from "./Images/female.png";
import maleIcon from "./Images/male.png";
import ProfileImageCarousel from '../profileImageCarousel/profileImageCarousel';
import camera from "../../assets/icons/camera.png";
import group from "../../assets/icons/group.png";
import folder from "../../assets/icons/folder.png";
import video from "../../assets/icons/video.png";
import share from "../../assets/icons/share.png";
import invite from "../../assets/icons/invite.png";
import httpService from '../../helper/httpService';
import { showErrorToast, showSuccessToast } from '../customToast/CustomToast';

const icons = [
    { icon: camera, text: "Adult" },
    { icon: camera, text: "Non-Adult" },
    { icon: group, text: "Friends" },
    { icon: folder, text: "Albums" },
    { icon: video, text: "Videos" },
    { icon: share, text: "Share" },
    { icon: invite, text: "Invite" },
]

const CurrentProfileCard = () => {

    const [user, setUser] = useState([])
    useEffect(() => {
        httpService("/auth/me", "GET")
            .then((response) => {
                console.log("Friend request sent:", response);
                setUser(response?.data)
            })
            .catch((err) => {
                console.error("Failed to send friend request:", err);
            });
    }, []); // dependency on card._id

    return (
        <>
            <div className="d-flex flex-column gap-3 px-3 py-3 rounded-4" style={{ width: "422px", backgroundColor: "var(--color-border)", }}>
                {/* Header */}
                <div className="ms-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-center align-items-center gap-2">
                            <h3 className="mb-0" style={{ fontSize: "18px" }}>{user?.username}</h3>
                            <img src={starIcon} alt="star" width="24px" />
                            <i className="bi bi-three-dots-vertical"></i>
                        </div>
                        <div className="d-flex justify-content-center align-items-center gap-3">
                            <div className="d-flex justify-content-center align-items-center">
                                <img src={femaleIcon} alt="female" width="12px" height="12px" />
                                <p className="mb-0 text-danger" style={{ fontSize: "14px" }}>58</p>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                <img src={maleIcon} alt="male" width="12px" height="12px" />
                                <p className="mb-0 text-danger" style={{ fontSize: "14px" }}>58</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="d-flex gap-1">
                            <i className="bi bi-geo-alt-fill"></i>
                            <p className="mb-0" style={{ fontSize: "14px" }}>94555, CA 94555, USA | 8412 mi</p>
                        </div>
                        <div className="d-flex gap-1">
                            <i className="bi bi-geo-alt-fill"></i>
                            <p className="mb-0" style={{ fontSize: "14px" }}>Vancouver, CAN | 7645 mi</p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="profile-body" style={{ width: "389px", height: "380px" }}>
                    <ProfileImageCarousel />
                </div>

                {/* Footer */}
                <div className="d-flex justify-content-around align-items-center my-3 w-100">
                    {icons.map((item, i) => (
                        <div
                            key={i}
                            className="d-flex flex-column justify-content-center align-items-center"
                            style={{ width: "49px", fontSize: "10px" }}
                        >
                            <img src={item.icon} alt={item.text} />
                            <p className="mb-0">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CurrentProfileCard