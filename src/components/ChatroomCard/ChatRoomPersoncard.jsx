import React from 'react';
import Card from 'react-bootstrap/Card';
// import './ChatroomCodeCard.css';

const ChatRoomPersoncard = ({ image, code }) => {
  return (
    <Card className="card border-0" style={{ width: '250px',height:"280px" }}>
      <Card.Img variant="top" src={image} style={{ height: '245px', objectFit: 'cover' }} />
      <Card.Body className="py-2 px-2 text-center">
        <div className="fw-semibold small" style={{color:"var(--color-primary-green)"}}>{code}</div>
      </Card.Body>
    </Card>
  );
};

export default ChatRoomPersoncard;
