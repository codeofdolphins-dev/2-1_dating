import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Styles from "./SelectPopup.module.css";

const EditProfilePageInputPopup = ({ options = [], bodyHair, setbodyHair,title }) => {
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
        <div className={Styles.selectPopup}>
            <div className={Styles.selectBox} onClick={() => setIsOpen(true)} style={{ zIndex: "1" }}>
                <span>{displaySelected()}</span>
                <FaChevronDown className={`${Styles.chevron} ${isOpen ? "rotate" : ""}`} />
            </div>

            {isOpen && (
                <div className={Styles.modalOverlay} onClick={() => setIsOpen(false)} style={{ zIndex: "999" }}>
                    <div className={Styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h5 className={Styles.modalTitle}>{title}</h5>
                        <div className={Styles.modalOptions}>
                            {options.map((option, index) => (
                                <label key={index} className={Styles.popupItem}>
                                    <span className={Styles.optionText}>{option}</span>
                                    <input
                                        type="checkbox"
                                        checked={bodyHair?.bodyHair?.includes(option)}
                                        onChange={() => handleSelect(option)}
                                    />
                                </label>
                            ))}
                        </div>

                        <div className="modal-actions">
                            <button className={Styles.clearBtn} onClick={handleClear}>
                                Clear All
                            </button>
                            <button className={Styles.closeBtn} onClick={() => setIsOpen(false)}>
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
