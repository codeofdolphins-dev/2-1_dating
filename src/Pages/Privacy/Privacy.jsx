import React, { useState } from 'react'
import GlobalPageWrapper from '../../components/GlobalPageWrapper';

const Privacy = () => {

    const [settings, setSettings] = useState([
        {
            id: "block_guestlist_notification",
            title: "Block the 'your friends added themselves to a guestlist' notification",
            value: false
        },
        {
            id: "block_friends_guestlist_notification",
            title: "Block friends from receiving a notification when YOU add yourself to a guest list",
            value: false
        },
        {
            id: "block_trial_members",
            title: "Block trial members from contacting you",
            value: false
        },
        {
            id: "block_single_males",
            title: "Block single males from contacting you",
            value: false
        },
        {
            id: "block_group_invitations",
            title: "Block Group invitations.",
            value: false
        },
        {
            id: "block_like_notifications",
            title: "Block Like notifications",
            value: false
        },
        {
            id: "show_activity_feed",
            title: "Show your activity on your friends twoplusonedating Feed",
            value: false
        },
        {
            id: "show_profile_views",
            title: "Show others you looked at their profile",
            value: false
        },
        {
            id: "allow_watermark",
            title: "Allow the twoplusonedating watermark on your profile photos for your protection",
            value: false
        },
        {
            id: "allow_party_invites",
            title: "Allow other members to invite you to their parties?",
            value: false
        },
        {
            id: "allow_video_calls",
            title: "Allow other members to video call you on messenger",
            value: false
        },
        {
            id: "featured_member",
            title: "Become a featured member on twoplusonedating.com to receive more exposure and traffic to your profile (this special feature is for paid members only)",
            value: false
        }
    ]);

    const switchHandler = (e) => {
        const { name, checked } = e.target;
        setSettings((prev) => (
            prev.map(field => (
                field.id === name ? { ...field, value: checked } : field
            ))
        ));
    }

    return (
        <>
            <GlobalPageWrapper >
                <div className="container-fluid py-5 px-5 d-flex flex-column align-items-start justify-content-center gap-2 text-white" style={{ backgroundColor: "var(--color-background)" }}>
                    <div className="w-100">
                        <p style={{ fontSize: "20px" }}>Privacy</p>

                        <div className="d-flex flex-column gap-3" style={{ fontSize: "14px" }}>
                            {
                                settings.map((item, i) => (
                                    <div key={i} className="form-check form-switch d-flex justify-content-between align-items-start ps-0 py-3" style={{ borderBottom: "2px solid #343A40" }}>
                                        <label className="form-check-label" htmlFor={item.id} style={{ width: "95%" }}>{item.title}</label>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name={item.id}
                                            id={item.id}
                                            checked={item.value}
                                            onChange={switchHandler}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </GlobalPageWrapper>
        </>
    )
}

export default Privacy