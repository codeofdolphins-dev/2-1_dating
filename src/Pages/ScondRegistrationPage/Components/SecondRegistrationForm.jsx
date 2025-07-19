import { useRef, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { FaCamera } from "react-icons/fa";
import "../SecondRegistrationPageCSS/SecondRegistrationPage.css"; // Optional: for custom styles
import "./secondregistrationFormCss/style.css"
import CustomDropdown from "./CustomDropDown";

import couple from "../Images/couple.png"
import female from "../Images/female.png"
import male from "../Images/male.png"
import transgender from "../Images/transgender.png"




const SecondRegistrationForm = () => {
    const [selectedGender, setSelectedGender] = useState("Couple");
    const [lookingFor, setLookingFor] = useState(["Couple"]);
    const selectRef = useRef(null);

    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
        }
    };

    const handleToggleLookingFor = (type) => {
        setLookingFor(prev =>
            prev.includes(type) ? prev.filter(item => item !== type) : [...prev, type]
        );
    };




    return (
        <div className="container py-5 text-white" style={{ maxWidth: "500px" }}>
            <div className="card text-white p-4 rounded-4" style={{ backgroundColor: "var(--color-border)" }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <label className="form-label fw-semibold">You are a <span className="text-white">*</span></label>
                    <a href="#" className="small text-white">Business signup</a>
                </div>

                {/* Gender Buttons */}
                <div className="d-flex flex-wrap gap-2 gap-lg-3 mb-3">
                    {["Couple", "Female", "Male", "Trans"].map((gender) => (
                        <button
                            key={gender}
                            type="button"
                            className="btn px-4 py-2 rounded-2 fw-medium"
                            style={{
                                backgroundColor:
                                    selectedGender === gender
                                        ? "var(--color-primary-green)"
                                        : "var(--color-background)",
                                color:
                                    selectedGender === gender
                                        ? "black"
                                        : "var(--color-primary-green)",
                                border: "1px solid var(--color-primary-green)",
                            }}
                            onClick={() => setSelectedGender(gender)}
                        >
                            {gender}
                        </button>
                    ))}
                </div>




                {/* Sexuality */}
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Sexuality</Form.Label>
                        <div className="row" style={{ color: "#b0c3cc" }}>
                            <div className="col-lg-6 c">
                                <div className="position-relative">
                                    <Form.Select
                                        ref={selectRef}
                                        className=" border-secondary border-2 border-top-0 border-start-0 border-end-0 rounded-0 pe-5"
                                        style={{
                                            backgroundColor: 'var(--color-border)',
                                            appearance: 'none',
                                            WebkitAppearance: 'none',
                                            MozAppearance: 'none',
                                            paddingRight: '2.5rem',
                                            color: '#b0c3cc'
                                        }}
                                        aria-label="Default select example"
                                    >
                                        <option>Straight</option>
                                        <option value="1">Bi-sexual</option>
                                        <option value="2">Bi-curious</option>
                                        <option value="3">Gay</option>
                                        <option value="4">Pansexual</option>
                                    </Form.Select>

                                    {/* Custom dropdown arrow */}

                                </div>
                            </div>
                            {
                                selectedGender ==="Couple" && <div className="col-lg-6 c">
                                <div className="position-relative">
                                    <Form.Select
                                        ref={selectRef}
                                        className="border-secondary border-2 border-top-0 border-start-0 border-end-0 rounded-0 pe-5"
                                        style={{
                                            backgroundColor: 'var(--color-border)',
                                            appearance: 'none',
                                            WebkitAppearance: 'none',
                                            MozAppearance: 'none',
                                            paddingRight: '2.5rem',
                                            color: '#b0c3cc'
                                        }}
                                        aria-label="Default select example"
                                    >
                                        <option>Straight</option>
                                        <option value="1">Bi-sexual</option>
                                        <option value="2">Bi-curious</option>
                                        <option value="3">Gay</option>
                                        <option value="4">Pansexual</option>
                                    </Form.Select>

                                    {/* Custom dropdown arrow */}

                                </div>
                            </div>
                            }
                            
                        </div>
                    </Col>
                </Row>

                {/* Date Of Birth */}
                <Col className="mb-2">
                    <div>
                        <div className="row"></div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-white">Date of Birth</label>
                        <div className="d-flex gap-3">
                            <Form.Control
                                type="text"
                                maxLength={2}
                                placeholder="DD"
                                className="text-center bg-transparent text-white border border-secondary rounded py-2 custom-placeholder"
                                style={{ width: "80px", boxShadow: "none" }}
                            />
                            <Form.Control
                                type="text"
                                maxLength={2}
                                placeholder="MM"
                                className="text-center bg-transparent text-white border border-secondary rounded py-2 custom-placeholder"
                                style={{ width: "80px", boxShadow: "none" }}
                            />
                            <Form.Control
                                type="text"
                                maxLength={4}
                                placeholder="YYYY"
                                className="text-center bg-transparent text-white border border-secondary rounded py-2 custom-placeholder"
                                style={{ width: "100px", boxShadow: "none" }}
                            />
                        </div>
                    </div>

                    {
                         selectedGender ==="Couple" && <div className="mb-3">
                        <label className="form-label text-white">Date of Birth</label>
                        <div className="d-flex gap-3">
                            <Form.Control
                                type="text"
                                maxLength={2}
                                placeholder="DD"
                                className="text-center bg-transparent text-white border border-secondary rounded py-2 custom-placeholder"
                                style={{ width: "80px", boxShadow: "none" }}
                            />
                            <Form.Control
                                type="text"
                                maxLength={2}
                                placeholder="MM"
                                className="text-center bg-transparent text-white border border-secondary rounded py-2 custom-placeholder"
                                style={{ width: "80px", boxShadow: "none" }}
                            />
                            <Form.Control
                                type="text"
                                maxLength={4}
                                placeholder="YYYY"
                                className="text-center bg-transparent text-white border border-secondary rounded py-2 custom-placeholder"
                                style={{ width: "100px", boxShadow: "none" }}
                            />
                        </div>
                    </div>
                    }

                    
                </Col>

                {/* Looking For */}
                <Form.Group className="mb-4">
                    <Form.Label className="py-2">Looking for (choose 1 or more)</Form.Label>
                    <div className="d-flex gap-3 flex-wrap">
                        {[
                            { label: "Couple", icon: couple, isImage: true },
                            { label: "Female", icon: female, isImage: true },
                            { label: "Male", icon: male, isImage: true },
                            { label: "Transgender", icon: transgender, isImage: true },
                        ].map(({ label, icon, isImage }) => {
                            const isSelected = lookingFor.includes(label);
                            return (
                                <button
                                    key={label}
                                    type="button"
                                    onClick={() => handleToggleLookingFor(label)}
                                    className="d-flex flex-column align-items-center justify-content-center p-3 rounded-3 "
                                    style={{
                                        width: "92px",
                                        height: "92px",
                                        backgroundColor: isSelected
                                            ? "var(--color-primary-green)"
                                            : "var(--color-background)",
                                        color: isSelected ? "black" : "var(--color-primary-green)",
                                        border: "2px solid var(--color-primary-green)",
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    {isImage && (
                                        <img
                                            src={icon}
                                            alt={label}
                                            style={{ height: "50px", marginBottom: "2px" }}
                                        />
                                    )}
                                    <div className="small">{label}</div>
                                </button>
                            );
                        })}
                    </div>
                </Form.Group>





                {/* Address Fields */}
                <Form.Group className="mb-3">
                    <Form.Label>Street address</Form.Label>
                    <Form.Control
                        type="text"
                        className="bg-transparent text-white border-0 border-bottom border-2 border-secondary rounded-0 shadow-none "
                        style={{
                            boxShadow: 'none',
                        }}
                    />

                </Form.Group>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" className="bg-transparent text-white border-0 border-bottom border-2 border-secondary rounded-0 shadow-none" />
                    </Col>
                    <Col>
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" className="bg-transparent text-white border-0 border-bottom border-2 border-secondary rounded-0 shadow-none" />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" className="bg-transparent text-white border-0 border-bottom border-2 border-secondary rounded-0 shadow-none" />
                    </Col>
                    <Col>
                        <Form.Label>Zipcode</Form.Label>
                        <Form.Control type="text" className="bg-transparent text-white border-0 border-bottom border-2 border-secondary rounded-0 shadow-none" />
                    </Col>
                </Row>

                {/* Profile Text */}
                <Form.Group className="mb-3">
                    <Form.Label>Profile Text</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Steal the spotlight..."
                        className=" text-white custom-placeholder"
                        style={{ backgroundColor: "var(--color-border)", }}
                    />
                </Form.Group>

                {/* Image Upload */}
                <Form.Group className="mb-3">
                    <Form.Label>Main Profile Picture</Form.Label>
                    <label
                        htmlFor="photo-upload"
                        className="d-flex flex-column align-items-center justify-content-center text-white rounded-3 position-relative overflow-hidden"
                        style={{ width: "110px", height: "110px", cursor: "pointer", backgroundColor: "var(--color-background)", border: "2px solid var(--color-primary-green)" }}
                    >
                        {preview ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-100 h-100 object-fit-cover"
                                style={{ objectFit: 'cover' }}
                            />
                        ) : (
                            <>
                                <FaCamera size={32} className="mb-2 text-secondary" />
                                <span className="small">Add Photos</span>
                                <span
                                    className="position-absolute top-0 mt-3 end-0 translate-middle badge rounded-circle bg-danger d-flex align-items-center justify-content-center"
                                    style={{ width: "20px", height: "20px", fontSize: "14px" }}
                                >
                                    <span className="text-black">+</span>
                                </span>
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

                    <small className="text-white d-block mt-3">
                        • Only upload a clear photo of your face.<br />
                        • No nudity or explicit content is allowed.<br />
                        • Photos must feature a human face only.<br />
                        • Avoid group photos, illustrations, or avatars.
                    </small>
                </Form.Group>

                <div className="d-grid mt-2">
                    <Button variant="" className="btn-member" size="lg" style={{ backgroundColor: "var(--color-primary-green)" }}>Become a member!</Button>
                </div>
                <div className="text-center mt-2">
                    <a href="#" className="text-decoration-underline  small" style={{ color: "#b6b6b6" }}>Add a promo code</a>
                </div>
            </div>
        </div>
    );
};

export default SecondRegistrationForm;
