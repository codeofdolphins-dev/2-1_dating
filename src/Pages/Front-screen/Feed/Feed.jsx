import React, { useState } from 'react'
import FrontScreenLeftSidebar from '../../../components/FrontScreenLeftBar/FrontScreenLeftSidebar'
import FrontScreenTopBar from '../../../components/FrontScreenTopBar/FrontScreenTopBar'
import "./feedStyle.css"
import FeedComponent from '../componeents/FeedComponent1'
import NotificationComponent from '../componeents/NotificationComponent'


const Feed = () => {
    const [activeTab, setActiveTab] = useState("feed");
    console.log(activeTab)
    return (
        <>

            <FrontScreenTopBar />
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
                        <button className="btn btn-outline-lighttext text-primary border border-primary rounded-pill">General Filter</button>
                        <button className="btn btn-outline-light border border-danger rounded-pill text-danger">General Filter</button>
                    </div>
                </div>

                <hr className="text-secondary" />

                <div className='mt-5'>
                    {
                        activeTab === "feed" ? <FeedComponent/> : <NotificationComponent/>
                    }
                </div>
            </div>

        </>
    )
}

export default Feed