import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const OTPVerificationModal = ({ show, onClose, onVerify }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  // Handle input change
  const handleChange = (element, index) => {
    if (/^[0-9]?$/.test(element.value)) {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);
      // Move to next input automatically
      if (element.value !== "" && index < 5) {
        element.nextSibling.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("Entered OTP:", otpCode);
    onVerify(otpCode); // call parent function
  };

  const handleResend = () => {
    console.log("Resend OTP clicked");
    // Call API to resend OTP here
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>OTP Verification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please enter the 6-digit OTP sent to your email or phone.</p>
        <Form onSubmit={handleSubmit} className="d-flex justify-content-between gap-2">
          {otp.map((data, index) => (
            <Form.Control
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              className="text-center"
              style={{ width: "3rem", fontSize: "1.5rem" }}
              autoFocus={index === 0}
            />
          ))}
          <Button type="submit" className="btn-primary" style={{ flex: 1 }}>
            Verify
          </Button>
        </Form>
        <div className="mt-3 text-center">
          <Button variant="link" onClick={handleResend}>
            Resend OTP
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OTPVerificationModal;
