import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./SelectPopup.css";

const EditProfilePageInputPopup = ({ options = [], bodyHair, setbodyHair }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        setbodyHair((prev) => {
            const currentSelected = prev.bodyHair;

            // Case 1: "Prefer not to say" is selected → clear others and set only this
            if (option === "Prefer not to say") {
                return {
                    ...prev,
                    bodyHair: [option]
                };
            }

            // Case 2: If "Prefer not to say" is already selected, remove it
            let updatedSelected = currentSelected.includes("Prefer not to say")
                ? []
                : [...currentSelected];

            // Case 3: Toggle the option
            if (updatedSelected.includes(option)) {
                updatedSelected = updatedSelected.filter((item) => item !== option);
            } else {
                updatedSelected.push(option);
            }

            return {
                ...prev,
                bodyHair: updatedSelected
            };
        });
    };

    const handleClear = () => {
        setbodyHair((prev) => ({
            ...prev,
            bodyHair: []
        }));
    };


    // Format selected items for display
    const displaySelected = () => {
        if (bodyHair?.bodyHair?.length === 0) return "";
        if (bodyHair?.bodyHair?.length <= 4) return bodyHair?.bodyHair?.join(", ");
        return `${bodyHair?.bodyHair?.slice(0, 4).join(", ")} ...`;
    };

    return (
        <div className="select-popup">
            <div className="select-box" onClick={() => setIsOpen(true)} style={{ zIndex: "1" }}>
                <span>{displaySelected()}</span>
                <FaChevronDown className={`chevron ${isOpen ? "rotate" : ""}`} />
            </div>

            {isOpen && (
                <div className="modal-overlay" onClick={() => setIsOpen(false)} style={{ zIndex: "999" }}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h5 className="modal-title">Body Hair</h5>
                        <div className="modal-options">
                            {options.map((option, index) => (
                                <label key={index} className="popup-item">
                                    <span className="option-text">{option}</span>
                                    <input
                                        type="checkbox"
                                        checked={bodyHair?.bodyHair?.includes(option)}
                                        onChange={() => handleSelect(option)}
                                    />
                                </label>
                            ))}
                        </div>

                        <div className="modal-actions">
                            <button className="clear-btn" onClick={handleClear}>
                                Clear All
                            </button>
                            <button className="close-btn" onClick={() => setIsOpen(false)}>
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProfilePageInputPopup;
