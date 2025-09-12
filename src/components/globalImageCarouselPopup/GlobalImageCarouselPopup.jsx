import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

const GlobalImageCarouselPopup = ({ show, handleClose, images = [], currentMediaData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔹 Set initial index when modal opens with currentMediaData
  useEffect(() => {
    if (currentMediaData && images.length > 0) {
      const index = images.findIndex(
        (item) =>
          (item?.url && item.url === currentMediaData?.url) ||
          item === currentMediaData
      );
      if (index >= 0) {
        setCurrentIndex(index);
      }
    }
  }, [currentMediaData, images, show]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentMedia = images[currentIndex];

  return (
    <Modal
  show={show}
  onHide={handleClose}
  centered
  size="lg"
  className="carousel-popup"
>
  <Modal.Body
    className="p-0 bg-dark d-flex align-items-center justify-content-center position-relative"
    style={{
      width: "600px",     // ✅ fixed width
      height: "500px",    // ✅ fixed height
      margin: "0 auto",   // center horizontally
    }}
  >
    {/* Close button */}
    <button
      onClick={handleClose}
      className="btn text-white position-absolute"
      style={{
        top: 15,
        right: 20,
        fontSize: "2rem",
        border: "none",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        lineHeight: "1",
      }}
    >
      &times;
    </button>

    {/* Image / Video */}
    {images.length > 0 && (
      <>
        {currentMedia?.type === "video" || currentMedia?.endsWith?.(".mp4") ? (
          <video
            src={currentMedia?.url || currentMedia}
            controls
            autoPlay
            className="img-fluid"
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        ) : (
          <img
            src={currentMedia?.url || currentMedia}
            alt={`Slide ${currentIndex + 1}`}
            className="img-fluid"
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        )}
      </>
    )}

    {/* Prev Button */}
    {images.length > 1 && (
      <button
        onClick={handlePrev}
        className="btn position-absolute"
        style={{
          left: 20,
          fontSize: "2.5rem",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          lineHeight: "1",
        }}
      >
        &#8249;
      </button>
    )}

    {/* Next Button */}
    {images.length > 1 && (
      <button
        onClick={handleNext}
        className="btn position-absolute"
        style={{
          right: 20,
          fontSize: "2.5rem",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          lineHeight: "1",
        }}
      >
        &#8250;
      </button>
    )}

    {/* Counter */}
    {images.length > 0 && (
      <div
        className="position-absolute text-white"
        style={{
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "1rem",
          background: "rgba(0,0,0,0.6)",
          padding: "5px 12px",
          borderRadius: "20px",
        }}
      >
        {currentIndex + 1} / {images.length}
      </div>
    )}
  </Modal.Body>
</Modal>

  );
};

export default GlobalImageCarouselPopup;
