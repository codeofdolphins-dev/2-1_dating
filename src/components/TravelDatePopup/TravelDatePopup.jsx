import React from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const TravelDatePopup = ({ travelDateModalData, show, handleClose }) => {
  const {
    modaltitle,
    dateRange,
    location,
    distance,
    description,
  } = travelDateModalData;

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        contentClassName="text-white rounded-4 p-3 modal-bg container position-relative"
        dialogClassName="custom-modal-width custom-modal"
      >
        <div className="custom-close-btn" onClick={handleClose}>
          &times;
        </div>

        <Modal.Header className="border-0 d-flex justify-content-between align-items-center pt-1 pb-2">
          <Modal.Title className="fw-semibold">{modaltitle}</Modal.Title>
          <span className="fs-6 small fw-semibold cursor-pointer traveldateRighttext" style={{ fontSize: "0.85rem",textDecoration:"underline" }}>
            See who else is going here
          </span>
        </Modal.Header>

        <hr className="text-white mx-3" />

        <Modal.Body className="pt-2">
          <p className="mb-1"><strong>Date:</strong> {dateRange}</p>
          <p className="mb-1"><strong>Location:</strong> {location}</p>
          <p className="mb-3"><strong>Distance:</strong> {distance}</p>
          <p className="mb-0">{description}</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TravelDatePopup;
