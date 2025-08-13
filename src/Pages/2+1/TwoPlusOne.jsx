import React from 'react'
import PageWrapper from '../../components/PageWrapper'
import invite_friend from "../../assets/icons/invite_friend.png";
import partner from "../../assets/icons/partner.png";
import { useNavigate } from 'react-router-dom';


const TwoPlusOne = () => {

    const navigate = useNavigate();

    return (
        <>
            <PageWrapper>
                <div className="container-fluid py-5 px-5 d-flex align-items-center justify-content-start gap-5 mt-5" style={{ backgroundColor: "var(--color-background)" }}>

                    <div className="text-white d-flex flex-column justify-content-center align-items-center gap-3" style={{ maxWidth: "310px" }}>
                        <img 
                            src={invite_friend}
                            alt="invite friend"
                            width={"109px"}
                            height={"109px"}
                            className='rounded-circle'
                        />
                        <button className='custom-button py-1 px-3 rounded-5 border-0' onClick={() => navigate("/invite-friend")}>Invite Friends</button>
                        <p className='text-center' style={{ fontSize: "14px", opacity: ".75" }}>Grow your network by inviting friends to join 2+1! Share your unique QR code, invitation text, or send email invites to enhance your lifestyle journey together. </p>
                    </div>

                    <div className="text-white d-flex flex-column justify-content-center align-items-center gap-3" style={{ maxWidth: "310px" }}>
                        <img 
                            src={partner}
                            alt="2+1 partner"
                            width={"109px"}
                            height={"109px"}
                            className='rounded-circle'
                        />
                        <button className='custom-button py-1 px-3 rounded-5 border-0'>2+1 Partner</button>
                        <p className='text-center' style={{ fontSize: "14px", opacity: "0.75" }}>Make money and grow your business with 2+1 - all with the flexibility of one Partner Account. Participate as an affiliate, an advertiser, or both! Learn more about how to grow your brand and earn 50% affiliate commissions.</p>
                    </div>

                </div>
            </PageWrapper>
        </>
    )
}

export default TwoPlusOne