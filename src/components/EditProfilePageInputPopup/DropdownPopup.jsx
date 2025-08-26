import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Styles from  "./SelectPopup.module.css";

const DropdownPopup = ({ options = [], title = "", name, selectedValue, setSelectedValue }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        setSelectedValue((prev) => ({
            ...prev,
            [name]: option, // Dynamically update the correct field
        }));
        setIsOpen(false); // Close popup after selection
    };

    const displaySelected = () => {
        return selectedValue?.[name] || '';
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
                        <h5 className="modal-title">{title}</h5>
                        <div className="modal-options">
                            {options.map((option, index) => (
                                <div
                                    key={index}
                                    className={`popup-item ${selectedValue?.[name] === option ? "selected" : ""}`}
                                    onClick={() => handleSelect(option)}
                                >
                                    <span className="option-text">{option}</span>
                                </div>
                            ))}
                        </div>

                        <div className="modal-actions">
                            <button
                                className="clear-btn"
                                onClick={() => {
                                    setSelectedValue((prev) => ({ ...prev, [name]: "" }));
                                    setIsOpen(false);
                                }}
                            >
                                Clear
                            </button>
                            <button className="close-btn" onClick={() => setIsOpen(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownPopup;
