import React, { useState, useEffect } from "react";
import PageWrapper from "../../components/PageWrapper";
import "./profileAccount.css";
import ChangeProfileNameModal from "../../components/ChangeProfileNamePopup/ChangeProfileNamePopup";
import httpService from "../../helper/httpService";
import { showErrorToast, showSuccessToast } from "../../components/customToast/CustomToast";
import { useNavigate } from "react-router-dom";
import GoogleTranslate from "../../components/GoogleTranslate/GoogleTranslate";
import OTPVerificationModal from "../../components/OTPVerificationModal/OTPVerificationModal";
import axios from "axios";

const ProfileAccount = () => {
    const inputs = [
        { title: "Email", type: "email", id: "email" },
        { title: "Password", type: "password", id: "pass1" },
        { title: "Confirm Password", type: "password", id: "pass2" },
    ];

    const [showOtp, setShowOtp] = useState(false);
    const [details, setDetails] = useState({
        email: "",
        pass1: "",
        pass2: "",
        lang: "en",
    });
    const [show, setShow] = useState(false);
    const [mainOtpCode, setMainOtpCode] = useState()
    const navigate = useNavigate();

    // Rename handler
    const handleRename = async (newName) => {
        const parts = newName.trim().split(/\s+/);
        let firstName = parts[0] || "";
        let lastName = parts.slice(1).join(" ") || "";

        try {
            const res = await httpService("/profile", "PUT", { firstName, lastName });
            showSuccessToast(res?.message || "Name updated successfully");
        } catch (err) {
            showErrorToast(err?.response?.message || "Failed to update name");
        }

        return { firstName, lastName };
    };

    // Input handler
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Submit handler

    const baseURL = import.meta.env.VITE_BASE_URL; // 🔹 Replace with your actual base URL


    const submitHandler = async (e) => {
        e.preventDefault();

        if (!details.email) {
            showErrorToast("Please enter an email");
            return;
        }

        try {
            const token = localStorage.getItem("jwtToken"); // 🔹 Or wherever you store your auth token
            const response = await axios.put(
                `${baseURL}/account/unified`,
                {
                    email: details?.email,
                    password: details?.pass2,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // 🔹 Add token
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                console.log("qqqq", response);
                setMainOtpCode(response?.data?.data?.code);
                showSuccessToast(response?.data?.message || "OTP sent successfully");
                // showSuccessToast(`Your OTP is: ${response?.data?.data?.code}`);
            } else {
                console.warn("Unexpected response:", response);
                showErrorToast(
                    response?.data?.error?.[0]?.message || "Something went wrong"
                );
            }
        } catch (err) {
            console.error("Error:", err?.response?.data);
            showErrorToast(
                err?.response?.data?.error[0]?.message || "Failed to send OTP"
            );
        }
    };


    // OTP verification handler
    const handleVerify = (otpCode) => {
        // Display OTP in toast


        // Optional: send OTP to backend for verification
        httpService("/account/email", "PUT", { email: details?.email, otpCode })
            .then((res) => {
                showSuccessToast(res?.message || "Email verified successfully");
            })
            .catch((err) => {
                showErrorToast(err?.response?.data?.message || "OTP verification failed");
            });

        setShowOtp(false);
    };

    const handlenavigate = () => navigate("/subscription");

    // Fetch user data
    useEffect(() => {
        httpService("/auth/me", "GET")
            .then((res) => {
                console.log("qwert", res)
                setDetails((prev) => ({
                    ...prev,
                    email: res?.data?.email || "",
                    lang: res?.data?.lang || "en",
                }));
            })
            .catch((err) => console.log(err));
    }, []);

    console.log("asdasdasd", details?.lang)

    return (
        <PageWrapper>
            <div className="container-fluid mt-5 pt-5 px-3 d-flex flex-column align-items-start justify-content-start gap-2 text-white">
                <div className="w-100 d-flex flex-column justify-content-center gap-5">
                    {/* Row 1 */}
                    <div className="row">
                        <div className="col-lg-7">
                            <h3>Account</h3>
                        </div>
                        <div className="col-lg-5" style={{ fontSize: "14px", margin: "auto" }}>
                            <div className="d-flex gap-3 justify-content-end align-items-center">
                                <button
                                    className="custom-button py-1 px-5 rounded-5 border-0"
                                    onClick={handlenavigate}
                                >
                                    Subscription
                                </button>
                                <button
                                    className="py-1 px-4 rounded-5"
                                    style={{ backgroundColor: "transparent", border: "1px solid #EC5252", color: "#EC5252" }}
                                    onClick={() => setShow(true)}
                                >
                                    Change Name
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="row">
                        {inputs.map((field, i) => (
                            <div className="col-lg-4" key={i}>
                                <label className="form-label mb-0" htmlFor={field.id} style={{ fontSize: "14px", color: "#B0C3CC" }}>
                                    {field.title}
                                </label>
                                <div className="d-flex mt-2">
                                    <input
                                        type={field.type}
                                        className="form-control rounded-0 p-0 pb-2 border-top-0 border-start-0 border-end-0"
                                        id={field.id}
                                        name={field.id}
                                        style={{ fontSize: "16px", color: "#B0C3CC", backgroundColor: "transparent", borderBottom: "2px solid #343A40" }}
                                        value={details[field.id] || ""}
                                        onChange={inputHandler}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Row 3 */}
                    <div className="row">
                        <GoogleTranslate targetLang={details.lang} />

                        <div className="col-lg-4" style={{ margin: "auto 20px" }}>
                            <div className="d-flex justify-content-start align-items-center">
                                <button
                                    onClick={submitHandler}
                                    className="custom-button py-1 px-5 rounded-5 border-0"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Row 4 */}
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div className="d-flex flex-column">
                            <p className="mb-0" style={{ fontSize: "16px" }}>Joined</p>
                            <p className="mb-0 fw-light" style={{ fontSize: "14px", opacity: "0.5" }}>Oct 07, 2022</p>
                        </div>
                        <div className="d-flex flex-column">
                            <p className="mb-0" style={{ fontSize: "16px" }}>Last renewal</p>
                            <p className="mb-0 fw-light" style={{ fontSize: "14px", opacity: "0.5" }}>Nov 13, 2024</p>
                        </div>
                        <div className="d-flex flex-column">
                            <p className="mb-0" style={{ fontSize: "16px" }}>Membership</p>
                            <p className="mb-0 fw-light" style={{ fontSize: "14px", opacity: "0.5" }}>Lifetime Membership</p>
                        </div>
                        <div className="d-flex flex-column">
                            <p className="mb-0" style={{ fontSize: "16px" }}>Expire / Renew date</p>
                            <p className="mb-0 fw-light" style={{ fontSize: "14px", opacity: "0.5" }}>Never</p>
                        </div>
                        <div className="d-flex flex-column">
                            <p className="mb-0" style={{ fontSize: "16px" }}>Days until expiration/renew</p>
                            <p className="mb-0 fw-light" style={{ fontSize: "14px", opacity: "0.5" }}>9875 Days</p>
                        </div>
                    </div>

                    <button
                        className="py-1 px-4 rounded-5"
                        style={{ backgroundColor: "transparent", border: "1px solid #EC5252", color: "#EC5252", width: "172px" }}
                    >
                        Delete Account
                    </button>
                </div>
            </div>

            <ChangeProfileNameModal
                show={show}
                onClose={() => setShow(false)}
                onRename={handleRename}
            />

            <OTPVerificationModal
                show={showOtp}
                onClose={() => setShowOtp(false)}
                onVerify={handleVerify}
            />
        </PageWrapper>
    );
};

export default ProfileAccount;
