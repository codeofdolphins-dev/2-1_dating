import React from "react";
import { Modal, Row, Col } from "react-bootstrap";
import videocardImg from "../../assets/cardImgs/Images/Img.png";
import demoVideo from "../../assets/PopupDemoVideo/243647_small.mp4";

const VideoModal = ({ show, handleClose, onClick }) => {
    return (
        <Modal show={show} onHide={handleClose} centered size="lg" className="mt-5 ">
            <Modal.Header closeButton className="border-0 py-2">
                <Modal.Title>SHALURISHI</Modal.Title>
            </Modal.Header>

            <Modal.Body className="px-4 pt-2 pb-3" style={{ maxHeight: "62vh", overflow: "hidden" }}>
                <Row className="gx-3 h-100 align-items-stretch flex-md-row flex-column">
                    {/* Left: Main Video */}
                    <Col xs={12} md={9} lg={10} className="d-flex">
                        <video
                            src={demoVideo}
                            controls
                            className="w-100"
                            style={{
                                borderRadius: "8px",
                                objectFit: "cover",
                                height: "100%"
                            }}
                        ></video>
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
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((video, idx) => (
                            <div key={idx} className="mb-2 position-relative">
                                <img
                                    src={videocardImg}
                                    alt=""
                                    className="w-100 d-block"
                                    style={{
                                        borderRadius: "6px",
                                    }}
                                />

                                {/* play button */}
                                <div
                                    className="position-absolute top-50 start-50 translate-middle"
                                    style={{ zIndex: 2 }}
                                    onClick={() => onClick()}
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
                                        <span className="text-white fs-5" style={{ marginBottom: "3px" }}>&#9658;</span>
                                    </div>
                                </div>

                                {/* views */}
                                <div
                                    className="position-absolute translate-middle"
                                    style={{
                                        zIndex: 2,
                                        right: "-10px",
                                        bottom: "-10px",
                                    }}
                                >
                                    <span className="text-white" style={{ marginBottom: "3px", fontSize: "10px" }}>10 views</span>
                                </div>
                            </div>
                        ))}
                    </Col>
                </Row>
            </Modal.Body>

        </Modal>
    );
};

export default VideoModal;
