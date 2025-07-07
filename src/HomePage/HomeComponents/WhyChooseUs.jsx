import React from 'react'
import lock from "../HomePictures/why-choose-logo-1.png"

const WhyChooseUs = () => {
    return (
        <>
            <div className='container-fluid' style={{ backgroundColor: "#2c3034" }} id='features'>
                <div className='container py-5'>
                    <div>
                        <div className='text-white display-6 fw-semibold mb-3 text-center'>Why Choose 2+1</div>
                        <div className='text-center' style={{ color: "#9ca3af" }}>Experience the difference with our exclusive features </div>
                    </div>

                    <div className='' style={{marginTop:"80px"}}>
                        <div className='row'>
                            <div className='col-lg-4 col-sm-6 mb-4'>
                                <div className='w-100 h-100 p-4 rounded-4' style={{backgroundColor: "#343a40"}}>
                                    <div className='mb-4'>
                                            <img src={lock} alt="" srcSet="" height={60} />
                                        
                                    </div>
                                    <div>
                                        <p className='text-white h3'>Discreet & Secure</p>
                                        <p style={{ color: "#9ca3af" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum amet illo voluptas temporibus aliquid optio sit magnam exercitationem dolor? Corrupti!</p>
                                    </div>
                                </div>
                            </div>

                            <div className='col-lg-4 col-sm-6 mb-4'>
                                <div className='w-100 h-100 p-4 rounded-4' style={{backgroundColor: "#343a40"}}>
                                    <div className='mb-4'>
                                            <img src={lock} alt="" srcSet="" height={60} />
                                        
                                    </div>
                                    <div>
                                        <p className='text-white h3'>Discreet & Secure</p>
                                        <p style={{ color: "#9ca3af" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum amet illo voluptas temporibus aliquid optio sit magnam exercitationem dolor? Corrupti!</p>
                                    </div>
                                </div>
                            </div>

                            <div className='col-lg-4 col-sm-6 mb-4'>
                                <div className='w-100 h-100 p-4 rounded-4' style={{backgroundColor: "#343a40"}}>
                                    <div className='mb-4'>
                                            <img src={lock} alt="" srcSet="" height={60} />
                                        
                                    </div>
                                    <div>
                                        <p className='text-white h3'>Discreet & Secure</p>
                                        <p style={{ color: "#9ca3af" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum amet illo voluptas temporibus aliquid optio sit magnam exercitationem dolor? Corrupti!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WhyChooseUs