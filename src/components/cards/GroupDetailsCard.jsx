import React from 'react'

const GroupDetailsCard = () => {
    return (
        <>
            <div className=' h-100 '>
                <div className="text-white rounded-3 p-4 d-flex flex-column justify-content-between" style={{ backgroundColor: "var(--color-border)", border: "2px solid #ffffff" }}>
                    <div className='d-flex justify-content-between'>
                        <div className="mb-4">
                            <h6 className="mb-2 text-white">Location Based</h6>
                            <p className="mb-1 fw-light">Athens, GA, USA</p>
                        </div>

                        <div>
                            <button className="btn btn-primary rounded-pill w-100 py-2 px-4">
                                Apply to Join
                            </button>
                        </div>
                    </div>
                    <p className="small text-white mb-3" style={{ lineHeight: "1.4" }}>
                        This group for people who are in the swinging lifestyle for only ladies that is looking for chocolate in georgia. Also couples who have a hotwife looking for chocolate in georgia as well. Because I need to verify people before joining in. Only way to be approved to join the group you need to be located in georgia, also a lady t...more
                        <a href="#" className="text-info">more</a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default GroupDetailsCard