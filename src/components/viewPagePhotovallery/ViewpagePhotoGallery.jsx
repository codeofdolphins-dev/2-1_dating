import React from "react";
import { Modal } from "react-bootstrap";
import img1 from "./img/coupleImg.jpeg"; // Your image import
import "./viewPagePhotoGalleryCSS/viewPagePhotoGallery.css"



const ViewpagePhotoGallery = ({ show, handleClose, images }) => {
  const galleryImages = images && images.length > 0 ? images : defaultImages;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      className="custom-gallery-modal" // custom width class
      contentClassName="border-0" // removes modal default borders
      style={{ zIndex: 5000 }}
    >
      <Modal.Body
        className=" rounded-3 w-100"
        style={{
          padding: "1rem",
          backgroundColor:"var(--color-border)"
        }}
      >
        {/* Close Button */}
        <div className="d-flex justify-content-end mb-2">
          <button
            onClick={handleClose}
            className="btn btn-sm btn-outline-light"
          >
           <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Image Gallery Grid */}
        <div className="row g-3">
          {galleryImages.map((img, idx) => (
            <div className="col-6" key={idx}>
              <img
                src={img}
                alt={`gallery-${idx}`}
                className="img-fluid rounded"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ViewpagePhotoGallery;


