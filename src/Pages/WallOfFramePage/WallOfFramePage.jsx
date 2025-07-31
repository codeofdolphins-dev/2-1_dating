import GlobalPageWrapper from '../../components/GlobalPageWrapper'
import FilterBar from '../../components/FilterBar/FilterBar'
import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./WallOfFramePageCss.css"; // Your custom styles
import WallofFrameCard from '../../components/WallofFrameCard/WallofFrameCard';
import WallOfFrameBottomTabSection from '../../components/WallOfFrameBottomTabSection/WallOfFrameBottomTabSection';

const WallOfFramePage = () => {
    const [value, setValue] = useState(1300);
    const [activeTab, setActiveTab] = useState("photos");

    const handleChange = (val) => {
        setValue(val);
    };

    const tabs = [
        { key: "photos", label: "Most Photos" },
        { key: "videos", label: "Most Videos" },
        { key: "friends", label: "Most Friends" },
        { key: "liked", label: "Most Liked" },
        { key: "validations", label: "Most Validations" },
        { key: "viewed", label: "Most viewed" },
        { key: "contest", label: "Most Contest Participation" },
    ];

    const cards = [1, 2, 3, 4,5,7,8,9,10,11];
    return (
        <>
            <div style={{ backgroundColor: "var(--color-background)", height: "auto" }}>
                <GlobalPageWrapper>
                    <FilterBar pageName={"Wall of Fame"} filterName2={"Filter"} />

                    <div className='container-fluid'>
                        <p className='text-white'>Find the most popular online members closest to you, or use the slider to find out who is the most popular worldwide. The results are based on your primary location or location added in the options menu. Our wall will be forever changing, so check back often to see who have taken the top spots!</p>


                        {/* Distance slider */}
                        <div className="px-3 py-4 text-white text-start">
                            <div className="mb-2 slider-text position-relative" style={{ maxWidth: "500px" }}>
                                <span className="position-absolute start-0 fw-bold">Local</span>
                                <span className="position-absolute end-0 fw-bold">Worldwide</span>
                            </div>

                            <div className="position-relative" style={{ maxWidth: "500px" }}>
                                <div className="slider-wrapper px-2">
                                    <Slider
                                        min={0}
                                        max={5000}
                                        value={value}
                                        onChange={handleChange}
                                        trackStyle={{ backgroundColor: "#e74c3c", height: 6 }}
                                        handleStyle={{
                                            borderColor: "#e74c3c",
                                            height: 24,
                                            width: 24,
                                            marginTop: -9,
                                            backgroundColor: "#e74c3c",
                                        }}
                                        railStyle={{ backgroundColor: "#154360", height: 6 }}
                                    />
                                </div>
                                <div
                                    className="position-absolute text-danger fw-bold"
                                    style={{
                                        top: "-30px",
                                        left: `${(value / 5000) * 100}%`,
                                        transform: "translateX(-50%)",
                                        fontSize: "14px",
                                    }}
                                >
                                    {value} mi
                                </div>
                            </div>
                        </div>

                        {/* bottom tab section */}
                        <div className="tab-section  text-white border-bottom px-3 mt-5">
                            <ul className="justify-content-between nav d-flex  gap-4 py-2">
                                {tabs.map((tab) => (
                                    <li
                                        key={tab.key}
                                        className={`tab-item fw-medium ${activeTab === tab.key ? "active-tab text-primary" : "text-white"
                                            }`}
                                        onClick={() => setActiveTab(tab.key)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {tab.label}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {[
                            "photos",
                            "videos",
                            "friends",
                            "liked",
                            "validations",
                            "viewed",
                            "contest",
                        ].includes(activeTab) && (
                                <WallOfFrameBottomTabSection>
                                    {cards.map((item, i) => (
                                        <WallofFrameCard key={i} data={item} />
                                    ))}
                                </WallOfFrameBottomTabSection>
                            )}




                    </div>
                </GlobalPageWrapper>
            </div>
        </>
    )
}

export default WallOfFramePage