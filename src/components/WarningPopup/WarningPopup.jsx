import React from "react";
import { Modal, Button } from "react-bootstrap";
import { IoClose } from "react-icons/io5"; // Close icon (optional)

const WarningPopup = ({
  text = "Are You Sure ?",
  setWarningShowPopup,
  warningShowPopup,
  onConfirm, // <-- add callback for YES
}) => {
  const handleClose = () => setWarningShowPopup(false);

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

      </Modal.Header>

      {/* Body */}
      <Modal.Body
        style={{
          backgroundColor: "var(--color-border)",
          color: "white",
        //   border: 0,
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
            onClick={() => {
              if (onConfirm) onConfirm();
              handleClose();
            }}
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
