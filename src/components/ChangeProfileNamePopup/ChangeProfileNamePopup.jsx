import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";


import httpService from "../../helper/httpService";
import { showErrorToast, showSuccessToast } from "../customToast/CustomToast";


const ChangeProfileNameModal = ({ show, onClose }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  

  // ✅ Fetch current name when modal opens
  useEffect(() => {
    if (show) {
      setLoading(true);
      httpService("/profile", "GET")
        .then((res) => {
          const firstName = res?.data?.firstName || "";
          const lastName = res?.data?.lastName || "";
          setName([firstName, lastName].filter(Boolean).join(" "));
        })
        .catch((err) => {
          console.error("Failed to fetch user profile", err);
          showErrorToast(err?.response?.message || "Error loading profile");
        })
        .finally(() => setLoading(false));
    }
  }, [show]);

  // ✅ Save updated name
  const handleRename = async (newName) => {
    const parts = newName.trim().split(/\s+/);
    let firstName = "";
    let lastName = "";

    if (parts.length === 1) {
      firstName = parts[0];
    } else if (parts.length === 2) {
      firstName = parts[0];
      lastName = parts[1];
    } else if (parts.length >= 3) {
      firstName = parts[0];
      lastName = parts.slice(1).join(" ");
    }

    await httpService("/profile", "PUT", { firstName, lastName })
      .then((res) => {
        console.log("userName updated", res);
        showSuccessToast(res?.message || "Profile updated successfully");
        onClose();
      })
      .catch((err) => {
        console.error("Update failed", err);
        showErrorToast(err?.response?.message || "Failed to update profile");
      });

    return { firstName, lastName };
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton className="text-white" style={{backgroundColor:"var(--color-border)"}}>
        <Modal.Title className="w-100 text-center">
          CHANGE PROFILE NAME
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className=" text-white">
        <Form.Control
          type="text"
          placeholder="Enter new profile name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white text-dark"
          disabled={loading}
        />
      </Modal.Body>

      <Modal.Footer className=" text-white d-flex p-0 bg-transparent">
        <Button
          className="w-50 m-0 border-1 border-white rounded-0 bg-transparent"
          onClick={onClose}
        >
          CANCEL
        </Button>
        <Button
          
          className={`w-50 m-0 border-1 rounded-0 border-white bg-transparent`}
          onClick={() => handleRename(name)}
          disabled={!name.trim() || loading}
        >
          {name.trim() ? "RENAME" : "RENAME FALSE"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeProfileNameModal;
