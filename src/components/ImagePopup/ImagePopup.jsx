// components/ImageModal.js
import React from 'react';
import { Modal } from 'react-bootstrap';

const ImagePopup = ({ show, handleClose, image }) => {
  console.log("xxxx",image)
  return (
    <Modal show={show} onHide={handleClose} centered className="image-popup-modal">
      <Modal.Body className="p-0 bg-transparent position-relative">
        <img
          src={image || image?.url}
          alt="Popup"
          className="img-fluid w-100 rounded"
          style={{ objectFit: 'cover' }}
        />
        <button
          onClick={handleClose}
          className="btn text-white position-absolute"
          style={{ top: 10, right: 10, fontSize: '1.5rem', background: 'none', border: 'none' }}
        >
          &times;
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default ImagePopup;
