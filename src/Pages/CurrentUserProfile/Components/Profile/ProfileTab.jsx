import React, { useEffect, useState } from 'react'
import CurrentProfileCard from '../../../../components/cards/CurrentProfileCard';
import Table from '../Table/Table';

import ProfilePageCertificationCardContainerTab from '../../../../components/profileBottomTabSection/ProfilePageCertificationCardContainer';
import ProfilePageGroupCardContainerTab from '../../../../components/profileBottomTabSection/ProfilePageGroupCardContainer';
import PartiesAndeventCardContainerTab from '../../../../components/profileBottomTabSection/PartiesAndeventCardContainer';
import ProfilePageFollowingCardContainerTab from '../../../../components/profileBottomTabSection/ProfilePageFollowingCardContainer';
import FriendsCardContainerTab from '../../../../components/profileBottomTabSection/FriendsCardContainer';
import httpService from '../../../../helper/httpService';
import { FaFemale, FaMale } from 'react-icons/fa';
import transgender from "../../../../assets/icons/custom_transgender.png";
import CustomCouple from "../../../../assets/icons/couple_custom.png"
import OverlayLoader from '../../../../helper/OverlayLoader';


const ProfileTab = ({ changeTab }) => {

    const [activeTabLower, setActiveTabLower] = useState("Certifications");
    const miniTabLower = [
        { title: "Certifications" },
        { title: "Groups" },
        { title: "Parties & Events" },
        { title: "Following" },
        { title: "Friends" }
    ];
    const renderLowerContent = () => {
        switch (activeTabLower) {
            case "Certifications":
                return <ProfilePageCertificationCardContainerTab />;
            case "Groups":
                return <ProfilePageGroupCardContainerTab />;
            case "Parties & Events":
                return <PartiesAndeventCardContainerTab />;
            case "Following":
                return <ProfilePageFollowingCardContainerTab />;
            case "Friends":
                return <FriendsCardContainerTab />;
            default:
                return null;
        }
    };


    const [user, setUser] = useState([])
    const[loader,setloader] = useState(true)
    useEffect(() => {
        httpService("/auth/me", "GET")
            .then((response) => {
                console.log("user profile fetch", response);
                setUser(response?.data)
                setloader(false)
            })
            .catch((err) => {
                console.error("Failed to send friend request:", err);
            });
    }, []); // dependency on card._id

    // console.log("dob",user?.profile?.dateOfBirth)


    return (
        <>
        {
            <OverlayLoader show={loader} text="Please wait..." />
        }
            <div className="row">
                <div className="col-lg-6">
                    <div className="">
                        <CurrentProfileCard user={user} />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="">
                        <div className="d-flex justify-content-between align-items-center border px-4 py-2 rounded-4 mb-4" style={{ backgroundColor: "var(--color-border)", }}>
                            <div className='d-flex gap-2'>
                            <div className='mb-0'>Looking for:</div>
                                {user?.profile?.interestedIn?.map((interest, i) => (
                                <div key={i} className="text-light small">
                                    {interest === "male" ? (
                                        <FaMale className="fs-5 text-primary" />
                                    ) : interest === "female" ? (
                                        <FaFemale className="fs-5 text-danger" />
                                    ) : interest === "transgender" ? (
                                        <>
                                            <div className="d-flex gap-0">
                                                <img src={transgender} height={21} alt="" srcset="" />
                                            </div>
                                        </>
                                    ) : interest === "couple" ? (
                                        <>
                                            <div className="d-flex gap-0">
                                                <img src={CustomCouple} height={21} alt="" srcset="" />
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                            ))}

                            </div>
                            <button className='custom-button rounded-4 px-3 py-1 border-0' onClick={() => { changeTab("Edit") }}>Edit Profile</button>
                        </div>
                        <div className="d-flex flex-column align-items-start justify-content-center">
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-100 mt-4">
                <Table user={user}/>
            </div>

            <div className="">

                {/* lower mini tab  */}
                <div className="miniNav d-flex justify-content-start align-items-center gap-3 mt-5">
                    {
                        miniTabLower.map((tab, i) => (
                            <p
                                key={i}
                                onClick={() => setActiveTabLower(tab.title)}
                                className={`px-4 mb-1 ${activeTabLower === tab.title ? "active-tab" : "text-white"}`}
                                style={{
                                    borderBottom:
                                        activeTabLower === tab.title ? "2px solid #096BFF" : "2px solid transparent",
                                    color: activeTabLower === tab.title ? "#096BFF" : "white",
                                    cursor: "pointer",
                                }}
                            >
                                {tab.title}
                            </p>
                        ))
                    }
                </div>
                <div className="mt-3">{renderLowerContent()}</div>
            </div>

        </>
    )
}

export default ProfileTab