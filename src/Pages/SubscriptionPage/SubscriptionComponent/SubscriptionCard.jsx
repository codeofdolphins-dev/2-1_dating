import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubscriptionCard = ({ title, duration, total, perMonth, isPopular, features = [], permissions = [], planId }) => {
    console.log("planId", planId)

    const navigate = useNavigate()

    return (
        <div
            className="text-white rounded-3 p-4 position-relative h-100 shadow-sm d-flex flex-column"
            style={{ backgroundColor: "var(--color-border)", border: "1px solid #374151" }}
        >
            {isPopular && (
                <span
                    className="small fw-medium position-absolute top-0 end-0 px-3 py-1"
                    style={{
                        borderRadius: "0 7px 0 0",
                        backgroundColor: "var(--color-success-green)",
                        color: "#000000",
                    }}
                >
                    POPULAR
                </span>
            )}

            <h6 className="fw-medium h4 pb-3 pt-2">{title}</h6>
            <p className="text-uppercase fw-medium small mb-0" style={{ color: "#9ca3af" }}>
                {duration}
            </p>
            <p className="fw-bold text-white mb-4">{total}</p>
            <p
                className="text-uppercase fw-semibold fs-5 mb-4"
                style={{ color: "var(--color-success-green)" }}
            >
                {total} <span style={{ color: "#9ca3af" }}>{duration}</span>
            </p>

            {/* 🔽 Features list dynamically mapped */}
            {/* <ul className="mb-4" style={{ listStyle: "none", padding: 0 }}>
                <p>Features</p>
                {features.map((feature, index) => (
                    <li key={index} className="d-flex align-items-center mb-2">
                        <i className="bi bi-check2-circle me-2" style={{ color: "var(--color-success-green)" }}></i>
                        <span>{feature?.description}</span>
                    </li>
                ))}
            </ul> */}

            {/* 🔽 Permissions list dynamically mapped */}
            {/* <ul className="mb-4" style={{ listStyle: "none", padding: 0 }}>
                <p>Permissions</p>
                {permissions.map((feature, index) => (
                    <li key={index} className="d-flex align-items-center mb-2">
                        <i className="bi bi-check2-circle me-2" style={{ color: "var(--color-success-green)" }}></i>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul> */}

            {/* ✅ Button pushed to bottom */}
            <button
                className="btn btn-primary w-100 text-uppercase mt-auto mb-2"
                style={{ backgroundColor: "var(--color-primary-green)", color: "#000000" }}
            >
                Select Plan
            </button>

            <button
                className="btn w-100 text-uppercase mt-auto"
                style={{ border: "1px solid var(--color-primary-green)", color: "var(--color-primary-green)" }}
                onClick={() => navigate(`/subscription-moreInfo/${planId}`)}
            >
                Learn More
            </button>

        </div>

    );
};

export default SubscriptionCard;
