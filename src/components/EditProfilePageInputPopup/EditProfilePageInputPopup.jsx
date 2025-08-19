import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./SelectPopup.css";

const EditProfilePageInputPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState([]);

    const options = [
        "Prefer not to say",
        "Arms",
        "Bikini",
        "Buns",
        "Tummy",
        "Legs",
        "Everywhere",
        "Chest",
        "Treasure",
        "Arm Pits",
        "Shave",
        "Smooth",
    ];

    const handleSelect = (option) => {
        if (selected.includes(option)) {
            setSelected(selected.filter((item) => item !== option));
        } else {
            setSelected([...selected, option]);
        }
    };

    const handleClear = () => {
        setSelected([]);
    };

    // Format selected items for display
    const displaySelected = () => {
        if (selected.length === 0) return "Select Body Hair";
        if (selected.length <= 4) return selected.join(", ");
        return `${selected.slice(0, 4).join(", ")} ...`;
    };

    return (
        <div className="select-popup">
            {/* Select Box */}
            <div className="select-box" onClick={() => setIsOpen(true)}>
                <span>{displaySelected()}</span>
                <FaChevronDown className={`chevron ${isOpen ? "rotate" : ""}`} />
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h5 className="modal-title">Body Hair</h5>
                        <div className="modal-options">
                            {options.map((option, index) => (
                                <label key={index} className="popup-item">
                                    <span className="option-text">{option}</span>
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(option)}
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
