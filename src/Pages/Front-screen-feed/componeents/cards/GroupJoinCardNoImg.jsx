import React from 'react'
import middleIcon from "./Images/middle-logo-yellow.png"
import coupleIcon from "./Images/couple.png"
import femaleIcon from "./Images/female.png"

import PartyIcon from "./Images/party.png"

const GroupJoinCardNoImg = () => {
    return (
        <>
            <div className="row justify-content-center gx-4 gy-3 align-items-stretch">
                <div className="col-lg-12">
                    <div className="d-flex justify-content-between p-3">
                        <div>
                            <h6 className="text-white">
                                CPLSUEPAUL has joined Georgia For Chocolate 🍫
                            </h6>
                        </div>
                        <div>
                            <h6 style={{color:"var(--color-primary-green)"}}>Dec 12, 2024 | 24 Members</h6>
                        </div>
                    </div>
                </div>
                <div className="row main">
                    <div className="col-lg-6 ">
                        {/* Left card */}
                        <div
                            style={{ backgroundColor: "var(--color-border)", border:"2px solid #ffffff"}}
                            className="rounded-2 p-3 text-white"
                        >
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div className="d-flex gap-3">
                                    <div>
                                        <h5 className="mb-1">AFTER DARK PARTY LAS VEGAS</h5>
                                        <p className="mb-0 small text-secondary">
                                            by  <span className='text-danger'>MEMB3RSONLY</span>
                                        </p>

                                        <p className='h4 pt-1' style={{ marginTop: "10px" }}>Jun 19 &nbsp;<span className='h6' style={{ color: "#B0C3CC" }}>Welcome</span></p>

                                        <div className='pt-1'>
                                            <div><p className='text-white'>94555, CA, USA</p></div>
                                        </div>
                                        <div className='d-flex mb-4'>
                                            <div><img src={coupleIcon} height={15} alt="" srcset="" /></div>
                                            <div><img src={femaleIcon} height={15} alt="" srcset="" /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <div className="d-flex align-items-center justify-content-center gap-2 w-100">
                                    <button
                                        className="btn bg-white rounded-pill px-5 py-2 w-100 text-black"
                                        disabled
                                    >
                                        Pending
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* icon */}
                    <img
                        src={PartyIcon}
                        alt="Center Icon"
                        className="actionIcon"
                        style={{ maxHeight: "50px", objectFit: "contain" }}
                    />
                    {/* 2nd card */}
                    <div
                        className="col-lg-6 text-white  p-3 rounded d-flex flex-column justify-content-center"
                        style={{ backgroundColor: "var(--color-border)", border:"2px solid #ffffff" }}
                    >
                        <div className="d-flex flex-column align-items-center gap-5 my-5">
                            <button
                                type="button"
                                className="btn btn-primary rounded-pill "
                                style={{ padding: "5px 120px" }}
                            >
                                Accept
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger rounded-pill "
                                style={{ padding: "5px 120px" }}
                            >
                                Deny
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GroupJoinCardNoImg