import birthdayCake from "./Images/birthday-cake.png"
import profileImg from "./Images/Img.png"
import star from "./Images/star.png"
import pc from "./Images/pc.png"
import chat from "./Images/chat.png"
import male from "./Images/male.png"
import female from "./Images/female.png"
import couple from "./Images/couple.png"
import middleIcon from "./Images/middle-logo.png"

const BirthdayEventCard = () => {
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
                    <div className="col-lg-6">
                        {/* Left card */}
                        <div className="card h-100" style={{ backgroundColor: "var(--color-border)",border:"2px solid #ffffff" }}>
                            <div className="row g-0 h-100">
                                <div className="col-md-4">
                                    <img
                                        src={profileImg}
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
                                            <div className="row row-cols-2 row-cols-sm-4 text-center text-white rounded-pill py-2 px-2" style={{ backgroundColor: "var(--color-primary-green)" }}>

                                                {/* Column 1 */}
                                                <div className="mb-3 mb-sm-0 d-flex text-black align-items-center justify-content-center gap-2">
                                                    <i className="bi bi-camera-fill fs-6"></i>
                                                    <div>56</div>
                                                </div>

                                                {/* Column 2 */}
                                                <div className="mb-3 mb-sm-0 d-flex text-black align-items-center justify-content-center gap-2">
                                                    <i className="bi bi-play-fill fs-6"></i>
                                                    <div>56</div>
                                                </div>

                                                {/* Column 3 */}
                                                <div className="d-flex align-items-center text-black justify-content-center gap-2">
                                                    <i className="bi bi-camera-fill fs-6"></i>
                                                    <div>56</div>
                                                </div>

                                                {/* Column 4 */}
                                                <div className="d-flex align-items-center text-black justify-content-center gap-2">
                                                    <i className="bi bi-hand-thumbs-up-fill fs-6"></i>
                                                    <div>56</div>
                                                </div>

                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* icon */}
                    {/* <img
                        src={middleIcon}
                        alt="Center Icon"
                        className="actionIcon"
                        style={{ maxHeight: "50px", objectFit: "contain" }}
                    /> */}
                    {/* 2nd card */}
                    <div className="col-lg-6">
                        <div
                            className="text-white rounded-3 p-4 h-100 d-flex flex-column justify-content-center align-items-center text-center"
                            style={{ backgroundColor: "var(--color-border)", border:"2px solid #ffffff" }}
                        >
                            <div className="mb-2">
                                <i class="bi bi-cake h1" style={{color:"b0c3cc"}}></i>
                            </div>
                            <h6 className="mb-0" style={{color:"b0c3cc"}}>Birthday</h6>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default BirthdayEventCard