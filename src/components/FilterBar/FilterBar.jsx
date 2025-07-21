import React, { useState } from 'react';
import "../../Pages/Front-screen-feed/Feed/feedStyle.css";



import PageWrapper from '../PageWrapper';
import FeedScreen from '../../Pages/Front-screen-feed/componeents/FeedScreen.Feed';
import NotificationScreen from '../../Pages/Front-screen-feed/componeents/NotificationScreen.Feed';

const FilterBar = ({ filter1, filter2, filterName1, filterName2, showTab, pageName }) => {
    const [activeTab, setActiveTab] = useState("feed");
    const [showGeneralFilter, setShowGeneralFilter] = useState(false);
    const [showFriendsFilter, setShowFriendsFilter] = useState(false);
    const [selected, setSelected] = useState(["Viewed me"]);

    const handleGeneralFilter = () => {
        setShowGeneralFilter(!showGeneralFilter);
        if (showFriendsFilter) setShowFriendsFilter(false);
    };

    const handleFriendFilter = () => {
        setShowFriendsFilter(!showFriendsFilter);
        if (showGeneralFilter) setShowGeneralFilter(false);
    };

    const handleToggle = (label) => {
        setSelected((prev) =>
            prev.includes(label)
                ? prev.filter((item) => item !== label)
                : [...prev, label]
        );
    };

    return (
        <PageWrapper>
            <div className="container-fluid py-3" style={{ backgroundColor: "var(--color-background)" }}>
                <div className="d-flex justify-content-between align-items-end flex-wrap">

                    {/* Tabs */}
                    {
                        showTab ? (<div className="d-flex gap-3 align-items-end mb-2 mb-lg-0 text-white">
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
                    </div>) : (<h1 className='text-white'>{pageName}</h1>)
                    }
                    

                    {/* Filters */}
                    <div className="d-flex gap-3 position-relative pb-3">
                        {/* General Filter Button */}
                        <button
                            className="btn btn-outline-lighttext text-primary border border-primary rounded-pill"
                            onClick={handleGeneralFilter}
                        >
                            {filterName1}
                        </button>

                        {/* General Filter Dropdown */}
                        {showGeneralFilter && (
                            <div className="position-absolute end-0 top-100 mt-2 p-3" style={{ zIndex: 1050,width:"250px" }}>
                                <div className="checkbox-dropdown p-3 rounded-2" style={{ backgroundColor: "var(--color-border)", border: "2px solid #343A40" }}>
                                    {filter1.map((label) => (
                                        <label key={label} className="form-check d-flex align-items-center mb-2">
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
                        )}

                        {/* Friend Filter Button */}
                        <button
                            className="btn btn-outline-light border border-danger rounded-pill text-danger"
                            onClick={handleFriendFilter}
                        >
                            {filterName2}
                        </button>

                        {/* Friend Filter Dropdown */}
                        {showFriendsFilter && (
                            <div className="position-absolute end-0 top-100 mt-2 p-3" style={{ zIndex: 1050,width:"250px" }}>
                                <div className="checkbox-dropdown p-3 rounded-2" style={{ backgroundColor: "var(--color-border)", border: "2px solid #343A40" }}>
                                    {filter2.map((label) => (
                                        <label key={label} className="form-check d-flex align-items-center mb-2">
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
                        )}
                    </div>
                </div>

                <hr className="text-secondary" />

                {showTab && (
                    activeTab === "feed" ? <FeedScreen  /> : <NotificationScreen />
                ) 
                }
                
            </div>
        </PageWrapper>
    );
};

export default FilterBar;
