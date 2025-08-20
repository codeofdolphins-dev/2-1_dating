import React from "react";
import { Modal } from "react-bootstrap";
import style from "./style.module.css";


const ProfileImageFullPopup = ({ show, handleClose, image }) => {   

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            backdrop="static"
            className={style.fullScreenModal} // custom width class
            contentClassName="border-0" // removes modal default borders
            style={{ zIndex: 5000 }}
        >
            <Modal.Body
                className=" rounded-3 w-100"
                style={{
                    backgroundColor: "var(--color-border)"
                }}
            >
                {/* Close Button */}
                <div className="custom-close-btn" onClick={handleClose}>
                    &times;
                </div>

                {/* Image Gallery Grid */}
                <div className="row">
                    <div className="w-100">
                        <img
                            src={image}
                            alt="profile image"
                            className="img-fluid rounded text-white"
                            style={{ objectFit: "cover", width: "100%", height: "100%" }}
                        />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ProfileImageFullPopup;


