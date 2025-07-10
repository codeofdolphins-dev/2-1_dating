import React from 'react'
import img from "./iamges/Img.png"
import star from "./iamges/star.png"
import pc from "./iamges/pc.png"
import chat from "./iamges/chat.png"
import male from "./iamges/male.png"
import female from "./iamges/female.png"
import couple from "./iamges/couple.png"

const FeedCard1 = () => {
    return (
        <>
            <div className="container py-4">
                <div className="row justify-content-center gx-4 gy-3 align-items-stretch">

                    {/* Card Section */}
                    <div className="col-lg-5">
                        {/* Left card */}
                        <div className="card h-100" style={{ backgroundColor: "#333b42" }}>
                            <div className="row g-0 h-100">
                                <div className="col-md-4">
                                    <img
                                        src={img}
                                        className="img-fluid rounded-start h-100 w-100 object-fit-cover"
                                        alt="Card visual"
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body d-flex flex-column justify-content-between h-100">
                                        <div>
                                            <div className='d-flex justify-content-between text-white'>
                                                <div className='d-flex'>
                                                    <div>CPLSUEPAUL</div>
                                                    <div><img src={star} height={20} alt="" srcset="" /></div>
                                                </div>

                                                <div className='d-flex gap-2'>
                                                    <div><img src={pc} height={30} alt="" srcset="" /></div>
                                                    <div><img src={chat} height={30} alt="" srcset="" /></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='d-flex gap-3 text-white'>
                                            <div className='d-flex'>
                                                <div><img src={female} height={15} alt="" srcset="" /></div>
                                                <div>15</div>
                                            </div>
                                            <div className='d-flex'>
                                                <div><img src={male} height={15} alt="" srcset="" /></div>
                                                <div>15</div>
                                            </div>
                                        </div>

                                        <div className='text-white'>
                                            <div>Interestes</div>
                                            <div className='d-flex g-4'>
                                                <div><img src={couple} height={15} alt="" srcset="" /></div>
                                                <div><img src={male} height={15} alt="" srcset="" /></div>
                                                <div><img src={female} height={15} alt="" srcset="" /></div>
                                            </div>
                                        </div>


                                        <div className="text-white mb-3 mb-lg-2">
                                            <div className="fw-semibold mb-1">Location</div>
                                            <div>94555, CA, USA &nbsp;&nbsp;•&nbsp;&nbsp;8424 mi</div>
                                        </div>


                                        <div className="container">
                                            <div className="row row-cols-2 row-cols-sm-4 text-center text-white rounded-pill py-2 px-2" style={{ backgroundColor: "#212529" }}>

                                                {/* Column 1 */}
                                                <div className="mb-3 mb-sm-0 d-flex align-items-center justify-content-center gap-2">
                                                    <i className="bi bi-camera-fill text-white fs-6"></i>
                                                    <div>56</div>
                                                </div>

                                                {/* Column 2 */}
                                                <div className="mb-3 mb-sm-0 d-flex align-items-center justify-content-center gap-2">
                                                    <i className="bi bi-play-fill text-white fs-6"></i>
                                                    <div>56</div>
                                                </div>

                                                {/* Column 3 */}
                                                <div className="d-flex align-items-center justify-content-center gap-2">
                                                    <i className="bi bi-camera-fill text-white fs-6"></i>
                                                    <div>56</div>
                                                </div>

                                                {/* Column 4 */}
                                                <div className="d-flex align-items-center justify-content-center gap-2">
                                                    <i className="bi bi-hand-thumbs-up-fill text-white fs-6"></i>
                                                    <div>56</div>
                                                </div>

                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Card */}
                    <div
                        className="col-lg-5 text-white p-3 rounded h-100 d-flex flex-column justify-content-between"
                        style={{ backgroundColor: "#343a40" }}
                    >
                        <div>
                            <div className="d-flex justify-content-between mb-3">
                                <div>
                                    <p className='mb-2'>Location Based</p>
                                    <p className='mb-0'>Athens, GA, USA</p>
                                    <p className='text-primary'>GEORGIANICEGUY</p>
                                </div>
                                <div>
                                    <button className="btn text-white px-4 py-1 rounded-pill bg-primary">Apply To Join</button>
                                </div>
                            </div>
                            <div className="text-white small">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius eos repellat a sint ut vitae
                                illo quaerat aliquam voluptates fugiat accusantium nesciunt dignissimos praesentium
                                quibusdam incidunt et dicta minus iusto unde, quod labore odit. Nobis voluptatum, officia
                                expedita laborum consequatur accusamus qui esse impedit!
                                expedita laborum consequatur accusamus qui esse impedit!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeedCard1