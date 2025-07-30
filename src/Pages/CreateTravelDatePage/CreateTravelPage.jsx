import React, { useState } from 'react'
import GlobalPageWrapper from '../../components/GlobalPageWrapper'
import { useNavigate } from "react-router";
import "./createTravelDate.css"

const CreateTravelDatePage = () => {
  const navigate = useNavigate()
  const navigatePrevPage = () => {
    navigate("/traveldate")
  }
  const [roomType, setRoomType] = useState('');
  const [title, setTitle] = useState('');
  const [blockSingleMales, setBlockSingleMales] = useState(false);
  const [chatNow, setChatNow] = useState('');
  return (
    <>
      <div style={{ backgroundColor: "var(--color-border)" }}>
        <GlobalPageWrapper>
          <div className='container-fluid text-white ' style={{ height: "100vh" }}>
            <div className="d-flex align-items-center gap-2 text-white pt-5">
              <i
                className="bi bi-chevron-left fs-3"
                style={{ cursor: "pointer" }}
                onClick={navigatePrevPage}
              ></i>
              <div className="fs-4 fw-semibold text-uppercase text-danger">
                Personal Chatroom
              </div>
            </div>
            <div className='mt-3'>
              <p>Create your own personal chatroom by choosing a topic of your liking or as a chatroom for a private event. You can turn on or off the visibility of your chatroom and decide if your chatroom is accessible by anybody or by invitation only. Once your chatroom is created you will receive a unique link to your chatroom to share with other members (e.g. friends, group members, party guest). A chatroom will be closed 2 hours after the last member has left or the chatroom being inactive.</p>
            </div>

            <div className="chatroom-type-section pt-5">
              <label className="form-label fw-semibold text-white mb-3">Type</label>
              <div className="d-flex gap-4">
                <label className="custom-radio">
                  <input type="radio" name="chatroomType" />
                  <span className="radio-label">Public Chatroom</span>
                </label>

                <label className="custom-radio">
                  <input type="radio" name="chatroomType" />
                  <span className="radio-label">Private Chatroom</span>
                </label>

                <label className="custom-radio">
                  <input type="radio" name="chatroomType" />
                  <span className="radio-label">Secret Chatroom</span>
                </label>
              </div>
            </div>


            <div>
              <label htmlFor="title" className='my-3'>Title</label>
              <br />
              <input type="text" className='w-50 py-2 px-4 custom-inputFiled-background rounded-pill' placeholder='Chatroom Title, max 30 Characters' />
            </div>

            <div className="custom-checkbox mt-4 d-flex align-items-center gap-2">
              <input type="checkbox" id="blockMales" className="styled-checkbox" />
              <label htmlFor="blockMales" className="checkbox-label mb-0">
                Block Single Males from entering the chatroom
              </label>
            </div>


            <div className="chatroom-type-section pt-5">
              <label className="form-label fw-semibold text-white mb-3">Going Live</label>
              <div className="d-flex gap-4">
                <label className="custom-radio">
                  <input type="radio" name="chatroomType" />
                  <span className="radio-label">Chat Now</span>
                </label>

                <label className="custom-radio">
                  <input type="radio" name="chatroomType" />
                  <span className="radio-label">Chat Later</span>
                </label>
              </div>
            </div>
 
            <div className='createChatRoomButton'>
              <button className='px-3 py-1 '>Create Chatroom</button>
            </div>

          </div>
        </GlobalPageWrapper>
      </div>
    </>
  )
}

export default CreateTravelDatePage