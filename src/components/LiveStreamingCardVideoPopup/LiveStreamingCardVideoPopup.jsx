// components/VideoPlayerPopup.jsx
import React from "react";
import { Modal } from "react-bootstrap";

const LiveStreamingCardVideoPopup = ({ show, handleClose, videoSrc }) => {
    console.log("videoSrc",videoSrc)
    return (
        <Modal show={show} onHide={handleClose} centered size="lg" backdrop="static">
            <Modal.Body className="p-0 bg-black rounded">
                <video controls autoPlay style={{ width: "100%", height: "auto", borderRadius: "0.5rem" }}>
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
