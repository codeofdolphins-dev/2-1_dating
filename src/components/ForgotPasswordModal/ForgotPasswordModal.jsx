import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomPhonenumberInputField from "../../Pages/RegistrationPage/Components/CustomPhonenumberInputField";
import axios from "axios";

import style from "./style.module.css"

const ForgotPasswordModal = ({ show, onHide }) => {
    const apiUrl = import.meta.env.VITE_BASE_URL;

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        countryCode: "91",
        phoneNumber: "",
        email: "",
        phoneOtp: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [otpTimer, setOtpTimer] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCopy = (otp) => {
        navigator.clipboard
            .writeText(otp)
            .then(() => toast.success("OTP copied to clipboard!"))
            .catch(() => toast.error("Failed to copy OTP."));
    };

    // ✅ Send OTP
    const handleSendOtp = () => {
        if (!formData.phoneNumber) {
            toast.error("Please enter your phone number first");
            return;
        }
        if (formData.phoneNumber.length < 10) {
            toast.error("Please enter a valid phone number");
            return;
        }

        setOtpTimer(20);
        const countdown = setInterval(() => {
            setOtpTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        axios
            .post(`${apiUrl}/auth/forgot-password`, {
                phone: `+${formData.countryCode}${formData.phoneNumber}`,
                // email: formData.email,
            })
            .then((res) => {
                const otp = res.data?.data?.code;
                toast.success("OTP sent successfully!");

                // Custom OTP toast
                toast(
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            position: "relative",
                            padding: "0.5rem 1rem 0.75rem 0.75rem",
                            minWidth: "300px",
                        }}
                    >
                        <button
                            onClick={() => toast.dismiss()}
                            style={{
                                position: "absolute",
                                top: "6px",
                                right: "8px",
                                background: "transparent",
                                border: "none",
                                fontSize: "1.25rem",
                                color: "#000",
                                cursor: "pointer",
                            }}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <div style={{ marginBottom: "0.5rem", fontSize: "1rem" }}>
                            <strong>Your OTP:</strong>{" "}
                            <span style={{ color: "#6c757d" }}>{otp}</span>
                        </div>
                        <button
                            onClick={() => handleCopy(otp)}
                            style={{
                                padding: "5px 12px",
                                fontSize: "0.875rem",
                                background: "#007bff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            Copy OTP
                        </button>
                    </div>,
                    {
                        position: "top-right",
                        autoClose: false,
                        theme: "colored",
                    }
                );

                setStep(2);
            })
            .catch(() => toast.error("Failed to send OTP"));
    };

    // ✅ Verify OTP
    const handleVerifyOtp = () => {
        if (!formData.phoneOtp) {
            toast.error("Please enter OTP");
            return;
        }

        axios.post(`${apiUrl}/auth/verify-reset-otp`, {
            email: formData.email,
            otp: formData.phoneOtp,
        })
            .then((res) => {
                if (res.data.success) {
                    toast.success("OTP verified!");
                    setStep(3);
                    localStorage.setItem("resetToken", res.data.data.resetToken);
                } else {
                    toast.error("Invalid OTP");
                }
            })
            .catch(() => toast.error("Failed to verify OTP"));
    };

    // ✅ Reset password
    const handleSubmit = () => {
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        axios.post(`${apiUrl}/auth/reset-password-with-token`, {
            resetToken: localStorage.setItem("resetToken"),
            newPassword: formData.password,
            confirmPassword: formData.confirmPassword
        })
        .then(() => {
            toast.success("Password reset successfully!");
            hideBtn();
            localStorage.removeItem("resetToken");
        })
        .catch(() => toast.error("Failed to reset password"));
    };

    const hideBtn = () => {
        onHide();
        setStep(1);
        setFormData({
            countryCode: "91",
            phoneNumber: "",
            phoneOtp: "",
            password: "",
            confirmPassword: "",
        })
    }

    return (
        <>
            <style>
                {`
  input::placeholder {
    color: #aaa; /* light gray */
    opacity: 1;  /* make sure it's visible */
  }
`}
            </style>
            <Modal show={show} onHide={hideBtn} centered>
                <div
                    style={{
                        background: "#0A0D2E",
                        color: "#fff",
                        borderRadius: "15px",
                        padding: "25px",
                    }}
                >
                    <ToastContainer />
                    <Modal.Header closeButton style={{ borderBottom: "none" }}>
                        <Modal.Title className="w-100 text-center text-white">
                            Forgot Password
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Step 1: Phone input */}
                        {step === 1 && (
                            <>
                                <CustomPhonenumberInputField
                                    formData={formData}
                                    setFormData={setFormData}
                                    errors={errors}
                                />
                                <button
                                    className="btn w-100 mt-3"
                                    onClick={handleSendOtp}
                                    disabled={otpTimer > 0}
                                    style={{
                                        background: "#00FF9C",
                                        border: "none",
                                        color: "#000",
                                        fontWeight: "600",
                                    }}
                                >
                                    {otpTimer > 0 ? `Resend in ${otpTimer}s` : "Send OTP"}
                                </button>
                            </>
                        )}

                        {/* Step 2: OTP */}
                        {step === 2 && (
                            <>
                                <input
                                    type="text"
                                    name="phoneOtp"
                                    value={formData.phoneOtp}
                                    onChange={handleChange}
                                    placeholder="Enter OTP"
                                    className={`form-control bg-transparent text-white mt-3 ${style.dark_input}`}
                                    style={{ border: "2px solid #6c757d" }}
                                />
                                <button
                                    className="btn w-100 mt-3"
                                    onClick={handleVerifyOtp}
                                    style={{
                                        background: "#00FF9C",
                                        border: "none",
                                        color: "#000",
                                        fontWeight: "600",
                                    }}
                                >
                                    Check OTP
                                </button>
                            </>
                        )}

                        {/* Step 3: Reset password */}
                        {step === 3 && (
                            <>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="New Password"
                                    className={`form-control bg-transparent text-white mb-3 ${style.dark_input}`}
                                    style={{ border: "2px solid #6c757d" }}
                                />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm Password"
                                    className={`form-control bg-transparent text-white mb-3 ${style.dark_input}`}
                                    style={{ border: "2px solid #6c757d" }}
                                />
                                <button
                                    className="btn w-100"
                                    onClick={handleSubmit}
                                    style={{
                                        background: "#00FF9C",
                                        border: "none",
                                        color: "#000",
                                        fontWeight: "600",
                                    }}
                                >
                                    Submit
                                </button>
                            </>
                        )}
                    </Modal.Body>
                </div>
            </Modal>
        </>
    );
};

export default ForgotPasswordModal;
