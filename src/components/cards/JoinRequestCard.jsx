import React from 'react'
import coupleIcon from "../../assets/cardImgs/Images/couple.png"
import femaleIcon from "../../assets/cardImgs/Images/female.png"

const JoinRequestCard = () => {
    return (
        <>
            <div className="col-lg-12 h-100">
                {/* Left card */}
                <div
                    className="rounded-2 p-3 text-white card"
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
        </>
    )
}

export default JoinRequestCard