import React, { useState } from 'react'
import GlobalPageWrapper from '../../components/GlobalPageWrapper'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import sampleImage from "../../assets/cardImgs/Images/Img.png";
import { Container, Row, Col, Form, Card } from "react-bootstrap"

const settingsList = [
  "Block the 'your friends added themselves to a guestlist' notification",
  "Block friends from receiving a notification when YOU add yourself to a guest list",
  "Block trial members from contacting you",
  "Block single males from contacting you",
  "Block Group invitations.",
  "Block Like notifications.",
  "Show your activity on your friends twoplusonedating Feed",
  "Show others you looked at their profile",
  "Allow the twoplusonedating watermark on your profile photos for your protection",
  "Allow other members to invite you to their parties?",
  "Allow other members to video call you on messenger",
  "Become a featured member on twoplusonedating.com to receive more exposure and traffic to your profile (This special feature is for paid members only)",
];

const AddmePage = () => {
  const navigate = useNavigate()
  const handlePrevPage = () => {
    navigate("/featured-members")
  }

  const [toggles, setToggles] = useState(
    Array(settingsList.length).fill(true)
  );

  const handleToggle = (index) => {
    const updatedToggles = [...toggles];
    updatedToggles[index] = !updatedToggles[index];
    setToggles(updatedToggles);
  };

  return (
    <>
      <div className='text-white' style={{ backgroundColor: "var(--color-background)" }}>
        <GlobalPageWrapper>
          <div className='mt-5 d-flex gap-2 align-items-center'>
            <div><MdKeyboardArrowLeft className='display-3 d-flex align-items-center' style={{ cursor: "pointer" }} onClick={handlePrevPage} /></div>
            <div className='h4'>Featured Members - Add me</div>
          </div>
          <div className="container-fluid pb-5" >
            {settingsList.map((label, index) => (
              <>
              <div className='d-flex mt-3'>
              <div style={{ flex: 1, paddingRight: "1rem" }}>{label}</div>
              <div>
              <Form.Check
                type="switch"
                id={`setting-${index}`}
                key={index}
                checked={toggles[index]}
                onChange={() => handleToggle(index)}
                className="mb-3"
              />
              </div>
              </div>
              <hr />
              </>
            ))}

            <div className="mt-4 border-0">
              <img
                src={sampleImage}
                alt="Preview"
                style={{   borderRadius: "8px" }}
              />
            </div>
          </div>

        </GlobalPageWrapper>
      </div>
    </>
  )
}

export default AddmePage