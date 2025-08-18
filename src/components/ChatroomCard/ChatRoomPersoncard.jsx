import React from 'react';
import Card from 'react-bootstrap/Card';
// import './ChatroomCodeCard.css';
import { FaUserShield } from "react-icons/fa"; // Bootstrap Icons

const ChatRoomPersoncard = ({ image, code, adminId, userId }) => {
  return (
    <Card className="card border-0" style={{ width: '250px', height: '280px' }}>
      <Card.Img
        variant="top"
        src={image}
        style={{ height: '245px', objectFit: 'cover' }}
      />
      <Card.Body className="py-2 px-2 text-center d-flex justify-content-center align-items-end gap-2">
        <div
          className="fw-semibold small"
          style={{ color: "var(--color-primary-green)" }}
        >
          {code}
        </div>
        <div>
          {adminId === userId && (
            <div className="mt-0">
              <FaUserShield size={20} color="gold" title="Admin" />
            </div>
          )}
        </div>

      </Card.Body>
    </Card>
  );
};

export default ChatRoomPersoncard;
