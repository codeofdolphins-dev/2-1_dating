import React, { useEffect, useState } from "react";
import "../BusinessProfileCss/BusinessProfile.css";
import axios from "axios";
import "./dropdownStyle.css"
import httpService from "../../../helper/httpService"
import { showErrorToast, showSuccessToast } from "../../../components/customToast/CustomToast";
import { ToastContainer } from "react-toastify";

const BusinessProfileForm = () => {
    const goalMapping = {
        "Promote events / parties": "promoteEvents",
        "Build an audience / community": "buildAudience",
        "Promote your club": "promoteClub",
        "Promote your BNB / Hotel / Resort": "promoteBnbHotel",
        "Sell a product / service": "sellProduct",
        "Interest in paid advertising": "paidAdvertising",
    };

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        companyName: "",
        location: {
            country: "",
            state: "",
        },
        webUrl: "",
        isMember: false, // boolean
        goals: {
            promoteEvents: false,
            buildAudience: false,
            promoteClub: false,
            promoteBnbHotel: false,
            sellProduct: false,
            paidAdvertising: false,
        },
        referralSource: "",
        additionalInfo: "",
    });

    // handle text / select
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // handle radio for boolean
    const handleMembership = (value) => {
        setFormData((prev) => ({
            ...prev,
            isMember: value,
        }));
    };

    // handle checkboxes
    // handle checkboxes
    const handleCheckbox = (option) => {
        const key = goalMapping[option];
        setFormData((prev) => ({
            ...prev,
            goals: {
                ...prev.goals,
                [key]: !prev.goals[key], // toggle true/false
            },
        }));
    };

    // Fetch country 
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await axios.get("https://countriesnow.space/api/v0.1/countries/positions");
                setCountries(res.data.data); // API returns { name, iso2, iso3, lat, long }
                // setFormData((prev) => ({
                //     ...prev,
                //     country: value,
                // }));

            } catch (err) {
                console.error("Error fetching countries:", err);
            }
        };
        fetchCountries();
    }, []);

    // Fetch states when country changes
    // ✅ FIX: handle country change updates nested location
    const handleCountryChange = async (e) => {
        const selectedCountry = e.target.value;

        setFormData((prev) => ({
            ...prev,
            location: {
                ...prev.location,
                country: selectedCountry,
                state: "", // reset state when country changes
            },
        }));

        try {
            const res = await axios.post(
                "https://countriesnow.space/api/v0.1/countries/states",
                {
                    country: selectedCountry,
                }
            );
            setStates(res.data.data.states);
        } catch (err) {
            console.error("Error fetching states:", err);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // --- Validation Checks ---
        if (!formData.firstName.trim()) return showErrorToast("First name is required");
        if (!formData.lastName.trim()) return showErrorToast("Last name is required");
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            return showErrorToast("Enter a valid email address");
        }
        if (!formData.phoneNumber.trim() || formData.phoneNumber.length < 7) {
            return showErrorToast("Enter a valid phone number");
        }
        if (!formData.companyName.trim()) return showErrorToast("Company name is required");

        if (!formData.location.country) return showErrorToast("Please select a country");
        if (!formData.location.state) return showErrorToast("Please select a state");

        // At least one goal must be true
        const hasGoal = Object.values(formData.goals).some((val) => val === true);
        if (!hasGoal) return showErrorToast("Please select at least one goal");

        // --- Submit Data ---
        console.log("Form Submitted ✅", formData);
        try {
            const response = await httpService(`/business-request`, "POST", formData);
            if (response) {
                console.log(response);
                showSuccessToast(response?.message);

                // reset form after success
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    companyName: "",
                    location: { country: "", state: "" },
                    webUrl: "",
                    isMember: false,
                    goals: {
                        promoteEvents: false,
                        buildAudience: false,
                        promoteClub: false,
                        promoteBnbHotel: false,
                        sellProduct: false,
                        paidAdvertising: false,
                    },
                    referralSource: "",
                    additionalInfo: "",
                });
            }
        } catch (err) {
            console.log(err);
            showErrorToast(err?.response?.data?.error[0]?.message || "Something went wrong");
        }
    };



    return (
        <>
            <div className="container my-5 text-white">
                <h3 className="mb-4 fw-bold">REQUEST YOUR 2+1 BUSINESS PROFILE!</h3>
                <p>Please provide details below. Fields with * are mandatory.</p>

                <form className="mt-4" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name *"
                                className="form-control custom-input-dark"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name *"
                                className="form-control custom-input-dark"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address *"
                                className="form-control custom-input-dark"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Phone Number *"
                                className="form-control custom-input-dark"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <input
                                type="text"
                                name="companyName"
                                placeholder="Company Name *"
                                className="form-control custom-input-dark"
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <input
                                type="text"
                                name="webUrl"
                                placeholder="Web URL"
                                className="form-control custom-input-dark"
                                value={formData.webUrl}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <h4 className="mt-4 fw-semibold">Where are you located? *</h4>
                    <div className="row mt-3">
                        {/* Country Dropdown */}
                        <div className="col-md-4 mb-3">
                            <div className="custom-select-wrapper">
                                <select
                                    name="country"
                                    className="form-control custom-input-dark custom-select"
                                    value={formData?.location?.country}
                                    onChange={handleCountryChange}
                                    required
                                >
                                    <option value="">Select Country</option>
                                    {countries.map((c, i) => (
                                        <option key={i} value={c.name}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                                <span className="custom-arrow">▼</span>
                            </div>
                        </div>

                        {/* State Dropdown */}
                        {/* State Dropdown */}
                        <div className="col-md-4 mb-3">
                            <div className="custom-select-wrapper">
                                <select
                                    name="state"
                                    className="form-control custom-input-dark custom-select"
                                    value={formData?.location?.state}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            location: {
                                                ...prev.location,
                                                state: e.target.value,
                                            },
                                        }))
                                    }
                                    required
                                >
                                    <option value="">Select State</option>
                                    {states.map((s, i) => (
                                        <option key={i} value={s.name}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                                <span className="custom-arrow">▼</span>
                            </div>
                        </div>

                    </div>


                    {/* Membership */}
                    <div className="form-group mt-3">
                        <label className="fw-semibold">Are you already a member of 2+1?</label>
                        <div className="d-flex gap-3 mt-2">
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input custom-radio"
                                    id="memberNo"
                                    checked={formData.isMember === false}
                                    onChange={() => handleMembership(false)}
                                />
                                <label htmlFor="memberNo" className="form-check-label">No</label>
                            </div>

                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input custom-radio"
                                    id="memberYes"
                                    checked={formData.isMember === true}
                                    onChange={() => handleMembership(true)}
                                />
                                <label htmlFor="memberYes" className="form-check-label">Yes</label>
                            </div>
                        </div>
                    </div>


                    {/* Goals */}
                    <div className="form-group mt-5">
                        <label className="fw-semibold mb-3">What would you like to achieve? *</label>
                        <div className="row">
                            {Object.keys(goalMapping).map((option, index) => {
                                const key = goalMapping[option];
                                return (
                                    <div className="col-md-4 mb-2" key={index}>
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input custom-checkbox"
                                                id={`goal${index}`}
                                                checked={formData.goals[key]}
                                                onChange={() => handleCheckbox(option)}
                                            />
                                            <label className="form-check-label" htmlFor={`goal${index}`}>
                                                {option}
                                            </label>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>


                    {/* Referral Source */}
                    <div className="form-group mt-4">
                        <label className="fw-semibold mb-2">
                            How did you find out about us?
                        </label>
                        <select
                            name="referralSource"
                            className="form-control custom-input-dark"
                            value={formData.referralSource}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select an option</option>
                            <option value="friend">Friend / Word of Mouth</option>
                            <option value="social_media">Social Media (Facebook, Instagram, etc.)</option>
                            <option value="google">Google Search</option>
                            <option value="event">Event / Conference</option>
                            <option value="advertisement">Advertisement</option>
                            <option value="other">Other</option>
                        </select>
                    </div>


                    {/* Additional Info */}
                    <div className="form-group mt-4">
                        <label className="fw-semibold mb-2">Tell us more about how you found us</label>
                        <textarea
                            name="additionalInfo"
                            rows="4"
                            className="form-control custom-textarea-dark"
                            placeholder="Type here..."
                            value={formData.additionalInfo}
                            onChange={handleChange}
                        />
                    </div>

                    <button className="btn custom-submit-btn mt-3" type="submit">
                        Request your 2+1 business profile!
                    </button>
                </form>
            </div>
            {/* ✅ Mount ToastContainer here */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="dark"
            />
        </>
    );
};

export default BusinessProfileForm;
