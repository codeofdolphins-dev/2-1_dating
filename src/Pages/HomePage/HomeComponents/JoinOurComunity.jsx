import React from 'react'

const JoinOurComunity = () => {
    return (
        <>
            <div className='container-fluid' style={{ backgroundColor: "#030722" }}>
                <div className='container py-5'>
                    <div>
                        <div className='text-white h2 fw-semibold mb-3 text-center'>Ready to Join Our Community?</div>
                        <div className='d-flex justify-content-center h5 fw-light' style={{ color: "#ffff" }}>Create Your free profile today and start connecting with like-<br></br>minded individuals</div>
                    </div>

                     <div className='d-flex justify-content-center gap-3 mt-5' >
                        <button className="btn   px-4 py-2 rounded-1 primary-button">Sign Up Now</button>
                        <button className="btn border-white text-white  rounded-1 px-4 py-2">Take a Tour</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JoinOurComunity