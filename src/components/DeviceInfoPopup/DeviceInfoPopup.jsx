import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { IoClose } from "react-icons/io5"; // White close button
import "./devicePopupCss.css"

const MembershipInfoModal = ({show,setShow}) => {

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header
        style={{ backgroundColor: "var(--color-border)" }}
        className="d-flex align-items-center"
      >
        <Modal.Title className="text-center w-100 text-white">
          Information
        </Modal.Title>
        {/* Custom White Close Button */}
        <button
          onClick={handleClose}
          className="btn border-0 p-0 ms-auto"
          style={{ background: "transparent" }}
        >
          <IoClose size={24} color="white" />
        </button>
      </Modal.Header>

      <Modal.Body
        style={{ backgroundColor: "var(--color-border)", color: "#ffffff" }}
      >
        <div className="mb-3">
          <div className="d-flex my-auto mb-2">
            <div
              className="bg-white rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "25px", height: "25px" }}
            >
              <HiMiniComputerDesktop className="text-primary fs-5" />
            </div>
            <div className="ms-2">Web User</div>
          </div>
          <div className="d-flex my-auto">
            <div
              className="bg-white rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "25px", height: "25px" }}
            >
              <MdOutlinePhoneIphone className="text-primary fs-5" />
            </div>
            <div className="ms-2">App User</div>
          </div>
        </div>

        <p>
          Your SDC membership offers access to both Website and iPhone /
          Android app.
        </p>

        <h6>Benefits of the website:</h6>
        <ul>
          <li>See all adult content</li>
          <li>
            Additional features such as Videos, Contest, Groups, Chatrooms, Live
            and Popularity wall
          </li>
          <li>Lifetime membership available</li>
        </ul>

        <h6>Benefits of the app:</h6>
        <ul>
          <li>Push notification when you receive a new message</li>
          <li>Easy way to make Video calls</li>
          <li>Connected 24/7</li>
        </ul>

        <div className="d-flex justify-content-center gap-3 mt-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
            style={{ height: "40px", cursor: "pointer" }}
          />
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="App Store"
            style={{ height: "40px", cursor: "pointer" }}
          />
        </div>
      </Modal.Body>

      <Modal.Footer
        className="justify-content-center"
        style={{ backgroundColor: "var(--color-border)" }}
      >
        <Button variant="primary" onClick={handleClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MembershipInfoModal;
