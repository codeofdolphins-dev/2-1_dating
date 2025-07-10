import React from 'react'
import profileImg from "../HomePictures/bg-img.jpg"

const SuccssStoryCard = () => {
    return (
        <>
            <div
                className="mb-4 card text-white  p-4 rounded-2 shadow-sm secondary-background-color"
                style={{
                    // border: '1px solid #2c2f33',
                    boxShadow: '0 0 0 1px #2c2f33',
                    // backgroundColor: '#1a1e21',
                    overflow: 'hidden'
                }}
            >
                <div className="card-body">
                    <div className="d-flex align-items-center gap-3 mb-4">
                        <div>
                            <img
                                src={profileImg}
                                alt="Profile"
                                className="rounded-5"
                                style={{ height: "50px", width: "50px", objectFit: "cover" }}
                            />
                        </div>
                        <div>
                            <h6 className="fw-bold mb-1">Sarah &amp; Mike</h6>
                            <p className="small mb-0" style={{ color: "#9ca3af" }}>
                                Members since 2019
                            </p>
                        </div>
                    </div>

                    <p className="card-text text-light fs-6" style={{ lineHeight: '1.6' }}>
                        "2+1 has completely transformed our relationship. We've met amazing people and had experiences we never thought possible. The community is welcoming and the verification process gives us peace of mind."
                    </p>
                </div>
            </div>

        </>
    )
}

export default SuccssStoryCard