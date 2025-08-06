import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import './VideoCard.css';
import image from "../../assets/cardImgs/Images/Img.png"
import VideoModal from '../videopopup/Videopopup';
import video from "../../assets/PopupDemoVideo/243647_small.mp4"

const ContestVideoCard = ({ username, title }) => {
  const [showModal, setShowModal] = useState(false);
  
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
    <Card className="bg-dark text-white video-card">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={image}
          className="rounded-top"
        />
        {/* Play Button Overlay */}
        <div className="play-overlay" onClick={handleOpen}>
          <button className="play-button">
            <i className="bi bi-play-fill"></i>
          </button>
        </div>
      </div>
      <Card.Body className="px-3 py-2">
        <Card.Title className="text-uppercase text-danger fs-6 fw-bold mb-1">
          {username}
        </Card.Title>
        <Card.Text className="text-light small mb-0">
          {title}
        </Card.Text>
      </Card.Body>
    </Card>
    <VideoModal
        show={showModal}
        handleClose={handleClose}
        videoSrc={video} // Replace with your video URL
      />
      </>
  );
};

export default ContestVideoCard;
