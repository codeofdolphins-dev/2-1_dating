import React, { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const OTPVerificationModal = ({ show, onClose, onVerify }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

  // Handle single digit typing
  const handleChange = (element, index) => {
    if (/^[0-9]?$/.test(element.value)) {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);

      // Move to next input automatically
      if (element.value !== "" && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  // Handle backspace key
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Handle paste (e.g., "123456")
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      if (/^[0-9]$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);

    // Focus last filled input
    const lastIndex = Math.min(pastedData.length - 1, 5);
    if (lastIndex >= 0) inputsRef.current[lastIndex].focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("Entered OTP:", otpCode);
    onVerify(otpCode); // call parent function
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>OTP Verification</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-white d-flex justify-content-center">
          Please enter the 6-digit OTP sent to your email or phone.
        </p>
        <Form
          onSubmit={handleSubmit}
          className="d-flex justify-content-between gap-2 flex-wrap"
        >
          {otp.map((data, index) => (
            <Form.Control
              key={index}
              type="text"
              maxLength="1"
              value={data}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="text-center"
              style={{ width: "3rem", fontSize: "1.5rem" }}
              autoFocus={index === 0}
            />
          ))}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="primary"
          className="mx-auto"
          onClick={handleSubmit}
          disabled={otp.join("").length < 6} // ✅ disable until filled
        >
          Verify
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OTPVerificationModal;
