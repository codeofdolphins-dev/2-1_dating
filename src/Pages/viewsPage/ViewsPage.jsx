import React, { useState } from 'react'
import GlobalPageWrapper from '../../components/GlobalPageWrapper'
import ViewPageCard from '../../components/ViewPageCard/ViewPageCard';
import ViewPageMessangerPopup from '../../components/viewPageMessangerPopup/viewPageMessangerPopup';

const GeneralFilteroptions = [
    "Viewed me",
    "Viewed each other",
    "Who I viewed",
    "Remembered",
    "Latest",
    "Distance",
    "All",
    "Couples & Females",
    "Couples",
    "Female",
    "Male",
    "Transgender",
    "Business",
    "Ethnicity"
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

const cardNumber = [1, 2, 3, 4, 5, 6, 7]
const ViewsPage = () => {
    const [activeTab, setActiveTab] = useState("feed");
    const [showGeneralFilter, setShowGeneralFilter] = useState(false)
    const [ShowFriendsFilter, setShowFriendsFilter] = useState(false)


    const handleGeneralFilter = () => {
        setShowGeneralFilter(!showGeneralFilter)
        if (ShowFriendsFilter)
            setShowFriendsFilter(!ShowFriendsFilter)
        console.log(showGeneralFilter)
    }

    const handleFriendFilter = () => {
        setShowFriendsFilter(!ShowFriendsFilter)
        if (showGeneralFilter)
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
            <GlobalPageWrapper>
                <div style={{ backgroundColor: "var(--color-background)" }}>
                    <div className="container-fluid py-3" style={{ backgroundColor: "var(--color-background)" }}>
                        <div className="d-flex justify-content-between align-items-end flex-wrap">

                            {/* Left side: Labels */}
                            <div className="d-flex gap-3 align-items-end mb-2 mb-lg-0 text-white">
                                <h5>Viewed Me</h5>
                            </div>



                            {/* Right side: Buttons */}
                            <div className="d-flex gap-3">

                                <button className="btn btn-outline-lighttext text-primary border border-primary rounded-pill position-relative" onClick={handleGeneralFilter} >General Filter</button>

                                {/* General filter seletion */}
                                <div
                                    className={`${showGeneralFilter ? "d-flex" : "d-none"} end-0 top-25 p-3  position-absolute mt-5`}
                                    style={{ zIndex: 550, justifyContent: "end" }}
                                >
                                    <div className="checkbox-dropdown p-3   rounded-2 " style={{ backgroundColor: "var(--color-background)", border: "2px solid #343A40" }}>
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
                                        <div className='pt-3'>
                                            <div>
                                                <input type="text" placeholder='Search by Country' className='rounded-pill px-2 py-1 text-white' style={{ backgroundColor: "var(--color-border)", border: "1px solid white" }} />
                                            </div>

                                            <div>
                                                <button className='py-1 px-2 w-100 rounded-pill border-0 mt-2' style={{ backgroundColor: "var(--color-primary-green)" }}>OK</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* <CheckboxDropdown onClick={handleFilter}/> */}
                                <button className="btn btn-outline-light border border-danger rounded-pill text-danger position-relative" onClick={handleFriendFilter}>Friend Filter</button>

                                {/* Friend filter seletion */}
                                <div
                                    className={`${ShowFriendsFilter ? "d-flex" : "d-none"} end-0 top-25 p-3  position-absolute mt-5`}
                                    style={{ zIndex: 10, justifyContent: "end" }}
                                >
                                    <div className="checkbox-dropdown p-3  rounded-2 " style={{ backgroundColor: "var(--color-background)", border: "2px solid #343A40" }}>
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






                        {/* <div className=''>
                        {
                            activeTab === "feed" ? <FeedScreen /> : <NotificationScreen />
                        }
                    </div> */}
                    </div>

                    <div className="container-fluid">
                        <div className="row g-4">
                            {
                                cardNumber.map((item, index) => (
                                    <div className="col-12 col-sm-6 col-lg-6 col-xl-4">
                                        <ViewPageCard />
                                    </div>
                                ))
                            }

                            {/* <div className="col-12 col-sm-6 col-lg-6 col-xl-4">
                                <ViewPageCard />
                            </div>
                            <div className="col-12 col-sm-6 col-lg-6 col-xl-4">
                                <ViewPageCard />
                            </div>
                            <div className="col-12 col-sm-6 col-lg-6 col-xl-4">
                                <ViewPageCard />
                            </div>
                            <div className="col-12 col-sm-6 col-lg-6 col-xl-4">
                                <ViewPageCard />
                            </div>
                            <div className="col-12 col-sm-6 col-lg-6 col-xl-4">
                                <ViewPageCard />
                            </div>
                            <div className="col-12 col-sm-6 col-lg-6 col-xl-4">
                                <ViewPageCard />
                            </div>
                            <div className="col-12 col-sm-6 col-lg-6 col-xl-4">
                                <ViewPageCard />
                            </div>
                            <div className="col-12 col-sm-6 col-lg54 col-xl-4">
                                <ViewPageCard />
                            </div> */}
                        </div>
                    </div>
                </div>
            </GlobalPageWrapper>
        </>
    )
}

export default ViewsPage