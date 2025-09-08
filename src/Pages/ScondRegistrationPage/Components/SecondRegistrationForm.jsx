import { useRef, useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { FaCamera } from "react-icons/fa";
import "../SecondRegistrationPageCSS/SecondRegistrationPage.css";
import "./secondregistrationFormCss/style.css";
import ChoosePartnerGenderselector from "../../../components/ChoosePartnerGenderselector/ChoosePartnerGenderselector";

import { showSuccessToast, showErrorToast } from "../../../components/customToast/CustomToast"
import httpService from "../../../helper/httpService"
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RegistrationprofileImgUpload from "../../../components/registrationprofileImgUpload/RegistrationprofileImgUpload";

const SecondRegistrationForm = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        gender: "couple",
        sexuality: "",
        interestedIn: ["couple"],
        sexualityPartner: "",
        dobDay: "",
        dobMonth: "",
        dobYear: "",
        partnerDobDay: "",
        partnerDobMonth: "",
        partnerDobYear: "",
        dob: "",            // combined DOB string
        partnerDob: "",     // combined Partner DOB string
        street: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
        profileText: "",
        profileImage: null,
    });

    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const [loader, SetLoader] = useState(false)

    // Auto-update dob & partnerDob when fields change
    useEffect(() => {
        const { dobDay, dobMonth, dobYear, partnerDobDay, partnerDobMonth, partnerDobYear } = formData;

        const formatDob = (day, month, year) => {
            if (day && month && year) {
                return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
            }
            return "";
        };

        setFormData((prev) => ({
            ...prev,
            dob: formatDob(dobDay, dobMonth, dobYear),
            partnerDob: formatDob(partnerDobDay, partnerDobMonth, partnerDobYear),
        }));
    }, [
        formData.dobDay,
        formData.dobMonth,
        formData.dobYear,
        formData.partnerDobDay,
        formData.partnerDobMonth,
        formData.partnerDobYear,
    ]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleGenderChange = (gender) => {
        setFormData((prev) => ({
            ...prev,
            gender,
        }));
    };

    const handleLookingFor = (gender) => {
        setFormData((prev) => ({
            ...prev,
            interestedIn: gender,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
            setFormData((prev) => ({
                ...prev,
                profileImage: file, // store actual file
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        SetLoader(true);
        console.log("Form submitted:", formData);

        try {
            // ✅ Validation (same as before)
            const yearRegex = /^\d{4}$/;
            const day = parseInt(formData.dobDay, 10);
            const month = parseInt(formData.dobMonth, 10);
            const year = formData.dobYear;

            if (!yearRegex.test(year)) throw new Error("Your birth year must be 4 digits (YYYY).");
            if (day < 1 || day > 31) throw new Error("Day must be between 1 and 31.");
            if (month < 1 || month > 12) throw new Error("Month must be between 1 and 12.");

            // ✅ Age check
            const today = new Date();
            const userDob = new Date(`${year}-${month}-${day}`);
            const userAge =
                today.getFullYear() - userDob.getFullYear() -
                (today.getMonth() < userDob.getMonth() ||
                    (today.getMonth() === userDob.getMonth() && today.getDate() < userDob.getDate()) ? 1 : 0);
            if (userAge < 18) throw new Error("You must be at least 18 years old.");

            // ✅ Step 1: Upload image if exists
            let uploadedImageUrl = null;
            if (formData.profileImage) {
                const imageForm = new FormData();
                imageForm.append("file", formData.profileImage);
                imageForm.append("folder", "profiles");
                imageForm.append("optimize", true);
                imageForm.append("createThumbnail", true);

                const uploadRes = await httpService("/media/upload/single", "POST", imageForm, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                console.log("uploadRes", uploadRes)

                uploadedImageUrl = uploadRes?.data?.files?.thumbnail?.url || null;
                console.log("✅ Uploaded Image URL:", uploadedImageUrl);
            }

            // ✅ Step 2: Prepare final payload (send image URL, not file)
            const payload =
                formData.gender === "couple"
                    ? {
                        gender: formData.gender,
                        sexuality: formData.sexuality,
                        dateOfBirth: formData.dob,
                        interestedIn: formData.interestedIn,
                        address: {
                            street: formData.street,
                            city: formData.city,
                            state: formData.state,
                            country: formData.country,
                            zipcode: formData.zipcode,
                        },
                        partner: {
                            dateOfBirth: formData.partnerDob,
                            sexuality: formData.sexualityPartner,
                        },
                        bio: formData.profileText,
                        mainPhoto: uploadedImageUrl, // use uploaded url
                    }
                    : {
                        gender: formData.gender,
                        sexuality: formData.sexuality,
                        dateOfBirth: formData.dob,
                        interestedIn: formData.interestedIn,
                        address: {
                            street: formData.street,
                            city: formData.city,
                            state: formData.state,
                            country: formData.country,
                            zipcode: formData.zipcode,
                        },
                        bio: formData.profileText,
                        mainPhoto: uploadedImageUrl, // use uploaded url
                    };

            // ✅ Step 3: Update onboarding
            const response = await httpService(`/onboarding/update`, "PUT", payload);

            if (response?.message) {
                showSuccessToast(response.message);
                // navigate("/feed");
            } else {
                showErrorToast("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.error(err);
            const errorMsg =
                err?.response?.data?.error?.[0]?.message ||
                err?.response?.data?.message ||
                err?.message ||
                "An unexpected error occurred.";
            showErrorToast(errorMsg);
        } finally {
            SetLoader(false);
        }
    };



    return (
        <div className="container py-5 text-white" style={{ maxWidth: "500px" }}>
            <ToastContainer />
            <div className="card text-white p-4 rounded-4" style={{ backgroundColor: "var(--color-border)" }}>
                <form onSubmit={handleSubmit}>

                    {/* Gender Buttons */}
                    <div className="mb-3">You are a <span>*</span></div>
                    <div className="d-flex flex-wrap gap-2 gap-lg-3 mb-3">
                        {["couple", "female", "male", "trans"].map((gender) => (
                            <button
                                key={gender}
                                type="button"
                                className="btn px-4 py-2 rounded-2 fw-medium"
                                style={{
                                    backgroundColor:
                                        formData.gender === gender
                                            ? "var(--color-primary-green)"
                                            : "var(--color-background)",
                                    color:
                                        formData.gender === gender
                                            ? "black"
                                            : "var(--color-primary-green)",
                                    border: "1px solid var(--color-primary-green)",
                                }}
                                onClick={() => handleGenderChange(gender)}
                            >
                                {gender}
                            </button>
                        ))}
                    </div>

                    {/* Sexuality */}
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Sexuality *</Form.Label>
                            <Form.Select
                                name="sexuality"
                                value={formData.sexuality}
                                onChange={handleInputChange}
                                className="border-secondary border-2 border-top-0 border-start-0 border-end-0 rounded-0"
                                style={{ backgroundColor: "var(--color-border)", color: "#b0c3cc" }}
                            >
                                <option value="">Select...</option>
                                <option value="straight">Straight</option>
                                <option value="bi-sexual">Bi-sexual</option>
                                <option value="bi-curious">Bi-curious</option>
                                <option value="gay">Gay</option>
                                <option value="pansexual">Pansexual</option>
                            </Form.Select>
                        </Col>
                        {formData.gender === "couple" && (
                            <Col>
                                <Form.Label>Partner Sexuality *</Form.Label>
                                <Form.Select
                                    name="sexualityPartner"
                                    value={formData?.partner?.sexualityPartner}
                                    onChange={handleInputChange}
                                    className="border-secondary border-2 border-top-0 border-start-0 border-end-0 rounded-0"
                                    style={{ backgroundColor: "var(--color-border)", color: "#b0c3cc" }}
                                >
                                    <option value="">Select...</option>
                                    <option value="straight">Straight</option>
                                    <option value="bi-sexual">Bi-sexual</option>
                                    <option value="bi-curious">Bi-curious</option>
                                    <option value="gay">Gay</option>
                                    <option value="pansexual">Pansexual</option>
                                </Form.Select>
                            </Col>
                        )}
                    </Row>

                    {/* Date of Birth */}
                    <div className="mb-3">
                        <label className="form-label text-white">Date of Birth *</label>
                        <div className="d-flex gap-3">
                            <Form.Control
                                type="text"
                                name="dobDay"
                                value={formData.dobDay}
                                onChange={handleInputChange}
                                placeholder="DD"
                                maxLength={2}
                                className="text-center bg-transparent text-white border border-secondary rounded py-2"
                                style={{ width: "80px" }}
                            />
                            <Form.Control
                                type="text"
                                name="dobMonth"
                                value={formData.dobMonth}
                                onChange={handleInputChange}
                                placeholder="MM"
                                maxLength={2}
                                className="text-center bg-transparent text-white border border-secondary rounded py-2"
                                style={{ width: "80px" }}
                            />
                            <Form.Control
                                type="text"
                                name="dobYear"
                                value={formData.dobYear}
                                onChange={handleInputChange}
                                placeholder="YYYY"
                                maxLength={4}
                                className="text-center bg-transparent text-white border border-secondary rounded py-2"
                                style={{ width: "100px" }}
                            />
                        </div>
                        <small className="text-info">Final DOB: {formData.dob || "N/A"}</small>
                    </div>

                    {/* Partner DOB */}
                    {formData.gender === "couple" && (
                        <div className="mb-3">
                            <label className="form-label text-white">Partner Date of Birth *</label>
                            <div className="d-flex gap-3">
                                <Form.Control
                                    type="text"
                                    name="partnerDobDay"
                                    value={formData.partnerDobDay}
                                    onChange={handleInputChange}
                                    placeholder="DD"
                                    maxLength={2}
                                    className="text-center bg-transparent text-white border border-secondary rounded py-2"
                                    style={{ width: "80px" }}
                                />
                                <Form.Control
                                    type="text"
                                    name="partnerDobMonth"
                                    value={formData.partnerDobMonth}
                                    onChange={handleInputChange}
                                    placeholder="MM"
                                    maxLength={2}
                                    className="text-center bg-transparent text-white border border-secondary rounded py-2"
                                    style={{ width: "80px" }}
                                />
                                <Form.Control
                                    type="text"
                                    name="partnerDobYear"
                                    value={formData.partnerDobYear}
                                    onChange={handleInputChange}
                                    placeholder="YYYY"
                                    maxLength={4}
                                    className="text-center bg-transparent text-white border border-secondary rounded py-2"
                                    style={{ width: "100px" }}
                                />
                            </div>
                            <small className="text-info">Partner DOB: {formData.partnerDob || "N/A"}</small>
                        </div>
                    )}

                    {/* Partner Gender Selector */}
                    <ChoosePartnerGenderselector handleLookingFor={handleLookingFor} />

                    {/* Address */}
                    <Form.Group className="mb-3">
                        <Form.Label>Street address</Form.Label>
                        <Form.Control
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleInputChange}
                            className="bg-transparent text-white border-0 border-bottom border-2 border-secondary rounded-0"
                        />
                    </Form.Group>

                    <Row className="mb-3">
                        <Col>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className="bg-transparent text-white border-0 border-bottom border-2 border-secondary rounded-0"
                            />
                        </Col>
                        <Col>
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                className="bg-transparent text-white border-0 border-bottom border-2 border-secondary rounded-0"
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                className="bg-transparent text-white border-0 border-bottom border-2 border-secondary rounded-0"
                            />
                        </Col>
                        <Col>
                            <Form.Label>Zipcode</Form.Label>
                            <Form.Control
                                type="text"
                                name="zipcode"
                                value={formData.zipcode}
                                onChange={handleInputChange}
                                className="bg-transparent text-white border-0 border-bottom border-2 border-secondary rounded-0"
                            />
                        </Col>
                    </Row>

                    {/* Profile Text */}
                    <Form.Group className="mb-3">
                        <Form.Label>Profile Text *</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="profileText"
                            value={formData.profileText}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="Steal the spotlight..."
                            className="text-white"
                            style={{ backgroundColor: "var(--color-border)" }}
                        />
                    </Form.Group>

                    {/* Image Upload */}
                    <Form.Group className="mb-3">
                        <Form.Label>Main Profile Picture *</Form.Label>
                        <label
                            htmlFor="photo-upload"
                            className="d-flex flex-column align-items-center justify-content-center text-white rounded-3 position-relative overflow-hidden"
                            style={{
                                width: "110px",
                                height: "110px",
                                cursor: "pointer",
                                backgroundColor: "var(--color-background)",
                                border: "2px solid var(--color-primary-green)",
                            }}
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-100 h-100"
                                    style={{ objectFit: "cover" }}
                                />
                            ) : (
                                <>
                                    <FaCamera size={32} className="mb-2 text-secondary" />
                                    <span className="small">Add Photos</span>
                                </>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                id="photo-upload"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                            />
                        </label>
                    </Form.Group>

                    <div className="d-grid mt-2">
                        <Button
                            type="submit"
                            className="btn-member"
                            size="lg"
                            style={{ backgroundColor: "var(--color-primary-green)" }}
                        >
                            Become a member!
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SecondRegistrationForm;
