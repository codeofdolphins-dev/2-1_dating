import React, { useState } from "react";
import couple from "../../Pages/ScondRegistrationPage/Images/couple.png";
import female from "../../Pages/ScondRegistrationPage/Images/female.png";
import male from "../../Pages/ScondRegistrationPage/Images/male.png";
import transgender from "../../Pages/ScondRegistrationPage/Images/transgender.png";
import { Form } from "react-bootstrap";

const ChoosePartnerGenderselector = ({ handleLookingFor }) => {
  const [lookingFor, setLookingFor] = useState(["couple"]);

  const handleToggleLookingFor = (label) => {
    setLookingFor((prev) => {
      const updated =
        prev.includes(label)
          ? prev.filter((item) => item !== label)
          : [...prev, label];

      // Pass updated selection to parent
      handleLookingFor(updated);
      return updated;
    });
  };

  const options = [
    { label: "couple", icon: couple },
    { label: "female", icon: female },
    { label: "male", icon: male },
    { label: "transgender", icon: transgender },
  ];

  return (
    <Form.Group className="mb-4">
      <Form.Label className="py-2">
        {/* Looking for (choose 1 or more) * */}
        with
      </Form.Label>
      <div className="d-flex gap-3 flex-wrap">
        {options.map(({ label, icon }) => {
          const isSelected = lookingFor.includes(label);
          return (
            <button
              key={label}
              type="button"
              onClick={() => handleToggleLookingFor(label)}
              className="d-flex flex-column align-items-center justify-content-center p-3 rounded-3"
              style={{
                width: "92px",
                height: "92px",
                backgroundColor: "var(--color-background)",
                color: isSelected ? "var(--color-primary-green)" : "#ffffff",
                border: isSelected
                  ? "2px solid var(--color-primary-green)"
                  : "1px solid #616161",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            >
              <img
                src={icon}
                alt={label}
                style={{ height: "50px", marginBottom: "4px" }}
              />
              <div className="small">{label}</div>
            </button>
          );
        })}
      </div>
    </Form.Group>
  );
};

export default ChoosePartnerGenderselector;
