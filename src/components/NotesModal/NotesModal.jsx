import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const NotesPopup = ({ show, handleClose, onSubmit }) => {
    const [reportDesc, setReportDesc] = useState("");
    const [error, setError] = useState(false);

    const reportHandler = () => {
        if (reportDesc.trim().length < 10) {
            setError(true);
            return;
        }
        setError(false);
        onSubmit({ reportDesc });
        setReportDesc("");
        handleClose();
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            backdrop="static"
            contentClassName="border-0"
            style={{ zIndex: 5000 }}
        >
            <Modal.Body
                className="rounded-3 w-100 text-white p-0"
                style={{
                    backgroundColor: "var(--color-border)",
                }}
            >
                {/* Close Button (top right) */}
                

                {/* Content */}
                <div className="d-flex flex-column gap-3 px-2 pt-4 pb-2">
                    <textarea
                        rows={3}
                        className="rounded-2 text-white py-2 px-2"
                        style={{
                            width: "100%",
                            fontSize: "14px",
                            backgroundColor: "var(--color-border)",
                            border: "1px solid #555",
                            resize: "none",
                        }}
                        value={reportDesc}
                        onChange={(e) => setReportDesc(e.target.value)}
                    />
                    {error && (
                        <p
                            className="text-danger mb-0"
                            style={{ fontSize: "13px" }}
                        >
                            Description must be at least 10 characters long***
                        </p>
                    )}
                </div>

                {/* Footer Buttons */}
                <Modal.Footer
                    style={{
                        backgroundColor: "var(--color-border)",
                        borderTop: "1px solid #444",
                    }}
                    className="p-0 m-0"
                >
                    <div className="d-flex w-100">
                        <Button
                            variant=""
                            onClick={handleClose}
                            className="flex-fill rounded-0 text-white"
                            style={{
                                borderRight: "1px solid #444",
                                fontWeight: "500",
                            }}
                        >
                            CANCEL
                        </Button>
                        <Button
                            variant=""
                            onClick={reportHandler}
                            className="flex-fill rounded-0 border-0 text-white"
                            style={{
                                fontWeight: "500",
                                color: "#0d6efd",
                            }}
                            disabled={!reportDesc.trim()}
                        >
                            SEND
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    );
};

export default NotesPopup;
