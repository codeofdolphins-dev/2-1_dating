// components/VideoPlayerPopup.jsx
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import httpService from "../../helper/httpService";

const LiveStreamingCardVideoPopup = ({ show, handleClose, videoSrc, card,setViewCount }) => {
    console.log("videoSrc", videoSrc, card)
    useEffect(() => {
        httpService(`/media-library/view/${card?._id}`, "POST")
            .then((res) => {
                console.log("viewres", res)
                setViewCount(res?.data?.viewCount)
            })
            .catch((err) => {
                console.log(err)
            })
    })
    return (
        <Modal show={show} onHide={handleClose} centered size="lg" backdrop="static">
            <Modal.Body className="p-0 bg-black rounded">
                <video controls autoPlay style={{ width: "100%", height: "555px", borderRadius: "0.5rem" }}>
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </Modal.Body>

            <div className="custom-close-btn" onClick={handleClose}>
                &times;
            </div>
        </Modal>
    );
};

export default LiveStreamingCardVideoPopup;
