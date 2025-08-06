import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import '../contestVideoCard/VideoCard.css';
import image from "../../assets/cardImgs/Images/Img.png"
import VideoModal from '../videopopup/Videopopup';
import video from "../../assets/PopupDemoVideo/243647_small.mp4"
import ImagePopup from '../ImagePopup/ImagePopup';

const ContestPhotocard = ({ username, title }) => {
    const [showModal, setShowModal] = useState(false);

    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <>
            <Card className="bg-dark text-white video-card " onClick={handleOpen}>
                <div className="position-relative">
                    <Card.Img
                        variant="top"
                        src={image}
                        className="rounded-top"
                    />
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
            <ImagePopup
                show={showModal}
                handleClose={handleClose}
                image={image} // Replace with your video URL
            />
        </>
    );
};

export default ContestPhotocard;
