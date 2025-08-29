import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { IoClose } from "react-icons/io5"; // white close icon

const ReportMessagePopup = ({
    username = "RDUSTAGVIXEN",
    reportMessagePopupShow,
    setReportMessagePopupShow,
}) => {
    const [reason, setReason] = useState("");

    const handleClose = () => setReportMessagePopupShow(false);

    const handleSend = () => {
        if (reason.length < 20) {
            alert("Reason must be at least 20 characters.");
            return;
        }
        alert(`Report sent for ${username}: ${reason}`);
        setReportMessagePopupShow(false);
    };

    return (
        <Modal show={reportMessagePopupShow} onHide={handleClose} centered>
            {/* Header */}
            <Modal.Header
                style={{ backgroundColor: "var(--color-border)" }}
                className="d-flex align-items-center"
            >
                <Modal.Title className="text-white">
                    Report {username}
                </Modal.Title>
                {/* Custom white close button */}
                <button
                    onClick={handleClose}
                    className="btn border-0 p-0 ms-auto"
                    style={{ background: "transparent" }}
                >
                    {/* <IoClose size={22} color="white" /> */}
                </button>
            </Modal.Header>

            {/* Body */}
            <Modal.Body
                style={{
                    backgroundColor: "var(--color-border)",
                    color: "white",
                }}
            >
                <Form>
                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Please briefly explain the reason for this report"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            style={{
                                backgroundColor: "#fff",
                                color: "#000",
                                resize: "none",
                            }}
                        />
                        <small className="d-block text-end mt-1 text-white">
                            Min. 20 characters
                        </small>
                    </Form.Group>
                </Form>
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
                        variant=""
                        onClick={handleClose}
                        className="flex-fill rounded-0 text-white"
                        style={{ borderRight: "1px solid #444" }}
                    >
                        CANCEL
                    </Button>
                    <Button
                        variant=""
                        onClick={handleSend}
                        className="flex-fill rounded-0 border-0 text-white"
                        disabled={reason.length < 20}
                    >
                        SEND
                    </Button>
                </div>
            </Modal.Footer>

        </Modal>
    );
};

export default ReportMessagePopup;
