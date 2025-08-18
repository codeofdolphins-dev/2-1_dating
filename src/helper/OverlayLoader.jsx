import React from "react";
import { ClipLoader } from "react-spinners";
import { Modal } from "react-bootstrap";
import "./loaderCss.css"

const OverlayLoader = ({ show, text = "Loading..." }) => {
  return (
    <Modal
  show={show}
  centered
  backdrop="static"
  keyboard={false}
  contentClassName=" overlay-loader-content"
  dialogClassName="w-100 h-100 m-0"
>
  <div
    className="d-flex flex-column align-items-center justify-content-center w-100 h-100 loader-container"
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.6)", // semi-transparent dark background
      border: "none",
      minHeight: "100vh",
      minWidth:"100vw"
    }}
  >
    <ClipLoader color="#0d6efd" size={60} />
    <p className="mt-3 text-white fw-semibold">{text}</p>
  </div>
</Modal>

  );
};

export default OverlayLoader;
