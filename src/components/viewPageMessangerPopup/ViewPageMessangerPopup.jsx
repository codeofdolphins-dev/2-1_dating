import { Form, InputGroup } from "react-bootstrap";
import { BsFillTelephoneFill, BsCameraVideoFill, BsThreeDotsVertical, BsMicFill } from "react-icons/bs";
import { FaPaperPlane, FaSmile, FaPlus } from "react-icons/fa";

const ViewPageMessangerPopup = () => {
  return (
    <div
      className="position-fixed top-50 start-50 translate-middle shadow-lg"
      style={{
        width: "420px",
        height: "500px",
        backgroundColor: "#2e2f34",
        borderRadius: "20px",
        zIndex: 1150,
      }}
    >
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between px-3 py-2" style={{ backgroundColor: "#343a40" }}>
        <div className="d-flex align-items-center gap-2">
          <img
            src="https://via.placeholder.com/40"
            alt="avatar"
            className="rounded-circle"
            style={{ width: "40px", height: "40px" }}
          />
          <div className="text-white fw-semibold">JUSTONCE</div>
          <span className="ms-1 rounded-circle bg-success" style={{ width: 8, height: 8 }}></span>
        </div>
        <div className="text-white d-flex align-items-center gap-3">
          <BsFillTelephoneFill />
          <BsCameraVideoFill />
          <BsThreeDotsVertical />
        </div>
      </div>

      {/* Chat Body */}
      <div
        className="flex-grow-1 overflow-auto p-3"
        style={{ height: "calc(100% - 120px)", color: "white" }}
      >
        {/* Message Area (currently empty) */}
      </div>

      {/* Footer */}
      <div
        className="px-3 py-2 d-flex align-items-center"
        style={{ backgroundColor: "#1f1f1f" }}
      >
        <InputGroup className="rounded-pill bg-white px-3 py-2" style={{ flex: 1 }}>
          <Form.Control
            placeholder="Type your message here"
            className="border-0 bg-transparent shadow-none"
            style={{ fontSize: "0.9rem" }}
          />
          <span className="text-muted d-flex align-items-center gap-3 pe-2">
            <FaSmile />
            <FaPaperPlane className="text-primary" />
          </span>
        </InputGroup>
        <div className="ms-3 d-flex gap-3 text-white fs-5">
          <BsMicFill className="text-danger" />
          <FaPlus className="text-danger" />
        </div>
      </div>
    </div>
  );
};

export default ViewPageMessangerPopup;
