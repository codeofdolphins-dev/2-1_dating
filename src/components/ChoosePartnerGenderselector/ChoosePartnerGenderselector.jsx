import React, { useState } from 'react'
import couple from "../../Pages/ScondRegistrationPage/Images/couple.png"
import female from "../../Pages/ScondRegistrationPage/Images/female.png"
import male from "../../Pages/ScondRegistrationPage/Images/male.png"
import transgender from "../../Pages/ScondRegistrationPage/Images/transgender.png"
import { Form } from 'react-bootstrap'

const ChoosePartnerGenderselector = () => {
     const [lookingFor, setLookingFor] = useState(["Couple"]);
    const handleToggleLookingFor = (label) => {
        setLookingFor((prev) =>
            prev.includes(label)
                ? prev.filter((item) => item !== label)
                : [...prev, label]
        );
    };
    return (
        <>
            <Form.Group className="mb-4">
                <Form.Label className="py-2">With</Form.Label>
                <div className="d-flex gap-3 flex-wrap">
                    {[
                        { label: "Couple", icon: couple, isImage: true },
                        { label: "Female", icon: female, isImage: true },
                        { label: "Male", icon: male, isImage: true },
                        { label: "Transgender", icon: transgender, isImage: true },
                    ].map(({ label, icon, isImage }) => {
                        const isSelected = lookingFor.includes(label);
                        return (
                            <button
                                key={label}
                                type="button"
                                onClick={() => handleToggleLookingFor(label)}
                                className="d-flex flex-column align-items-center justify-content-center p-3 rounded-3 "
                                style={{
                                    width: "92px",
                                    height: "92px",
                                    backgroundColor: isSelected
                                        ? "var(--color-background)"
                                        : "var(--color-background)",
                                    color: isSelected ? "var(--color-primary-green)" : "#ffffff",
                                    border: isSelected ? "2px solid #ffffff" : "1px solid #616161ff",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                {isImage && (
                                    <img
                                        src={icon}
                                        alt={label}
                                        style={{ height: "50px", marginBottom: "2px" }}
                                    />
                                )}
                                <div className="small">{label}</div>
                            </button>
                        );
                    })}
                </div>
            </Form.Group>
        </>
    )
}

export default ChoosePartnerGenderselector