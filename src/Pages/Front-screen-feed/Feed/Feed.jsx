import React, { useState } from 'react'
import FrontScreenLeftSidebar from '../../../components/FrontScreenLeftBar/FrontScreenLeftSidebar'
import FrontScreenTopBar from '../../../components/FrontScreenTopBar/FrontScreenTopBar'
import "./feedStyle.css"
import GeneralFilter from '../componeents/GeneralFilter'
import FeedScreen from '../componeents/FeedScreen.Feed'
import NotificationScreen from '../componeents/NotificationScreen.Feed'
import PageWrapper from '../../../components/PageWrapper'
import CheckboxDropdown from '../../../components/dropdown/CheckboxDropdown'

const GeneralFilteroptions = [
    "Viewed me",
    "Groups / Blogs",
    "Speed Date",
    "Travel Plans",
    "Parties & Events"
];

const FriendFilterOptions = [
    "Likes given",
    "Joined group",
    "Photos & Videos",
    "Validations",
    "Speed Date",
    "Travel Plans",
    "Parties & Events",
    "Member Services",
    "New Friends / Followers"
];


const Feed = () => {
    const [activeTab, setActiveTab] = useState("feed");
    const [showGeneralFilter, setShowGeneralFilter] = useState(false)
    const [ShowFriendsFilter, setShowFriendsFilter] = useState(false)

    const handleGeneralFilter = () => {
        setShowGeneralFilter(!showGeneralFilter)
        if(ShowFriendsFilter)
        setShowFriendsFilter(!ShowFriendsFilter)
        console.log(showGeneralFilter)
    }

    const handleFriendFilter = () => {
        setShowFriendsFilter(!ShowFriendsFilter)
        if(showGeneralFilter)
        setShowGeneralFilter(!showGeneralFilter)
        console.log(showGeneralFilter)
    }

    // const [user,SetUser] = useState({name:"Bishal"})

    // console.log(activeTab)

    // const handleAccept = () =>{
    //     console.log("all ok")
    // }

    const [selected, setSelected] = useState(["Viewed me"]);

    const handleToggle = (label) => {
        setSelected((prev) =>
            prev.includes(label)
                ? prev.filter((item) => item !== label)
                : [...prev, label]
        );
    };

    return (
        <>

            {/* <FrontScreenTopBar /> */}
            <PageWrapper>
                <div className="container-fluid py-3" style={{ backgroundColor: "#212529" }}>
                    <div className="d-flex justify-content-between align-items-end flex-wrap">

                        {/* Left side: Labels */}
                        <div className="d-flex gap-3 align-items-end mb-2 mb-lg-0 text-white">
                            <h5
                                className={`mb-0 tab-item ${activeTab === "feed" ? "active" : ""}`}
                                onClick={() => setActiveTab("feed")}
                                style={{ cursor: "pointer" }}
                            >
                                Feed
                            </h5>

                            <h5
                                className={`mb-0 tab-item ${activeTab === "notification" ? "active" : ""}`}
                                onClick={() => setActiveTab("notification")}
                                style={{ cursor: "pointer" }}
                            >
                                2+1 Notification
                            </h5>
                        </div>



                        {/* Right side: Buttons */}
                        <div className="d-flex gap-3">

                            <button className="btn btn-outline-lighttext text-primary border border-primary rounded-pill position-relative" onClick={handleGeneralFilter} >General Filter</button>

                            {/* General filter seletion */}
                            <div
                                className={`${showGeneralFilter ? "d-flex" : "d-none"} end-0 top-25 p-3  position-absolute mt-5`}
                                style={{ zIndex: 1050, justifyContent: "end" }}
                            >
                                <div className="checkbox-dropdown p-3   rounded-2 bg-dark" style={{ border: "2px solid #343A40" }}>
                                    {GeneralFilteroptions.map((label) => (
                                        <label
                                            key={label}
                                            className="form-check d-flex align-items-center mb-2"
                                        >
                                            <input
                                                type="checkbox"
                                                className="form-check-input me-2"
                                                checked={selected.includes(label)}
                                                onChange={() => handleToggle(label)}
                                            />
                                            <span className="text-white">{label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* <CheckboxDropdown onClick={handleFilter}/> */}
                            <button className="btn btn-outline-light border border-danger rounded-pill text-danger position-relative" onClick={handleFriendFilter}>Friend Filter</button>

                            {/* Friend filter seletion */}
                            <div
                                className={`${ShowFriendsFilter ? "d-flex" : "d-none"} end-0 top-25 p-3  position-absolute mt-5`}
                                style={{ zIndex: 10, justifyContent: "end" }}
                            >
                                <div className="checkbox-dropdown p-3  rounded-2 bg-dark" style={{ border: "2px solid #343A40" }}>
                                    {FriendFilterOptions.map((label) => (
                                        <label
                                            key={label}
                                            className="form-check d-flex align-items-center mb-2"
                                        >
                                            <input
                                                type="checkbox"
                                                className="form-check-input me-2"
                                                checked={selected.includes(label)}
                                                onChange={() => handleToggle(label)}
                                            />
                                            <span className="text-white">{label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    <hr className="text-secondary" />






                    <div className=''>
                        {
                            activeTab === "feed" ? <FeedScreen /> : <NotificationScreen />
                        }
                    </div>
                </div>
            </PageWrapper>
        </>
    )
}

export default Feed