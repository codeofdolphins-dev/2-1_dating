import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Styles from "./SelectPopup.module.css";

const DropdownPopup = ({ options = [], title = "", name, selectedValue, setSelectedValue }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        setSelectedValue((prev) => {

            if (!name) {
                return option; // Replace state with option if name is not defined
            }

            return {
                ...prev,
                [name]: option, // Update specific key if name is defined
            };
        });
        setIsOpen(false); // Close popup after selection
    };

    const displaySelected = () => {
        if (!name) {
            return selectedValue; // Replace state with option if name is not defined
        }
        return selectedValue?.[name] || '';
    };

    return (
        <div className="select-popup" style={{ width: "100%", fontFamily: "Arial, sans-serif", position: "relative" }}>
            <div
                className="select-box"
                onClick={() => setIsOpen(true)}
                style={{
                    padding: "10px",
                    color: "white",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // background: "#1d1d1d",
                    // borderBottom: "1px solid rgb(176, 195, 204)",
                    borderRadius: "5px",
                    zIndex: "1"
                }}
            >
                <span>{displaySelected()}</span>
                <FaChevronDown
                    className={`chevron ${isOpen ? "rotate" : ""}`}
                    style={{
                        transition: "transform 0.3s ease",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
                    }}
                />
            </div>

            {isOpen && (
                <div
                    className="modal-overlay"
                    onClick={() => setIsOpen(false)}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: "999"
                    }}
                >
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: "var(--color-border)",
                            borderRadius: "8px",
                            width: "90%",
                            maxWidth: "400px",
                            padding: "20px"
                        }}
                    >
                        <h5 className="modal-title" style={{ marginBottom: "15px", fontSize: "18px", fontWeight: "bold" }}>
                            {title}
                        </h5>

                        <div
                            className="modal-options"
                            style={{
                                maxHeight: "250px",
                                overflowY: "auto",
                                borderTop: "1px solid #ddd",
                                borderBottom: "1px solid #ddd",
                                marginBottom: "15px",
                                paddingTop: "10px",
                                paddingBottom: "10px"
                            }}
                        >
                            {options.map((option, index) => (
                                <div
                                    key={index}
                                    className={`popup-item ${selectedValue?.[name] === option ? "selected" : ""}`}
                                    onClick={() => handleSelect(option)}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "10px",
                                        cursor: "pointer",
                                        transition: "background 0.2s",
                                        background:
                                            selectedValue?.[name] === option ? "var(--color-background)" : "transparent"
                                    }}
                                >
                                    <span className="option-text" style={{ flex: 1 }}>
                                        {option}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="modal-actions" style={{ display: "flex", justifyContent: "space-between" }}>
                            <button
                                className="clear-btn"
                                onClick={() => {
                                    setSelectedValue((prev) => ({ ...prev, [name]: "" }));
                                    setIsOpen(false);
                                }}
                                style={{
                                    background: "var(--color-primary-green)",
                                    color: "#000",
                                    border: "none",
                                    borderRadius: "5px",
                                    padding: "8px 15px",
                                    cursor: "pointer"
                                }}
                            >
                                Clear
                            </button>
                            <button
                                className="close-btn"
                                onClick={() => setIsOpen(false)}
                                style={{
                                    background: "var(--color-primary-green)",
                                    color: "#000",
                                    border: "none",
                                    borderRadius: "5px",
                                    padding: "8px 15px",
                                    cursor: "pointer"
                                }}
                            >
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
