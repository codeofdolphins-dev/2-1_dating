import React, { useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaEnvelope, FaWhatsapp, FaXTwitter, FaTelegram, FaReddit } from "react-icons/fa6";
import { QRCodeCanvas } from "qrcode.react";

const ShareQrPopup = ({ show, handleClose, qrLink, title, qrShow=true }) => {
    const qrRef = useRef();

    // Download QR as PNG
    const downloadQR = () => {
        const canvas = qrRef.current.querySelector("canvas");
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = "qrcode.png";
        a.click();
    };

    console.log("dfdgdfgd",qrShow)

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Body
                className="text-white text-center rounded-3"
                style={{ backgroundColor: "var(--color-border)" }}
            >
                <h5 className="mb-4">{title}</h5>

                {/* QR Code */}
                {
                    qrShow && <div ref={qrRef} className="d-flex justify-content-center mb-4">
                        <QRCodeCanvas
                            value={qrLink}
                            size={180}
                            bgColor="#ffffff"
                            fgColor="#000000"
                            level="H"
                            includeMargin={true}
                        />
                    </div>
                }


                {/* Social Icons */}
                <div className="d-flex justify-content-center gap-3 mb-4">
                    <a href={`mailto:?body=${encodeURIComponent(qrLink)}`} className="btn btn-secondary rounded-circle p-3">
                        <FaEnvelope size={30} />
                    </a>
                    <a
                        href={`https://wa.me/?text=${encodeURIComponent(qrLink)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-success rounded-circle p-3"
                    >
                        <FaWhatsapp size={30} />
                    </a>
                    <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(qrLink)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-dark rounded-circle p-3"
                    >
                        <FaXTwitter size={30} />
                    </a>
                    <a
                        href={`https://t.me/share/url?url=${encodeURIComponent(qrLink)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-info rounded-circle p-3"
                    >
                        <FaTelegram size={30} />
                    </a>
                    <a
                        href={`https://www.reddit.com/submit?url=${encodeURIComponent(qrLink)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-warning rounded-circle p-3"
                    >
                        <FaReddit size={30} />
                    </a>
                </div>

                {/* Download Button */}
                {
                    qrShow &&
                <button onClick={downloadQR} className="btn btn-outline-info mb-3">
                    Download QR Code as image
                </button>
                }

                {/* Close Button */}
                <div className="mt-3">
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ShareQrPopup;
