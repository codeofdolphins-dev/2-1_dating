// components/VideoModal.jsx
import React, { useRef, useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import httpService from "../../helper/httpService";
import videocardImg from "../../assets/cardImgs/Images/Img.png";

const VideoModal = ({ show, handleClose, card, allVideo = [] }) => {
    const videoRef = useRef(null);
    const hasViewed = useRef(false);
    const [activeVideo, setActiveVideo] = useState(card?.url || allVideo[0]?.url);

    // handle view count update
    const handleVideoPlay = async () => {
        if (!hasViewed.current && card?._id) {
            try {
                const res = await httpService(`/media-library/view/${card._id}`, "POST");
                console.log("View Response", res);
                hasViewed.current = true;
            } catch (err) {
                console.error("View update error:", err);
            }
        }
    };



    return (
        <Modal show={show} onHide={handleClose} centered size="lg" className="mt-5">
            <Modal.Header closeButton className="border-0 py-2">
                <Modal.Title className="mb-0">{card?.user?.username || "Video"}</Modal.Title>
            </Modal.Header>

            <Modal.Body className="px-4 pt-2 pb-3" style={{ maxHeight: "100vh", overflow: "hidden" }}>
                <Row className="gx-3 h-100 align-items-stretch flex-md-row flex-column">
                    {/* Left: Main Video */}
                    <Col xs={12} md={9} lg={10} className="d-flex">
                        <video
                            ref={videoRef}
                            src={activeVideo}
                            controls
                            autoPlay
                            onPlay={handleVideoPlay}
                            className="w-100"
                            style={{
                                borderRadius: "8px",
                                objectFit: "cover",
                                height: "520px",
                            }}
                        >
                            Your browser does not support the video tag.
                        </video>
                    </Col>

                    {/* Right: Thumbnails */}
                    <Col
                        xs={12}
                        md={3}
                        lg={2}
                        className="d-flex flex-column"
                        style={{
                            maxHeight: "58vh",
                            overflowY: "auto",
                        }}
                    >
                        {allVideo.length > 0 ? (
                            allVideo.map((v, idx) => (
                                <div
                                    key={idx}
                                    className="mb-2 position-relative"
                                    onClick={() => setActiveVideo(v.url)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <video
                                        src={v.url}
                                        muted
                                        className="w-100 d-block"
                                        style={{
                                            borderRadius: "6px",
                                            height: "80px",
                                            objectFit: "cover",
                                        }}
                                    />

                                    {/* play button */}
                                    <div
                                        className="position-absolute top-50 start-50 translate-middle"
                                        style={{ zIndex: 2 }}
                                    >
                                        <div
                                            className="rounded-circle d-flex justify-content-center align-items-center"
                                            style={{
                                                width: 35,
                                                height: 35,
                                                background: "rgba(255, 255, 255, 0.15)",
                                                backdropFilter: "blur(8px)",
                                                WebkitBackdropFilter: "blur(8px)",
                                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <span
                                                className="text-white fs-5"
                                                style={{ marginBottom: "3px" }}
                                            >
                                                ▶
                                            </span>
                                        </div>
                                    </div>

                                    {/* views */}
                                    <div
                                        className="position-absolute bottom-0 end-0 px-1 py-1"
                                        style={{
                                            background: "rgba(0,0,0,0.6)",
                                            borderTopLeftRadius: "6px",
                                        }}
                                    >
                                        <span
                                            className="text-white"
                                            style={{ fontSize: "10px" }}
                                        >
                                            {v?.sourceData?.viewCount || 0} views
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-white small">No video preview available</p>
                        )}
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default VideoModal;
