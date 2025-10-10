import React from "react";
import { Modal, Button } from "react-bootstrap";
import { IoClose } from "react-icons/io5";

const WarningPopup = ({
  text = "Are you sure?",
  setWarningShowPopup,
  warningShowPopup,
  onConfirm, // Callback for YES button
  setIsBlock, // Optional: function to toggle block state
}) => {
  const handleClose = () => setWarningShowPopup(false);

  const handleSubmit = () => {
    if (typeof setIsBlock === "function") setIsBlock(true);
    if (typeof onConfirm === "function") onConfirm();
    handleClose();
  };

  return (
    <Modal show={warningShowPopup} onHide={handleClose} centered>
      {/* Header */}
      <Modal.Header
        style={{ backgroundColor: "var(--color-border)" }}
        className="d-flex justify-content-between align-items-center border-0"
      >
        <Modal.Title className="text-white text-center flex-grow-1 m-0">
          Warning
        </Modal.Title>
        <IoClose
          size={24}
          color="white"
          style={{ cursor: "pointer" }}
          onClick={handleClose}
        />
      </Modal.Header>

      {/* Body */}
      <Modal.Body
        style={{
          backgroundColor: "var(--color-border)",
          color: "white",
        }}
        className="text-center"
      >
        <h5 className="mb-0">{text}</h5>
      </Modal.Body>

      {/* Footer */}
      <Modal.Footer
        style={{
          backgroundColor: "var(--color-border)",
          borderTop: "1px solid #444",
        }}
        className="p-0"
      >
        <div className="d-flex w-100">
          <Button
            variant="link"
            onClick={handleClose}
            className="flex-fill rounded-0 text-white"
            style={{
              borderRight: "1px solid #444",
              textDecoration: "none",
            }}
          >
            CANCEL
          </Button>
          <Button
            variant="link"
            onClick={handleSubmit}
            className="flex-fill rounded-0 text-primary"
            style={{ textDecoration: "none" }}
          >
            YES
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default WarningPopup;
