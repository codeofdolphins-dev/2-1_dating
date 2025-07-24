import React, { useState } from "react";
import { Button, Form, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalPageWrapper from "../../components/GlobalPageWrapper";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from "react-calendar";
import { CgCalendar } from "react-icons/cg";


import couple from "../../Pages/ScondRegistrationPage/Images/couple.png"
import female from "../../Pages/ScondRegistrationPage/Images/female.png"
import male from "../../Pages/ScondRegistrationPage/Images/male.png"
import transgender from "../../Pages/ScondRegistrationPage/Images/transgender.png"
import ChoosePartnerGenderselector from "../../components/ChoosePartnerGenderselector/ChoosePartnerGenderselector";
import "../../App.css"


const CreateSpeeddatepage = () => {
  const ValuePiece = Date | null;

  const Value = ValuePiece | [ValuePiece, ValuePiece];
  const [type, setType] = useState("Private");
  const [lookingFor, setLookingFor] = useState(["Couple"]);


  const characterLimit = 250;

  // State to keep track of the selected radio button option.
  // 'private' is the default selected value.
  const [selectedOption, setSelectedOption] = useState('private');

  // Handler function to update the state when a radio button is changed.
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // A reusable radio button component for cleaner code.
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

  const handleToggleLookingFor = (label) => {
    setLookingFor((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <div className="client-page-background text-white">
      <GlobalPageWrapper>
        <div className="container-fluid mt-5">
          <div className="d-flex gap-5">
            <div><i class="bi bi-chevron-left text-white fs-2"></i></div>
            <div className="text-white fs-2"><p>Speed Date</p></div>
          </div>

          <div className="mt-2">
            <p>You can upload only one Speed Date at a time, up to 2 weeks in advance. Each Speed Date can last a maximum of 4 days (which you can select in the calendar), but Virtual Dates are limited to 1 day only (and you will be asked to specify the time). RULES !!!</p>
          </div>
          <div>
            <p>Do not use this feature to post an ad for a party, product or service. Posts without personal text or mention an external communication program such as email, phone number, Kik, Skype, WhatsApp etc. will be removed. For direct contact with 2+1 members, please use the Iphone or Android 2+1 APP.</p>
          </div>


          <div className="bg-gray-800 min-h-screen flex items-center justify-center font-sans mt-5">
            <div className="bg-gray-900 p-8 rounded-xl w-full max-w-lg">
              {/* Title for the radio button group */}
              <h2 className="text-2xl font-bold text-white mb-4">Type</h2>

              {/* Container for the radio buttons, arranged in a responsive grid */}
              <div className="d-flex gap-5">
                <RadioButton
                  id="private"
                  value="private"
                  label="&nbsp; Private Place"
                  checked={selectedOption === 'private'}
                  onChange={handleOptionChange}
                />
                <RadioButton
                  id="public"
                  value="public"
                  label="&nbsp; Public Place"
                  checked={selectedOption === 'public'}
                  onChange={handleOptionChange}
                />
                <RadioButton
                  id="virtual"
                  value="virtual"
                  label="&nbsp; Virtual Date"
                  checked={selectedOption === 'virtual'}
                  onChange={handleOptionChange}
                />
              </div>
            </div>
          </div>

        {/* <Calendar/> */}

          {/* With */}
          <div className="mt-5">
            <ChoosePartnerGenderselector />
          </div>

          <div className="w-100 mb-4">
            <Form.Group className="w-50">
              <Form.Label htmlFor="whereInput" className="text-white">Where</Form.Label>
              <Form.Control
                id="whereInput"
                type="text"
                className="rounded-pill px-3 py-2 custom-input-speeddate"
                placeholder="Enter location"
                style={{backgroundColor:"var(--color-border)"}}
              />
            </Form.Group>
          </div>

          <div className="w-100 mb-4">
            <div className="d-flex justify-content-between w-50 mb-2">
              <Form.Label htmlFor="detailsTextarea" className="text-white">Details</Form.Label>
              <span className="text-white-50 small">250 Characters left</span>
            </div>
            <Form.Control
              as="textarea"
              id="detailsTextarea"
              rows={5}
              maxLength={250}
              placeholder="Add a short description..."
              className="rounded-3 px-3 py-2 w-50 custom-input-speeddate"
              style={{backgroundColor:"var(--color-border)"}}
            />
          </div>

          <div className="w-25 mt-4 pb-5">
            <button type="submit" className="btn btn-primary px-4 py-2 w-100 rounded-pill text-black" style={{backgroundColor: "var(--color-primary-green)"}}>
              Post Speed Date
            </button>
          </div>



        </div>
      </GlobalPageWrapper>
    </div>
  );
};

export default CreateSpeeddatepage;
