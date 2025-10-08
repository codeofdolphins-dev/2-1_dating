import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalPageWrapper from "../../components/GlobalPageWrapper";
import ChoosePartnerGenderselector from "../../components/ChoosePartnerGenderselector/ChoosePartnerGenderselector";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Calender from "../../components/calender/Calender";

const CreateSpeeddatepage = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_URL;

  const [lookingFor, setLookingFor] = useState(["Couple"]);
  const [selectedOption, setSelectedOption] = useState("private"); // type of place
  const [where, setWhere] = useState("");
  const [details, setDetails] = useState("");
  const [submitedData, setSubmitedData] = useState(null);
  const [formatted, setFormatted] = useState("");

  const characterLimit = 250;


  // Handler function for radio buttons
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Handle lookingFor toggle
  const handleToggleLookingFor = (updated) => {
    setLookingFor(updated);
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const lowerCasePreferredWith = lookingFor.map(item => item.toLowerCase());

    const payload = {
      type: selectedOption,
      preferredWith: lowerCasePreferredWith, // 👈 lowercase applied here
      where,
      details,
      startDate: formatted.split(" to ")[0],
      endDate: formatted.split(" to ")[1],
      location: {
        coordinates: [72.8777, 19.0760],
        address: {
          country: "India",
          city: "Mumbai",
          fullAddress: "Marine Drive, Mumbai"
        }
      },
    };

    setSubmitedData(payload);
    console.log("submited data",submitedData)

    const token = sessionStorage.getItem("jwtToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    };

    axios.post(`${apiUrl}/speed-dates`, payload, config)
      .then((res) => {
        console.log("✅ speedDate res", res);
      })
      .catch((err) => {
        console.log("❌ error", err);
      });
  };


  return (
    <div className="client-page-background text-white">
      <GlobalPageWrapper>
        <div className="container-fluid mt-5">
          {/* Header */}
          <div className="d-flex gap-5">
            <div>
              <i
                className="bi bi-chevron-left text-white fs-2"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/hotdate")}
              ></i>
            </div>
            <div className="text-white fs-2">
              <p>Speed Date</p>
            </div>
          </div>

          {/* Info Text */}
          <div className="mt-2">
            <p>
              You can upload only one Speed Date at a time, up to 2 weeks in
              advance. Each Speed Date can last a maximum of 4 days (which you
              can select in the calendar), but Virtual Dates are limited to 1
              day only (and you will be asked to specify the time). RULES !!!
            </p>
          </div>
          <div>
            <p>
              Do not use this feature to post an ad for a party, product or
              service. Posts without personal text or mention an external
              communication program such as email, phone number, Kik, Skype,
              WhatsApp etc. will be removed. For direct contact with 2+1
              members, please use the Iphone or Android 2+1 APP.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Type Selection */}
            <div className="bg-gray-800 flex items-center justify-center font-sans mt-5">
              <div className="bg-gray-900 p-8 rounded-xl w-full max-w-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Type</h2>
                <div className="d-flex gap-5">
                  <RadioButton
                    id="private"
                    value="private"
                    label="&nbsp; Private Place"
                    checked={selectedOption === "private"}
                    onChange={handleOptionChange}
                  />
                  <RadioButton
                    id="public"
                    value="public"
                    label="&nbsp; Public Place"
                    checked={selectedOption === "public"}
                    onChange={handleOptionChange}
                  />
                  <RadioButton
                    id="virtual"
                    value="virtual"
                    label="&nbsp; Virtual Date"
                    checked={selectedOption === "virtual"}
                    onChange={handleOptionChange}
                  />
                </div>
              </div>
            </div>

            {/* calender */}
            <div className="mt-4">
              <label htmlFor="">When</label>
              <Calender setFormatted={setFormatted} className={`mt-3`} />
            </div>


            {/* Looking For */}
            <div className="mt-3">
              <ChoosePartnerGenderselector
                handleLookingFor={handleToggleLookingFor}
              />
            </div>

            {/* Where */}
            <div className="w-100 mb-4">
              <Form.Group className="w-50">
                <Form.Label htmlFor="whereInput" className="text-white">
                  Where
                </Form.Label>
                <Form.Control
                  id="whereInput"
                  type="text"
                  value={where}
                  onChange={(e) => setWhere(e.target.value)}
                  className="rounded-pill px-3 py-2 custom-input-speeddate text-white"
                  placeholder="Enter location"
                  style={{ backgroundColor: "var(--color-border)" }}
                />
              </Form.Group>
            </div>

            {/* Details */}
            <div className="w-100 mb-4">
              <div className="d-flex justify-content-between w-50 mb-2">
                <Form.Label htmlFor="detailsTextarea" className="text-white">
                  Details
                </Form.Label>
                <span className="text-white-50 small">
                  {characterLimit - details.length} Characters left
                </span>
              </div>
              <Form.Control
                as="textarea"
                id="detailsTextarea"
                rows={5}
                maxLength={characterLimit}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Add a short description..."
                className="rounded-3 px-3 py-2 w-50 custom-input-speeddate text-white"
                style={{ backgroundColor: "var(--color-border)" }}
              />
            </div>

            {/* Submit */}
            <div className="w-25 mt-4 pb-5">
              <button
                type="submit"
                className="btn btn-primary px-4 py-2 w-100 rounded-pill text-black"
                style={{ backgroundColor: "var(--color-primary-green)" }}
              >
                Post Speed Date
              </button>
            </div>
          </form>
        </div>
      </GlobalPageWrapper>
    </div>
  );
};

// Radio Button Component
const RadioButton = ({ id, value, label, checked, onChange }) => (
  <div className="flex items-center">
    <input
      id={id}
      type="radio"
      value={value}
      name="placeType"
      checked={checked}
      onChange={onChange}
      className="
        w-5 h-5 cursor-pointer appearance-none rounded-full border-2 
        border-gray-500 bg-gray-700
        checked:bg-blue-500 checked:border-blue-500
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500
        transition-all duration-200
      "
    />
    <label htmlFor={id} className="ml-3 text-gray-300 cursor-pointer text-lg">
      {label}
    </label>
  </div>
);

export default CreateSpeeddatepage;
