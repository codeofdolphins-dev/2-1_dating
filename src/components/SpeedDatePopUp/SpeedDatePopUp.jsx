import React from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SpeedDatePopup = ({ speedDateModalData, show, handleClose }) => {
    const {
        modaltitle,
        placeType,
        date,
        dateWith,
        where,
        description,
        subDescription,
    } = speedDateModalData;

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            contentClassName="text-white rounded-4 p-3 modal-bg container"
            dialogClassName="custom-modal-width custom-modal"
        >
            <div className="custom-close-btn" onClick={handleClose}>
                &times;
            </div>
            <Modal.Header closeButton className="border-0">
                <Modal.Title className="fw-semibold">{modaltitle}</Modal.Title>
            </Modal.Header>

            <hr className="text-white mx-3" />

            <Modal.Body className="pt-3">
                <p className="mb-2"><strong>{placeType}</strong></p>
                <p className="mb-2">When : {date}</p>
                <p className="mb-2">With : {dateWith || "-"}</p>
                <p className="mb-3">Where : {where}</p>
                <p className="mb-2">{description}</p>
                <p className="mb-0">{subDescription}</p>
            </Modal.Body>
        </Modal>
    );
};

export default SpeedDatePopup;
