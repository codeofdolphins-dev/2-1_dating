import React from 'react'

const Pictures = () => {
    return (
        <>
            <div className="container text-white mt-4">
                <div className="row justify-content-between align-items-center gy-3">
                    <div className="col-lg-9">
                        <div className="d-flex flex-wrap gap-3 align-items-center">
                            <h3 className="mb-0">Pictures</h3>

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
                    Your picture(s) have been approved and added to your profile!
                </div>

                

                <hr className="mt-4" />
            </div>
        </>
    )
}

export default Pictures