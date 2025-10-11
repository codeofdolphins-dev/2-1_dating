import React, { useState, useEffect } from "react";
import GlobalPageWrapper from "../../components/GlobalPageWrapper";
import httpService from "../../helper/httpService";
import { showSuccessToast } from "../../components/customToast/CustomToast";

const Privacy = () => {
    const [settings, setSettings] = useState([
        {
            id: "blockGuestlistNotifications",
            title: "Block the 'your friends added themselves to a guestlist' notification",
            value: false,
        },
        {
            id: "blockFriendGuestlistNotifications",
            title: "Block friends from receiving a notification when YOU add yourself to a guest list",
            value: false,
        },
        {
            id: "blockTrialMembersContact",
            title: "Block trial members from contacting you",
            value: false,
        },
        {
            id: "blockSingleMalesContact",
            title: "Block single males from contacting you",
            value: false,
        },
        {
            id: "blockGroupInvitations",
            title: "Block Group invitations",
            value: false,
        },
        {
            id: "blockLikeNotifications",
            title: "Block Like notifications",
            value: false,
        },
        {
            id: "showActivityOnFriendsFeed",
            title: "Show your activity on your friends’ TwoPlusOneDating Feed",
            value: false,
        },
        {
            id: "showProfileViews",
            title: "Show others you looked at their profile",
            value: false,
        },
        {
            id: "allowWatermarkOnPhotos",
            title: "Allow the TwoPlusOneDating watermark on your profile photos for protection",
            value: false,
        },
        {
            id: "allowPartyInvitations",
            title: "Allow other members to invite you to their parties",
            value: false,
        },
        {
            id: "allowVideoCalls",
            title: "Allow other members to video call you on messenger",
            value: false,
        },
        {
            id: "becomeFeaturedMember",
            title:
                "Become a featured member on TwoPlusOneDating.com to receive more exposure and traffic (available for paid members only)",
            value: false,
        },
    ]);

    // 🔹 Toggle handler
    const switchHandler = (e) => {
        const { name, checked } = e.target;

        setSettings((prevSettings) =>
            prevSettings.map((setting) =>
                setting.id === name ? { ...setting, value: checked } : setting
            )
        );
    };

    // 🔹 Whenever settings change, log updated values or call API
    useEffect(() => {
        // Build an object to send in API (id: value)
        const payload = settings.reduce((acc, setting) => {
            acc[setting.id] = setting.value;
            return acc;
        }, {});

        // Send updated settings to backend
        httpService("/privacy","PUT" ,payload)
            .then((res) => {
                console.log("Privacy settings updated:", res);
                showSuccessToast(res?.message)
            })
            .catch((err) => {
                console.error("Failed to update privacy settings:", err);
            });
    }, [settings]);


    return (
        <GlobalPageWrapper>
            <div
                className="container-fluid py-5 px-5 d-flex flex-column align-items-start justify-content-center gap-2 text-white"
                style={{ backgroundColor: "var(--color-background)" }}
            >
                <div className="w-100">
                    <p className="fs-5 mb-4">Privacy</p>

                    <div className="d-flex flex-column gap-3" style={{ fontSize: "14px" }}>
                        {settings.map((item) => (
                            <div
                                key={item.id}
                                className="form-check form-switch d-flex justify-content-between align-items-start ps-0 py-3 border-bottom border-secondary"
                            >
                                <label
                                    className="form-check-label me-3"
                                    htmlFor={item.id}
                                    style={{ width: "95%" }}
                                >
                                    {item.title}
                                </label>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name={item.id}
                                    id={item.id}
                                    checked={item.value}
                                    onChange={switchHandler}
                                    style={{ cursor: "pointer" }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </GlobalPageWrapper>
    );
};

export default Privacy;
