import React, { useState, useRef, useEffect } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import {
    BsMessenger,
    BsHandThumbsUp,
    BsPersonPlus,
    BsBell,
} from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ActionMenu = () => {
    const [showLikeSubmenu, setShowLikeSubmenu] = useState(false);
    const likeRef = useRef(null);
    const submenuRef = useRef(null);

    // Close submenu when clicked outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                submenuRef.current &&
                !submenuRef.current.contains(e.target) &&
                !likeRef.current.contains(e.target)
            ) {
                setShowLikeSubmenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const popover = (
        <Popover
            id="action-popover"
            className=" text-white border-0 rounded-3 shadow"
            style={{ cursor: "pointer", minWidth: "180px",backgroundColor:"var(--color-background)" }}
        >
            <Popover.Body className="p-2 position-relative">
                <div className="d-flex align-items-center gap-2 p-2 rounded-2 hover-bg text-white">
                    <BsMessenger />
                    <span>Messenger</span>
                </div>

                {/* Like with submenu */}
                <div
                    className="d-flex align-items-center gap-2 p-2 rounded-2 hover-bg text-primary position-relative"
                    ref={likeRef}
                    onClick={() => setShowLikeSubmenu((prev) => !prev)}
                >
                    <BsHandThumbsUp />
                    <span>Like</span>

                    {showLikeSubmenu && (
                        <div
                            ref={submenuRef}
                            className="position-absolute text-white rounded-2 shadow ml-2"
                            style={{
                                top: 0,
                                left: "102%",
                                marginLeft: "8px",
                                minWidth: "150px",
                                zIndex: 1051,
                                backgroundColor:"var(--color-background)"
                            }}
                        >
                            <div className="d-flex align-items-center text-white gap-2 p-2 hover-bg">
                                <i className="bi bi-hand-thumbs-up"></i>
                                <span>Like</span>
                            </div>
                            <div className="d-flex align-items-center text-white gap-2 p-2 hover-bg">
                                <i className="bi bi-hand-thumbs-down"></i>
                                <span>Not Interested</span>
                            </div>

                        </div>
                    )}
                </div>

                <div className="d-flex align-items-center gap-2 p-2 rounded-2 hover-bg text-white">
                    <BsPersonPlus />
                    <span>Friend request</span>
                </div>
                <div className="d-flex align-items-center gap-2 p-2 rounded-2 hover-bg text-white">
                    <BsBell />
                    <span>Remember</span>
                </div>
            </Popover.Body>
        </Popover>
    );

    return (
        <OverlayTrigger trigger="click" placement="top" overlay={popover} rootClose>
            <button
                className="bg-danger border-0 rounded-circle text-white d-flex justify-content-center align-items-center"
                style={{ width: "32px", height: "32px" }}
            >
                <i className="bi bi-chevron-up"></i>
            </button>
        </OverlayTrigger>
    );
};

export default ActionMenu;
