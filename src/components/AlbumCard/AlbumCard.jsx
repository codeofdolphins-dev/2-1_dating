import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import httpService from "../../helper/httpService";
import { showSuccessToast } from "../customToast/CustomToast";

const AlbumCard = ({ name, coverImage, isPrivate, views, _id, setLoad, load,setAlbumInfoShowToggler,setAlbumId,totalVideos,totalPhotos }) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");

  const handleDelete = () => {
    httpService(`/albums/${_id}`, "DELETE")
      .then((res) => {
        console.log("del", res);
        showSuccessToast(res?.message || "Album deleted successfully!");
        setLoad(!load);
      })
      .catch((err) => {
        console.error("Delete error:", err);
        setLoad(!load);
      });
  };

  const handleUpdate = () => {
    httpService(`/albums/${_id}`, "PUT", { isPrivate: !isPrivate, password })
      .then((res) => {
        console.log("update", res);
        showSuccessToast(res?.message || "Album updated successfully!");
        setLoad(!load);
        setShowPasswordModal(false);
        setPassword("");
      })
      .catch((err) => {
        console.error("Update error:", err);
        setLoad(!load);
      });
  };

  return (
    <>
      <div
        className="border border-secondary rounded-3 p-2"
        style={{ width: "280px" }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center text-white small mb-1">
          <span className="fw-bold text-truncate">{name}</span>
          <i
            className="bi bi-trash text-light"
            role="button"
            onClick={handleDelete}
          ></i>
        </div>

        {/* Image */}
        <div className="rounded-3 overflow-hidden" onClick={()=>{setAlbumInfoShowToggler(true),setAlbumId(_id)}} style={{cursor:"pointer"}}>
          <img
            src={
              coverImage ||
              "https://twoplusone.blr1.cdn.digitaloceanspaces.com/profiles/68c40585feb8eada77e592b7_1758006456619_127be06d.jpg"
            }
            alt={name}
            className="w-100"
            style={{ height: "220px", objectFit: "cover" }}
          />
        </div>

        {/* Footer */}
        <div className="d-flex justify-content-between align-items-center mt-1 text-white small">
          {isPrivate ? (
            <i
              className="bi bi-lock-fill text-danger"
              role="button"
              onClick={() => setShowPasswordModal(true)}
            ></i>
          ) : (
            <i
              className="bi bi-unlock text-success"
              role="button"
              onClick={() => setShowPasswordModal(true)}
            ></i>
          )}

          <div className="d-flex gap-2 align-items-center ms-auto">
            <i className="bi bi-camera">&nbsp;{totalPhotos}</i>
            <i className="bi bi-play-fill">{ totalVideos}</i>
            <span>{views}</span>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      <Modal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="password"
            placeholder="Enter album password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowPasswordModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdate}
            disabled={!password.trim()}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default AlbumCard;
