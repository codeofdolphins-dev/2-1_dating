import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Styles from "./SelectPopup.module.css";

const LanguageInputPopup = ({ options = [], bodyHair, setbodyHair,title }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        setbodyHair((prev) => {
            let updatedSelected = prev.languages;

            // Case 3: Toggle the option
            if (updatedSelected.includes(option)) {
                updatedSelected = updatedSelected.filter((item) => item !== option);
            } else {
                updatedSelected.push(option);
            }

            return {
                ...prev,
                languages: updatedSelected
            };
        });
    };

    const handleClear = () => {
        setbodyHair((prev) => ({
            ...prev,
            languages: []
        }));
    };


    // Format selected items for display
    const displaySelected = () => {
        if (bodyHair?.languages?.length === 0) return "";
        if (bodyHair?.languages?.length <= 4) return bodyHair?.languages?.join(", ");
        return `${bodyHair?.languages?.slice(0, 4).join(", ")} ...`;
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
                                        checked={bodyHair?.languages?.includes(option)}
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

export default LanguageInputPopup;
