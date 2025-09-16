import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import httpService from "../../helper/httpService";

import { showSuccessToast } from "../customToast/CustomToast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewAlbumModalPopup = ({ show, handleClose, edit = false, albumId, setToggle, toggle }) => {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [isPrivate, setIsprivate] = useState(null)

  // 🔹 Reset state whenever modal opens/closes
  useEffect(() => {
    if (!show) {
      setTitle("");
      setPassword("");
      return;
    }

    if (edit && albumId) {
      httpService(`/albums/${albumId}`, "GET")
        .then((res) => {
          setTitle(res?.data?.album?.name || "");
          setPassword(res?.data?.album?.password || "");
          setIsprivate(res?.data?.album?.isPrivate)
        })
        .catch((err) => {
          console.error("Fetch album error:", err);
        });
    }
  }, [show, edit, albumId, toggle]);

  // 🔹 Create album
  const handleSubmit = async () => {
    if (!title.trim()) {
      showSuccessToast("Album title is required!");
      return;
    }

    try {
      const res = await httpService("/albums", "POST", {
        name: title,
        password,
        isPrivate: !!password,
      });

      showSuccessToast(res?.message || "Album created successfully!");
      handleClose();
    } catch (err) {
      console.error("Error creating album:", err);
      showSuccessToast("Failed to create album!");
    }
  };

  // 🔹 Update album
  const handleUpdate = async () => {
    if (!title.trim()) {
      showSuccessToast("Album title is required!");
      return;
    }

    try {
      const res = await httpService(`/albums/${albumId}`, "PUT", {
        name: title,
        password,
        isPrivate: !!password,
      });

      showSuccessToast(res?.message || "Album updated successfully!");
      handleClose();
      setToggle(!toggle)
    } catch (err) {
      console.error("Error updating album:", err);
      showSuccessToast("Failed to update album!");
      handleClose();
      setToggle(!toggle)
    }
  };



  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        contentClassName="text-white rounded-2"
      >
        <Modal.Body className="text-center">
          {/* Title */}
          <h6 className="fw-bold mb-2">{edit ? "EDIT ALBUM" : "NEW ALBUM"}</h6>
          {!edit && (
            <p className="small text-secondary mb-3">
              Your album will be open to all users. To make it private simply
              add a password.
            </p>
          )}

          {/* Album Title */}
          <Form.Group className="mb-3 text-black position-relative">
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={20}
              placeholder="Title"
              className="text-black border-secondary"
            />
            <small
              className="position-absolute end-0 top-50 translate-middle-y text-secondary pe-2"
              style={{ fontSize: "12px" }}
            >
              {title.length}/20
            </small>
          </Form.Group>

          {/* Password */}
          {
            isPrivate && <Form.Group className="mb-3 position-relative">
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (optional)"
                className="text-black border-secondary pe-5"
              />
              <i
                className="bi bi-lock-fill text-success position-absolute top-50 end-0 translate-middle-y me-2"
                style={{ pointerEvents: "none" }}
              ></i>
            </Form.Group>
          }

          {
            !edit && <Form.Group className="mb-3 position-relative">
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (optional)"
                className="text-black border-secondary pe-5"
              />
              <i
                className="bi bi-lock-fill text-success position-absolute top-50 end-0 translate-middle-y me-2"
                style={{ pointerEvents: "none" }}
              ></i>
            </Form.Group>
          }


          {/* Buttons */}
          <div className="d-flex justify-content-between mt-4 border-top pt-3">
            <Button
              variant="outline-secondary"
              className="w-50 me-1"
              onClick={handleClose}
            >
              CANCEL
            </Button>
            {edit ? (
              <Button
                variant="outline-light"
                className="w-50 ms-1"
                onClick={handleUpdate}
              >
                UPDATE
              </Button>
            ) : (
              <Button
                variant="outline-light"
                className="w-50 ms-1"
                onClick={handleSubmit}
              >
                OK
              </Button>
            )}
          </div>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default NewAlbumModalPopup;
