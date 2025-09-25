import React, { useEffect, useState } from "react";
import httpService from "../../helper/httpService";
import Navbar from "../HomePage/HomeComponents/Navbar";
import FrontScreenTopBar from "../../components/FrontScreenTopBar/FrontScreenTopBar";
import { useNavigate } from "react-router-dom";

const CurrentUserSubscriptionPlan = () => {
    const [planData, setPlanData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        httpService("/subscriptions/current", "GET")
            .then((res) => {
                console.log("Current subscription:", res?.data);
                setPlanData(res?.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching current plan:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center text-white mt-5">Loading...</div>;
    }

    if (planData.status === "no_subscription") {
        return (
            <>
            <FrontScreenTopBar />
                <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ minHeight: "100vh" }}
                >
                    <div
                        className="text-center p-4 rounded-3 shadow-sm"
                        style={{
                            backgroundColor: "var(--color-border)",
                            border: "1px solid #374151",
                            maxWidth: "400px",
                            width: "100%",
                        }}
                    >
                        <h5 className="text-danger fw-bold mb-3">No active subscription found!</h5>
                        <p className="text-secondary mb-4">Subscribe now to unlock premium features.</p>
                        <button
                            onClick={() => navigate("/subscription")}
                            className="btn btn-lg w-100 text-uppercase"
                            style={{ backgroundColor: "var(--color-primary-green)", color: "#000000" }}
                        >
                            Subscribe Now
                        </button>
                    </div>
                </div>


            </>
        );
    }

    const { subscription, plan, permissions } = planData;

    return (
        <>
            <FrontScreenTopBar />
            <div className="container mt-5 text-white pt-5">
                <div
                    className="rounded-3 shadow-sm p-4"
                    style={{ backgroundColor: "var(--color-border)", border: "1px solid #374151" }}
                >
                    {/* Title & Price */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="fw-bold">{plan.name}</h3>
                        <h4 className="fw-bold text-success">{plan.formattedPrice}</h4>
                    </div>

                    {/* Duration */}
                    <p className="small text-secondary mb-2">Duration: {plan.durationText}</p>

                    {/* Subscription Status */}
                    <p className="mb-2">
                        <strong>Status:</strong>{" "}
                        <span
                            className={`badge ${subscription.isCurrentlyActive ? "bg-success" : "bg-danger"
                                }`}
                        >
                            {subscription.status}
                        </span>
                    </p>
                    <p className="mb-2">
                        <strong>Start:</strong> {new Date(subscription.startDate).toLocaleDateString()}
                    </p>
                    <p className="mb-4">
                        <strong>End:</strong> {new Date(subscription.endDate).toLocaleDateString()} (
                        {subscription.daysRemaining} days left)
                    </p>

                    {/* Description */}
                    <p className="mb-4">{plan.description}</p>

                    {/* Features */}
                    <h5 className="mb-3">Features</h5>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {plan.features.map((feature) => (
                            <li key={feature.id} className="d-flex align-items-center mb-2">
                                <i
                                    className="bi bi-check2-circle me-2"
                                    style={{ color: "var(--color-success-green)" }}
                                ></i>
                                <span>
                                    {feature.description}{" "}
                                    {feature.limit > 0 && <strong>({feature.limit} limit)</strong>}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {/* Permissions */}
                    <h5 className="mt-4 mb-3">Permissions</h5>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {permissions.map((perm, index) => (
                            <li key={index} className="d-flex align-items-center mb-2">
                                <i
                                    className="bi bi-shield-check me-2"
                                    style={{ color: "var(--color-success-green)" }}
                                ></i>
                                <span>{perm.replace(/_/g, " ")}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default CurrentUserSubscriptionPlan;
