import React, { useState, useRef, useEffect } from "react";
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

const ProfileAccount = () => {
    const inputs = [
        { title: "Email", type: "email", id: "email" },
        { title: "Password", type: "password", id: "pass1" },
        { title: "Confirm Password", type: "password", id: "pass2" },
    ];

    const [details, setDetails] = useState({
        email: "",
        pass1: "",
        pass2: "",
        lang: "en",
    });

    const [show, setShow] = useState(false);

    const navigate = useNavigate();


    // ✅ rename handler
    const handleRename = async (newName) => {
        const parts = newName.trim().split(/\s+/);
        let firstName = "";
        let lastName = "";

        if (parts.length === 1) {
            firstName = parts[0];
        } else if (parts.length === 2) {
            firstName = parts[0];
            lastName = parts[1];
        } else if (parts.length >= 3) {
            firstName = parts[0];
            lastName = parts.slice(1).join(" ");
        }

        try {
            const res = await httpService("/profile", "PUT");
            console.log("userName updated", res);
            showSuccessToast(res?.message);
        } catch (err) {
            console.log("userName update failed", err);
            showErrorToast(err?.response?.message);
        }

        return { firstName, lastName };
    };

    // ✅ input handler
    // ✅ input handler (only updates state, no language change)
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ✅ submit handler now uses details.lang
    const submitHandler = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", details);

    };

    const handlenavigate = () => {
        navigate("/subscription");
    };

    console.log("details", details);



    return (
        <PageWrapper>
            <div className="container-fluid mt-5 pt-5 px-3 d-flex flex-column align-items-start justify-content-start gap-2 text-white">
                <div className="w-100 d-flex flex-column justify-content-center gap-5">
                    {/* row 1 */}
                    <div className="row">
                        <div className="col-lg-7">
                            <h3>account</h3>
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
                                    subscription
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
                                    changeName
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* row 2 */}
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
                                <div className="d-flex mt-2">
                                    <input
                                        type={field.type}
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
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* row 3 */}
                    <div className="row">
                        {/* <div
                            className="col-lg-4"
                            style={{ borderBottom: "2px solid #343A40" }}
                        >
                            <label
                                className="form-label mb-0"
                                htmlFor="lang"
                                style={{ fontSize: "14px", color: "#B0C3CC" }}
                            >
                                Select site language
                            </label>
                            <div className="d-flex mt-2 align-items-center position-relative w-100">
                                <select
                                    id="lang"
                                    name="lang"
                                    className="form-control rounded-0 border-0 p-0 pb-2"
                                    style={{
                                        fontSize: "16px",
                                        color: "#B0C3CC",
                                        backgroundColor: "var(--color-background)",
                                        appearance: "none",
                                        cursor: "pointer",
                                    }}
                                    value={details.lang}
                                    onChange={inputHandler}
                                    ref={langSelectRef}
                                    onFocus={(e) => {
                                        e.target.style.outline = "none";
                                        e.target.style.border = "none";
                                        e.target.style.boxShadow = "none";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.outline = "none";
                                        e.target.style.border = "none";
                                        e.target.style.boxShadow = "none";
                                    }}
                                >
                                    <option value="en">English</option>
                                    <option value="nl">Nederlands</option>
                                    <option value="de">Deutsch</option>
                                    <option value="fr">Français</option>
                                    <option value="es">Español</option>
                                    <option value="it">Italiano</option>
                                    <option value="pt">Português</option>
                                </select>
                                <i
                                    className="bi bi-chevron-down ms-2"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        langSelectRef.current &&
                                        langSelectRef.current.focus()
                                    }
                                ></i>
                            </div>
                        </div> */}

                        <GoogleTranslate targetLang={details?.lang} />

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

                    {/* row 4 */}
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div className="d-flex flex-column">
                            <p className="mb-0" style={{ fontSize: "16px" }}>
                                Joined
                            </p>
                            <p
                                className="mb-0 fw-light"
                                style={{ fontSize: "14px", opacity: "0.5" }}
                            >
                                Oct 07, 2022
                            </p>
                        </div>
                        <div className="d-flex flex-column">
                            <p className="mb-0" style={{ fontSize: "16px" }}>
                                Last renewal
                            </p>
                            <p
                                className="mb-0 fw-light"
                                style={{ fontSize: "14px", opacity: "0.5" }}
                            >
                                Nov 13, 2024
                            </p>
                        </div>
                        <div className="d-flex flex-column">
                            <p className="mb-0" style={{ fontSize: "16px" }}>
                                Membership
                            </p>
                            <p
                                className="mb-0 fw-light"
                                style={{ fontSize: "14px", opacity: "0.5" }}
                            >
                                Lifetime Membership
                            </p>
                        </div>
                        <div className="d-flex flex-column">
                            <p className="mb-0" style={{ fontSize: "16px" }}>
                                Expire / Renew date
                            </p>
                            <p
                                className="mb-0 fw-light"
                                style={{ fontSize: "14px", opacity: "0.5" }}
                            >
                                Never
                            </p>
                        </div>
                        <div className="d-flex flex-column">
                            <p className="mb-0" style={{ fontSize: "16px" }}>
                                Days until expiration/renew
                            </p>
                            <p
                                className="mb-0 fw-light"
                                style={{ fontSize: "14px", opacity: "0.5" }}
                            >
                                9875 Days
                            </p>
                        </div>
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
            />

            
        </PageWrapper>
    );
};

export default ProfileAccount;
