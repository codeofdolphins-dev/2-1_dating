import React from 'react'

const LifetimeSpecial = () => {
    return (
        <>
            <div className="container text-white mt-4">
                <div className="row justify-content-between align-items-center gy-3">
                    <div className="col-lg-9">
                        <div className="d-flex flex-wrap gap-3 align-items-center">
                            <h3 className="mb-0">Lifetime Special</h3>

                            <p className=" text-white px-3 py-1 rounded-pill mb-0" style={{backgroundColor:"#6c757d"}}>
                                Do not show this offer again
                            </p>

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
                    Within the next 3 days your account is up for renewal. As a special thank you, we would like to offer you the opportunity to become a lifetime member of 2+1 for only $270.
                </div>

                <div className='mt-4'>
                    Lifetime memberships can normally only be purchased in the month of December so take this offer by selecting MEMBERSHIP in the menu and upgrade your membership to lifetime now.
                </div>

                <div className='mt-5'>
                    We hope you enjoy our site and are having fun.
                </div>

                <hr className="mt-4" />
            </div>

        </>
    )
}

export default LifetimeSpecial