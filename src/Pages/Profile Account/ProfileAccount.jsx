
import React, { useState, useEffect } from "react";
import PageWrapper from "../../components/PageWrapper";
import "./profileAccount.css";
import ChangeProfileNameModal from "../../components/ChangeProfileNamePopup/ChangeProfileNamePopup";
import httpService from "../../helper/httpService";
import {
    showErrorToast,
    showSuccessToast,
} from "../../components/customToast/CustomToast";
import { useNavigate } from "react-router-dom";
import GoogleTranslate from "../../components/GoogleTranslate/GoogleTranslate";
import OTPVerificationModal from "../../components/OTPVerificationModal/OTPVerificationModal";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContextAPI";

const ProfileAccount = () => {
    const inputs = [
        { title: "Email", type: "email", id: "email" },
        { title: "Password", type: "password", id: "pass1" },
        { title: "Confirm Password", type: "password", id: "pass2" },
    ];

    const [showOtp, setShowOtp] = useState(false);
    const [details, setDetails] = useState({
        email: "",
        phone: "",
        pass1: "",
        pass2: "",
        lang: "en",
    });
    const [show, setShow] = useState(false);
    const [mainOtpCode, setMainOtpCode] = useState();
    const navigate = useNavigate();
    const [visiblePasswords, setVisiblePasswords] = useState({});

    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [language, setLanguage] = useState("en");

    const { user } = useAuth()

    console.log("sdsadad", user?.data?.user?.phone)






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
    const baseURL = import.meta.env.VITE_BASE_URL;


    const submitHandler = async (e) => {
        e.preventDefault();

        const savedLang = localStorage.getItem("selectedLanguage");
        const payload = {
            email: details?.email,
            siteLanguage: savedLang,
            ...(details?.pass2 && { password: details.pass2 }), // ✅ add password only if pass2 exists
        };

        if (!details.email) {
            showErrorToast("Please enter an email");
            return;
        }

        // ✅ Password + Confirm Password validation
        if (details.pass1 || details.pass2) {
            if (!details.pass1 || !details.pass2) {
                showErrorToast("Both password and confirm password are required");
                return;
            }
            if (details.pass1 !== details.pass2) {
                showErrorToast("Passwords must match");
                return;
            }
        }

        try {
            const token = localStorage.getItem("jwtToken");
            const response = await axios.put(
                `${baseURL}/account/info`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                setMainOtpCode(response?.data?.data?.code);
                showSuccessToast(response?.data?.message || "OTP sent successfully");
            } else {
                showErrorToast(
                    response?.data?.error?.[0]?.message || "Something went wrong"
                );
            }
        } catch (err) {
            showErrorToast(
                err?.response?.data?.error?.[0]?.message || "Failed to send OTP"
            );
        }
    };


    useEffect(() => {
        setDetails((prev) => ({
            ...prev,
            phone: user?.data?.user?.phone,
        }));
        if (showOtp) {
            //send otp
            httpService("/otp/request", "POST", {
                target: details?.phone,
                type: "password_reset",
            })
                .then((res) => {
                    console.log("qwetrt", res);
                    showSuccessToast(`Your OTP Code ${res?.data?.code}`);
                })
                .catch((err) => {
                    showErrorToast(
                        err?.response?.data?.message || "OTP verification failed ❌"
                    );
                });
        }
    }, [showOtp]);

    // OTP verification handler (from modal)
    const handleVerify = (otpCode) => {
        //verify otp
        httpService("/otp/verify", "POST", {
            target: details?.phone,
            code: otpCode,
            type: "password_reset",
        })
            .then((res) => {
                showSuccessToast(res?.message || "Phone verified successfully ✅");
                setIsPhoneVerified(true); // ✅ Enable Submit
            })
            .catch((err) => {
                showErrorToast(
                    err?.response?.data?.message || "OTP verification failed ❌"
                );
            });

        setShowOtp(false);
    };

    const handlenavigate = () => {
        navigate("/current-plan")
    }

    const togglePasswordVisibility = (id) => {
        setVisiblePasswords((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Fetch user data
    useEffect(() => {
        httpService("/auth/me", "GET")
            .then((res) => {
                setDetails((prev) => ({
                    ...prev,
                    email: res?.data?.email || "",
                    phone: res?.data?.phone,
                    lang: res?.data?.settings?.siteLanguage || "en",
                }));
                console.log("sasad", res)
            })
            .catch((err) => console.log(err));
    }, []);

    console.log("sadsadsad", details?.lang)

    return (
        <PageWrapper>
            <div className="container-fluid mt-5 pt-5 px-3 d-flex flex-column align-items-start justify-content-start gap-2 text-white">
                <div className="w-100 d-flex flex-column justify-content-center gap-5">
                    {/* Row 1 */}
                    <div className="row">
                        <div className="col-lg-7">
                            <h3>Account</h3>
                        </div>
                        <div
                            className="col-lg-5"
                            style={{ fontSize: "14px", margin: "auto" }}
                        >
                            <div className="d-flex gap-3 justify-content-end align-items-center">
                                <button
                                    className="custom-button py-1 px-5 rounded-5 border-0"
                                    onClick={handlenavigate}
                                >
                                    Subscription
                                </button>
                                <button
                                    className="py-1 px-4 rounded-5"
                                    style={{
                                        backgroundColor: "transparent",
                                        border: "1px solid #EC5252",
                                        color: "#EC5252",
                                    }}
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
                                <label
                                    className="form-label mb-0"
                                    htmlFor={field.id}
                                    style={{ fontSize: "14px", color: "#B0C3CC" }}
                                >
                                    {field.title}
                                </label>

                                <div className="d-flex mt-2 align-items-center position-relative w-100">
                                    <input
                                        type={
                                            field.type === "password" && visiblePasswords[field.id]
                                                ? "text"
                                                : field.type
                                        }
                                        className="form-control rounded-0 p-0 pb-2 border-top-0 border-start-0 border-end-0"
                                        id={field.id}
                                        name={field.id}
                                        style={{
                                            fontSize: "16px",
                                            color: "#B0C3CC",
                                            backgroundColor: "transparent",
                                            borderBottom: "2px solid #343A40",
                                        }}
                                        value={details[field.id] || ""}
                                        onChange={inputHandler}
                                    />

                                    {/* 👁️ Add eye toggle only for password fields */}
                                    {field.type === "password" && (
                                        <span
                                            className="position-absolute end-0 me-2"
                                            style={{ cursor: "pointer", color: "#B0C3CC" }}
                                            onClick={() => togglePasswordVisibility(field.id)}
                                        >
                                            {visiblePasswords[field.id] ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Row 3 */}
                    <div className="row">

                        <GoogleTranslate lang={details?.lang} />
                        <div className="col-lg-6" style={{ margin: "auto 20px" }}>
                            <div className="d-flex gap-4 justify-content-start align-items-center">


                                {!isPhoneVerified ? (
                                    <button
                                        onClick={() => setShowOtp(true)} // ✅ Open modal instead of direct verify
                                        className="custom-button py-1 px-5 rounded-5 border-0"
                                    >
                                        {isPhoneVerified ? "Verified ✅" : "Verify Phone"}
                                    </button>
                                ) : (
                                    <button
                                        onClick={submitHandler}
                                        className={`custom-button py-1 px-5 rounded-5 border-0 ${!isPhoneVerified ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                        disabled={!isPhoneVerified}
                                    >
                                        Submit
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Row 4 */}
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        {/* static info ... */}
                    </div>

                    <button
                        className="py-1 px-4 rounded-5"
                        style={{
                            backgroundColor: "transparent",
                            border: "1px solid #EC5252",
                            color: "#EC5252",
                            width: "172px",
                        }}
                    >
                        Delete Account
                    </button>
                </div>
            </div>

            <ChangeProfileNameModal
                show={show}
                onClose={() => setShow(false)}
                onRename={handleRename}
                isPhoneVerified={isPhoneVerified}
                setShowOtp={setShowOtp}
            />

            {/* ✅ OTP Modal for phone verification */}
            <OTPVerificationModal
                show={showOtp}
                onClose={() => setShowOtp(false)}
                onVerify={handleVerify}
            />


        </PageWrapper>
    );
};

export default ProfileAccount;
