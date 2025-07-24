import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GlobalPageWrapper from '../../components/GlobalPageWrapper';
import ChatRoomPersoncard from '../../components/ChatroomCard/ChatRoomPersoncard';

import coupleImg1 from "../../assets/cardImgs/Images/Img.png"
import coupleImg2 from "../../assets/ViwCardImags/img/couple5.webp"
import coupleImg3 from "../../assets/ViwCardImags/img/couple6.jpeg"
import coupleImg4 from "../../assets/ViwCardImags/img/couple7.webp"
import coupleImg5 from "../../assets/ViwCardImags/img/coupleImg.jpeg"

const cards = [
  { code: "NYCCPL1", img: coupleImg1 },
  { code: "NYCCPL2", img: coupleImg2 },
  { code: "NYCCPL3", img: coupleImg3 },
  { code: "NYCCPL4", img: coupleImg4 },
  { code: "NYCCPL5", img: coupleImg5 },
  { code: "NYCCPL6", img: coupleImg2 },
  { code: "NYCCPL7", img: coupleImg3 },
  { code: "NYCCPL8", img: coupleImg1 },
  { code: "NYCCPL9", img: coupleImg5 },
  { code: "NYCCPL10", img: coupleImg4 },
  { code: "NYCCPL11", img: coupleImg2 },
  { code: "NYCCPL12", img: coupleImg3 },
  { code: "NYCCPL13", img: coupleImg1 },
  { code: "NYCCPL14", img: coupleImg5 },
];


const Chatroom = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { title, members } = location.state || {};

    const nagigatePrevPage = () => {
        navigate("/chatrooms");
    };

    return (
        <div className='mt-5' style={{ backgroundColor: "var(--color-border)", minHeight: "100vh" }}>
            <GlobalPageWrapper />

            <div className='container-fluid'>
                <div className='row'>
                    <div className="col-lg-8 mt-2">
                        <div className="d-flex justify-content-between align-items-center">
                            {/* Left section: Back + Title + Members */}
                            <div className="d-flex align-items-center gap-2 text-white">
                                <i
                                    className="bi bi-chevron-left fs-3"
                                    style={{ cursor: "pointer" }}
                                    onClick={nagigatePrevPage}
                                ></i>
                                <div className="fs-4 fw-semibold text-uppercase">
                                    {title} <span className="fw-normal" style={{ color: "var(--color-primary-green)" }}>| {members}</span>
                                </div>
                            </div>

                            {/* Right section: Buttons */}
                            <div className="d-flex align-items-center gap-3">
                                <button className="btn btn-danger btn-sm rounded-pill px-3">
                                    Go Live Now
                                </button>

                                <div className="d-flex align-items-center gap-1">
                                    <label className="text-white small me-1">Sort by:</label>
                                    <select className="form-select form-select-sm bg-dark text-white border-0" style={{ width: "120px" }}>
                                        <option>Distance</option>
                                        <option>Newest</option>
                                        <option>Popular</option>
                                    </select>
                                </div>

                                <button className="btn btn-outline-light btn-sm rounded-pill px-3">
                                    Report
                                </button>
                            </div>

                        </div>
                        <div className='mt-5'>
                            <div className="container-fluid client-page-background overflow-auto" style={{height:"555px"}}>
                                <div className="row g-2 py-2 d-flex ">
                                    {
                                        cards.map((card, index) => (
                                            <div className="col-12 col-sm-6 col-lg-6 col-xl-3 d-flex justify-content-center mb-2" key={index}>
                                                <ChatRoomPersoncard image={card.img} code={card.code} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatroom;
