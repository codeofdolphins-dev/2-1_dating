import React from 'react'
import profileImg from "..//../assets/cardImgs/Images/feed-profile-img.png"

const EventInformationCard = () => {
    return (
        <>
            <div className="col-lg-12 h-100 " style={{height:"33px !important"}}>
                {/* Left card */}
                <div
                    className="rounded-2 p-3 text-white card"
                >
                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="d-flex gap-3">
                            <img
                                src={profileImg}
                                alt="Event"
                                className="rounded-2"
                                style={{
                                    width: "50%",
                                    height: "50%",
                                    objectFit: "cover",
                                }}
                            />
                            <div>
                                <h5 className="mb-1">Erotic Parties & Clubs</h5>
                                <p className="mb-0 small text-secondary">
                                    94555, CA, USA
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="small">
                        <div className="d-flex justify-content-between align-bottom">
                            <div>
                                <p className="mb-0 mt-1 fw-semibold">CPLSUEPAUL</p>
                                <p className="mb-1 small text-warning">
                                    Aug 19, 2022 | 8021 Members
                                </p>
                            </div>
                            <div className="d-flex align-bottom">
                                <div className="text-end small text-secondary">
                                    Dec 12, 2024 | 24 Members
                                </div>
                            </div>
                        </div>
                        Club Elation is the newest and most progressive club for 21
                        years of age and over which is designed around the desires of
                        its members. Your host and hostess Eric and Cynthia have over
                        40 years in the ENM Lifestyle. We are dedicated to ...{" "}
                        <a href="#">More</a>
                    </p>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <div className="d-flex align-items-center justify-content-center gap-2 w-100">
                            <button
                                className="btn btn-secondary rounded-pill px-5 py-2 w-100"
                                disabled
                            >
                                Pending
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventInformationCard