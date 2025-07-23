import React from 'react'
import heroImg from "../HomePictures/bg-img.jpg"
import "../HomeCss/home.css"
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const navigate = useNavigate()

    const handleJoinToay = () =>{
        navigate("/subscription")
    }

    return (
        <>
            <div className="container-fluid position-relative p-0" id='home'>
                {/* Hero Image */}
                <img
                    src={heroImg}
                    alt="Hero"
                    className="w-100 object-fit-cover"
                    style={{ height: "80vh", objectFit: "cover" }}
                />

                {/* Black Overlay */}
                <div
                    className="position-absolute top-0 start-0 w-100 primary-background-color opacity-25"
                    style={{ height: "80vh", zIndex: 1 }}
                ></div>

                {/* Text Content Over Image */}
                <div
                    className="position-absolute top-0 start-0 d-flex flex-column justify-content-center align-items-center text-white text-center w-100"
                    style={{ height: "80vh", zIndex: 2 }}
                >
                    <p className='display-4 fw-semibold' style={{marginBottom: "0"}}>Welcome to 2+1</p>

                    <div className='my-4'> 
                    <p className='h4 fw-light' >Your exclusive lifestyle community for adventurous <br /> couples and singles</p>
                    </div>

                    <div className='d-flex gap-3 mt-2' >
                        {/* Button color Changed */}
                        <button className=" btn-primary custom-button-home px-4 py-2 rounded-2 primary-button"  onClick={handleJoinToay}>Join Free Today</button>
                        <button className="btn border-white text-white rounded-2 px-4 py-2">Learn More</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroSection