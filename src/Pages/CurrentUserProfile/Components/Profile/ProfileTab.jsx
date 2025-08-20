import React, { useState } from 'react'
import CurrentProfileCard from '../../../../components/cards/CurrentProfileCard';
import Table from '../Table/Table';

import ProfilePageCertificationCardContainerTab from '../../../../components/profileBottomTabSection/ProfilePageCertificationCardContainer';
import ProfilePageGroupCardContainerTab from '../../../../components/profileBottomTabSection/ProfilePageGroupCardContainer';
import PartiesAndeventCardContainerTab from '../../../../components/profileBottomTabSection/PartiesAndeventCardContainer';
import ProfilePageFollowingCardContainerTab from '../../../../components/profileBottomTabSection/ProfilePageFollowingCardContainer';
import FriendsCardContainerTab from '../../../../components/profileBottomTabSection/FriendsCardContainer';


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


    return (
        <>
            <div className="row">
                <div className="col-lg-6">
                    <div className="">
                        <CurrentProfileCard />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="">
                        <div className="d-flex justify-content-between align-items-center border px-4 py-2 rounded-4 mb-4" style={{ backgroundColor: "var(--color-border)", }}>
                            <p className='mb-0'>Looking for:</p>
                            <button className='custom-button rounded-4 px-3 py-1 border-0' onClick={() => { changeTab("Edit") }}>Edit Profile</button>
                        </div>
                        <div className="d-flex flex-column align-items-start justify-content-center">
                            <p>all desi couples join the group "usa-desi-couples" </p>
                            <p> well educated couple from nc , looking to meet decent, respectful couple friends</p>
                            <p>Desi married couples ....</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-100 mt-4">
                <Table />
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