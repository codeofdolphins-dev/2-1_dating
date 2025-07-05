import React from 'react'
import heroImg from "../HomePictures/bg-img.jpg"

const HeroSection = () => {
    return (
        <>
            <div className="container-fluid position-relative p-0">
                {/* Hero Image */}
                <img
                    src={heroImg}
                    alt="Hero"
                    className="w-100 object-fit-cover"
                    style={{ height: "80vh", objectFit: "cover" }}
                />

                {/* Black Overlay */}
                <div
                    className="position-absolute top-0 start-0 w-100 bg-black opacity-50"
                    style={{ height: "80vh", zIndex: 1 }}
                ></div>

                {/* Text Content Over Image */}
                <div
                    className="position-absolute top-0 start-0 d-flex flex-column justify-content-center align-items-center text-white text-center w-100"
                    style={{ height: "80vh", zIndex: 2 }}
                >
                    <p className='display-2 fw-semibold' style={{marginBottom: "0"}}>Welcome to 2+1</p>

                    <div className='my-4'> 
                    <p className='h3 fw-light' >Your exclusive lifestyle community for adventurous <br /> couples and singles</p>
                    </div>

                    <div className='d-flex gap-3 mt-2' >
                        <button className="btn btn-primary btn-lg px-5 py-2 rounded-2">Learn More</button>
                        <button className="btn border-white text-white btn-lg rounded-2 px-5 py-2">Learn More</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroSection