import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import "./style.css";

const SpeedDateCheckBoxPopup = ({ show, handleClose, SpeedDateCheckBoxPopupOptions }) => {
    const [selected, setSelected] = useState("");

    const handleChange = (value) => {
        setSelected(value);
    };

    const { heading, options } = SpeedDateCheckBoxPopupOptions;

    return (
        <Modal show={show} onHide={handleClose} centered contentClassName="popup-modal">
            <Modal.Body className="text-white text-left p-4 w-50">
                <h5 className="mb-4 fw-bold">{heading}</h5>

                {options.map((option, index) => (
                    <Form.Check
                        key={index}
                        type="checkbox"
                        label={option}
                        checked={selected === option}
                        onChange={() => handleChange(option)}
                        className="custom-checkbox mb-3"
                    />
                ))}
            </Modal.Body>

            <div className="custom-close-btn" onClick={handleClose}>
                &times;
            </div>
        </Modal>
    );
};

export default SpeedDateCheckBoxPopup;
