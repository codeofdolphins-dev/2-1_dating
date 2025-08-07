import React, { useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import lipsIcon from "../../assets/cardImgs/Images/lipsPic.png"; // Replace with your actual image path
import { useNavigate } from "react-router-dom";
import axios from "axios";


const ChatroomCard = ({title, members, handlEtakeToChatRoom }) => {

  return (
    <Card className="text-white rounded-4 p-3 card" style={{ width: "450px", }}>
      <Row className="align-items-center justify-content-center">
        {/* Left: Image */}
        <Col xs="auto">
          <img
            src={lipsIcon}
            alt="Chatroom"
            style={{ width: "150px", height: "150px", objectFit: "contain" }}
          />
        </Col>

        {/* Right: Text & Button */}
        <Col className="ps-3">
          <div className="fw-semibold fs-6 mb-2">{title}</div>
          <hr />
          <div className="text-secondary small mb-2 my-2">{members} Members</div>
          <hr />
          <div
            size="sm"
            className="rounded-pill px-3 py-2 text-center fw-medium mt-3 custom-button w-auto"
            style={{ minWidth: "130px", cursor: "pointer" }}
            onClick={handlEtakeToChatRoom}
          >
            Join Chatroom
          </div>
        </Col>

      </Row>
    </Card>
  );
};

export default ChatroomCard;
