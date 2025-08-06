// components/VideoModal.js
import React from 'react';
import { Modal } from 'react-bootstrap';
import "./videopopup.css"

const VideoModal = ({ show, handleClose, videoSrc }) => {
  return (
    <Modal show={show} onHide={handleClose} centered size="lg" className="video-popup-modal">
      <Modal.Body className="p-0 bg-black">
        <div className="position-relative w-100">
          {/* Video player */}
          <video
            controls
            autoPlay
            style={{ width: '100%', height: '100%' }}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Close button (top-right corner) */}
          <button
            onClick={handleClose}
            className="btn text-white position-absolute"
            style={{ top: -10, right: 0, fontSize: '2.5rem' }}
          >
            &times;
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default VideoModal;
