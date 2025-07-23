import React, { useState } from 'react';
import "../../Pages/Front-screen-feed/Feed/feedStyle.css";



import PageWrapper from '../PageWrapper';
import FeedScreen from '../../Pages/Front-screen-feed/componeents/FeedScreen.Feed';
import NotificationScreen from '../../Pages/Front-screen-feed/componeents/NotificationScreen.Feed';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FilterBar = ({ filter1, filter2, filterName1, filterName2, showTab, pageName, distanceSlider, bottomForm, width,showDatePicker,showLocationForm,filterTypeName }) => {
    const [activeTab, setActiveTab] = useState("feed");
    const [showGeneralFilter, setShowGeneralFilter] = useState(false);
    const [showFriendsFilter, setShowFriendsFilter] = useState(false);
    const [selected, setSelected] = useState(["Viewed me"]);
    const [distance, setDistance] = useState(500);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [location, setLocation] = useState('');
    const [minAge, setMinAge] = useState(20);
    const [maxAge, setMaxAge] = useState(30);

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

    const handleSubmit = () => {
        console.log('Location:', location);
        console.log('Age Range:', minAge, '-', maxAge);
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
                            <div className="position-absolute end-0 top-100 mt-2 p-3" style={{ zIndex: 1050, width: `${ width }` }}
                            >
                                <div className="checkbox-dropdown p-3 rounded-2" style={{ backgroundColor: "var(--color-border)", border: "2px solid #343A40" }}>
                                    {
                                        filterTypeName && <p><a className='filterTypeName fs-5' href="">{filterTypeName}</a></p>
                                    }
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
                                    {/* Distance slider */}
                                    {
                                        distanceSlider && (<div className="text-white mb-3 pt-3" style={{ width: '250px' }}>
                                            <div className="d-flex justify-content-between mb-1">
                                                <label className="text-secondary">Distance</label>
                                                <span>{distance}mi</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="500"
                                                value={distance}
                                                onChange={(e) => setDistance(e.target.value)}
                                                className="form-range custom-slider"
                                            />
                                        </div>)
                                    }
                                    {/* date Picker */}
                                    {
                                        showDatePicker && (<div className="text-white" style={{ width: 'fit-content' }}>
                                            <label className="text-secondary mb-2">Date</label>
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={(date) => setSelectedDate(date)}
                                                inline
                                                calendarClassName="dark-calendar"
                                            />
                                        </div>)
                                    }


                                    {/* Bottom Form */}
                                    {
                                        bottomForm && (<div className="d-flex flex-column align-items-start gap-2 pt-3 ">
                                            <input
                                                type="text"
                                                className="form-control rounded-pill px-3"
                                                placeholder="Enter value"
                                            />
                                            <button className="w-100 rounded-pill text-white fs-5 px-3 py-1 finter-bottom-button border-0">
                                                OK
                                            </button>
                                        </div>)
                                    }

                                    {/* Location Form */}
                                    {
                                        showLocationForm && (<div
                                            className="p-3 d-flex flex-column gap-3"

                                        >
                                            <div>
                                                <label className="text-secondary mb-1 d-block">Location</label>
                                                <input
                                                    type="text"
                                                    className="form-control bg-white border-0 text-black rounded-pill px-3"
                                                    placeholder="Search by country"
                                                    value={location}
                                                    onChange={(e) => setLocation(e.target.value)}
                                                />
                                            </div>

                                            <div>
                                                <label className="text-secondary mb-1 d-block">Age</label>
                                                <div className="d-flex gap-2">
                                                    <input
                                                        type="number"
                                                        className="form-control bg-white border-0 text-black rounded-pill text-center"
                                                        value={minAge}
                                                        onChange={(e) => setMinAge(e.target.value)}
                                                    />
                                                    <input
                                                        type="number"
                                                        className="form-control bg-white border-0 text-black rounded-pill text-center"
                                                        value={maxAge}
                                                        onChange={(e) => setMaxAge(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                className="w-100 rounded-pill border-0 py-2 finter-bottom-button"
                                                onClick={handleSubmit}
                                            >
                                                Ok
                                            </button>
                                        </div>)
                                    }




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
                            <div className="position-absolute end-0 top-100 mt-2 p-3" style={{ zIndex: 1050, width: "250px" }}>
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
                    activeTab === "feed" ? <FeedScreen /> : <NotificationScreen />
                )
                }


            </div>
        </PageWrapper>
    );
};

export default FilterBar;
