import React from 'react'
import PageWrapper from '../../components/PageWrapper'
import { useNavigate } from 'react-router-dom'
import logo from "../../assets/icons/logo.png";
import dummy_qrcode from "../../assets/icons/qr_code.png";


const InviteFriend = () => {

    const navigate = useNavigate();

    return (
        <>
            <PageWrapper>
                <div className="container-fluid  d-flex flex-column align-items-start justify-content-start gap-2 text-white mt-5" style={{ backgroundColor: "var(--color-background)" }}>
                    {/* navigation */}
                    <div className="d-flex justify-content-start align-items-center gap-3">
                        <i
                            className="bi bi-chevron-left fs-5 back-icon"
                            onClick={() => navigate("/two-plus-one")}
                        ></i>
                        <h4 className='text-white mb-0'>Search</h4>
                    </div>
                    <p className='mt-3' style={{ opacity: "0.75"}}>Grow your network by inviting friends to join 2+1! Share your unique QR code, invitation text, or send email invites to enhance your lifestyle journey together.</p>

                    <div className="row ">
                            <div className=" col-md-6 col-12 mb-4">
                                <div className="d-flex flex-column justify-content-center align-items-start gap-2" style={{ maxWidth: "350px", opacity: "0.75" }}>
                                    <h5>QR code</h5>
                                    <p className='' style={{ fontSize: "12px", textAlign: "justify" }}>Share the image of your personalized QR code below to invite your friends to join you on 2+1. Share it with your friends in person and on communication platforms like WhatsApp, Messenger, etc.</p>
                                    <img
                                        src={dummy_qrcode}
                                        alt="qr code"
                                        width={"200px"}
                                    />
                                    <button className='custom-button py-1 px-5 rounded-4 border-0'>Share</button>
                                </div>
                            </div>

                            <div className="col-md-6 col-12">
                                <div className="d-flex flex-column justify-align-content-between align-items-start gap-3" style={{ maxWidth: "350px", opacity: "0.75" }}>
                                    <h5 className='mb-0'>Share</h5>
                                    <p className='mb-0' style={{ fontSize: "12px", textAlign: "justify" }}>Share 2+1 with your friends on communication platforms like WhatsApp, Messenger, etc.</p>
                                    <img
                                        src={logo}
                                        alt="logo"
                                        width={"200px"}
                                        className='my-3'
                                    />
                                    <button className='custom-button py-1 px-5 rounded-4 border-0'>Share</button>
                                </div>
                            </div>
                    </div>
                </div>
            </PageWrapper>
        </>
    )
}

export default InviteFriend