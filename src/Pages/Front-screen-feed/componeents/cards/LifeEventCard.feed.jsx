import birthday from "./Images/birthday-cake.png"
import img from "./Images/Img.png"
import star from "./Images/star.png"
import pc from "./Images/pc.png"
import chat from "./Images/chat.png"
import male from "./Images/male.png"
import female from "./Images/female.png"
import couple from "./Images/couple.png"
import middleIcon from "./Images/middle-logo.png"

const LifeEventCard = () => {
    return (
        <>
            <div className="container py-4">
                <div className="row justify-content-center gx-4 gy-3 align-items-stretch">
                    <div className="col-lg-11">
                        <div className='d-flex justify-content-between'>
                            <div>
                                <h6 className='text-white'>CPLSUEPAUL has joined Georgia For Chocolate 🍫</h6>
                            </div>
                            <div>
                                <h6 className='text-danger'>Dec 12, 2024 | 24 Members</h6>
                            </div>
                        </div>
                    </div>
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

                    {/* Middle Icon Column */}
                    <div className="col-lg-1 col-md-1 d-flex justify-content-center align-items-center">
                        <img
                            src={middleIcon}
                            alt="Center Icon"
                            className="img-fluid"
                            style={{ maxHeight: "50px", objectFit: "contain" }}
                        />
                    </div>

                    {/* Right Card */}
                    <div
                        className="col-lg-5 text-white p-3 rounded d-flex flex-column justify-content-center"
                        style={{ backgroundColor: "#343a40" }}
                    >
                        <div className="d-flex justify-content-center">
                            <div
                                className="col-lg-5 text-white p-4 rounded d-flex flex-column align-items-center justify-content-center text-center"
                                style={{ backgroundColor: "#343a40" }}
                            >
                                <div className="mb-2">
                                    <i class="bi bi-cake h1"></i>
                                </div>
                                <div className="fs-5 fw-semibold">His Birthday</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LifeEventCard