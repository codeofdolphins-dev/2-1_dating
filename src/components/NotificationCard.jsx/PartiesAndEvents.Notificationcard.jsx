import React from 'react'

const PartiesAndEvents = () => {
    return (
        <>
            <div className="container text-white mt-4">
                <div className="row justify-content-between align-items-center gy-3">
                    <div className="col-lg-9">
                        <div className="d-flex flex-wrap gap-3 align-items-center">
                            <h3 className="mb-0">Parties & Events</h3>

                            {/* <p className=" text-white px-3 py-1 rounded-pill mb-0" style={{ backgroundColor: "#6c757d" }}>
                                Do not show this offer again
                            </p> */}

                            <div className="d-flex align-items-center gap-2">
                                <div className="px-2 py-1 border border-white rounded-circle">
                                    <i className="bi bi-share h6 mb-0" />
                                </div>
                                <p className="mb-0">Share</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 text-lg-end">
                        <p className="mb-0">156 days</p>
                    </div>
                </div>

                <div className="mt-4">
                    Dear Member,
                </div>

                <div className='mt-2'>
                    We noticed you were a guest for the Swinging Atlanta New Years Complete Hotel Takeover party and hope you had a great time.Please give us your opinion and post a party review here.Thank you for your time.
                </div>

                <div className='mt-5'>
                   Your 2+1 Team
                </div>

                <hr className="mt-4" />
            </div>
        </>
    )
}

export default PartiesAndEvents