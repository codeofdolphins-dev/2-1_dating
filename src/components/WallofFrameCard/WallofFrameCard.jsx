import React from "react";
import { FaMapMarkerAlt, FaCamera, FaUsers, FaStar, FaHeart, FaEye } from "react-icons/fa";
import { FaMobileAlt, FaCommentDots, FaCalendarAlt } from "react-icons/fa";
import { PiGenderIntersexFill } from "react-icons/pi"; // Or another gender icon

import cardpic from "../../assets/cardImgs/Images/Img.png"
import male from "../../assets/cardImgs/Images/male.png"
import female from "../../assets/cardImgs/Images/female.png"

import pc from "../../assets/cardImgs/Images/pc.png"
import chat from "../../assets/cardImgs/Images/chat.png"
import calender from "../../assets/cardImgs/Images/calender.png"
import phone from "../../assets/ViwCardImags/img/phone.png"

import "./WallofFrameCardCSS.css"; // Include custom styles

const WallofFrameCard = () => {
    return (
        <div className="card custom-card text-white border-0 rounded-4 shadow-sm" style={{ backgroundColor: "var(--color-border)" }}>
            <div className="position-relative">
                <img
                    src={cardpic} // Replace with actual image
                    alt="Profile"
                    className="card-img-top rounded-top-4"
                />
                <div
                    className="position-absolute bottom-0 w-100 d-flex justify-content-start align-items-center gap-3 px-2 text-white py-1"
                    style={{
                        backgroundColor: "var(--color-border)",
                        opacity: 0.80,
                    }}
                >
                    <div className="d-flex justify-content-between text-white px-3 py-1 gap-3">
                        <div className="d-flex align-items-center gap-1">
                            <FaCamera /> <span>41</span>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                            <FaUsers /> <span>12</span>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                            <FaStar /> <span>5</span>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                            <FaHeart /> <span>17</span>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                            <FaEye /> <span>209</span>
                        </div>
                    </div>

                </div>
            </div>

            <div className="card-body">
                <h5 className="card-title text-danger mb-2">ORGASMIC</h5>
                <hr />
                <div className="d-flex justify-content-between align-items-center my-2">
                    {/* Left Side: Gender Counts */}
                    <div className="d-flex gap-3 align-items-center">
                        {/* Female */}
                        <div className="d-flex align-items-center gap-1">
                            <img src={female} height={14} alt="Female" />
                            <div className="text-danger fw-bold">57</div>
                        </div>

                        {/* Male */}
                        <div className="d-flex align-items-center gap-1">
                            <img src={male} height={14} alt="Male" />
                            <div className="text-primary fw-bold">58</div>
                        </div>
                    </div>

                    {/* Right Side: Interests */}
                    <div className="d-flex align-items-center text-white small gap-2">
                        <span className="mb-0">Interests:</span>
                        <div className="d-flex ">
                            <img src={female} height={14} alt="Interest Male 1" />
                            <img src={male} height={14} alt="Interest Female" />
                            <img src={female} height={14} alt="Interest Male 2" />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="text-white small my-2">
                    <FaMapMarkerAlt className="me-1" />
                    Hyderabad, IND | 1 mi
                </div>

                <div className="d-flex justify-content-start gap-2 border-top pt-2">
                    <div>
                        <img src={phone} height={25} alt="" />
                    </div>

                    <div>
                        <img src={pc} height={25} alt="" />
                    </div>

                    <div>
                        <img src={chat} height={25} alt="" />
                    </div>

                    <div>
                        <img src={calender} height={25} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WallofFrameCard;
