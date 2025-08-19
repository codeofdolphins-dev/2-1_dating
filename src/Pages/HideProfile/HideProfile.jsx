import React from 'react'
import GlobalPageWrapper from '../../components/GlobalPageWrapper'
import FilterBar from '../../components/FilterBar/FilterBar'

const HideProfile = () => {
    return (
        <>
            <GlobalPageWrapper>
                <div className=" mt-5 pt-3 text-white">
                    <div className=" shadow-sm rounded-3">
                        {/* Header */}
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="fw-semibold text-white m-0">Hide Profile</h4>
                            <button className="btn btn-primary text-black border-0 px-5 rounded-pill fw-semibold" style={{backgroundColor:"var( --color-primary-green)"}}>Hide Profile</button>
                        </div>

                        {/* Description */}
                        <p className=" mb-3">
                            When you set your account to <span className="fw-semibold">Inactive</span>,
                            your profile will be hidden on 2+1. You will be invisible until you decide
                            to log in again, at which time your profile will become <span className="fw-semibold">Active</span>
                            and visible to others.
                        </p>

                        {/* Additional Info */}
                        <p className=" small">
                            Time remaining on your current membership will run its course while your
                            profile is set to inactive. If you have paid for your membership directly
                            on the 2+1 website, then your recurring billing will be switched off.
                        </p>
                    </div>
                </div>

            </GlobalPageWrapper>
        </>
    )
}

export default HideProfile