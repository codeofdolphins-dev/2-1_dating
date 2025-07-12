import React, { useState } from 'react';
import { FaSearch, FaEllipsisH, FaPhone, FaVideo, FaCog, FaPaperPlane, FaMicrophone, FaPlus, FaSmile } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './chat.css';
import PageWrapper from '../../components/PageWrapper';

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState('');

  const contacts = [
    {
      id: 1,
      name: 'JUSTONCE',
      message: 'Hello guys. We are an easy going couple',
      time: '40min',
      online: true,
      unread: false
    },
    {
      id: 2,
      name: 'JUSTONCE',
      message: 'Hello guys. We are an easy going couple',
      time: '40min',
      online: true,
      unread: false
    },
    {
      id: 3,
      name: 'JUSTONCE',
      message: 'Hello guys. We are an easy going couple',
      time: '40min',
      online: true,
      unread: false
    },
    {
      id: 4,
      name: 'JUSTONCE',
      message: 'Hello guys. We are an easy going couple',
      time: '40min',
      online: true,
      unread: false
    },
    {
      id: 5,
      name: 'JUSTONCE',
      message: 'Hello guys. We are an easy going couple',
      time: '40min',
      online: true,
      unread: false
    },
    {
      id: 6,
      name: 'JUSTONCE',
      message: 'Hello guys. We are an easy going couple',
      time: '40min',
      online: true,
      unread: false
    }
  ];

  return (
    <>
      <PageWrapper>
      <div className="chat-container">
        <div className="row h-100 w-100 g-0">
          {/* Sidebar */}
          <div className="col-4 sidebar">
            {/* Header */}
            <div className="sidebar-header p-3 border-bottom">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="text-white mb-0">Messages</h5>
                <div className="d-flex align-items-center">
                  <button className="btn btn-primary btn-sm me-2">
                    Select
                  </button>
                  <button className="btn btn-icon me-2">
                    <FaCog className="icon-sm" />
                  </button>
                  <button className="btn btn-icon">
                    <FaEllipsisH className="icon-sm" />
                  </button>
                </div>
              </div>
              
              {/* Search */}
              <div className="position-relative mb-3">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Search"
                />
              </div>
              
              {/* Tabs */}
              <div className="nav-tabs-custom">
                <button className="nav-link active">
                  Messenger
                </button>
                <button className="nav-link">
                  Group Messenger
                </button>
              </div>
            </div>

            {/* Chat List */}
            <div className="chat-list">
              {contacts.map((contact, index) => (
                <div
                  key={contact.id}
                  className={`chat-item p-3 ${selectedChat === index ? 'active' : ''}`}
                  onClick={() => setSelectedChat(index)}
                >
                  <div className="d-flex align-items-center">
                    <div className="position-relative">
                      <div className="avatar">
                        <span className="text-white fw-bold">J</span>
                      </div>
                      {contact.online && (
                        <div className="online-indicator"></div>
                      )}
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="text-white mb-0">{contact.name}</h6>
                        <span className="time-text">{contact.time}</span>
                      </div>
                      <p className="message-preview mb-0">{contact.message}</p>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                      <button className="btn btn-icon-sm mb-1">
                        <FaEllipsisH className="icon-xs" />
                      </button>
                      <div className="status-dot"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-8 chat-area">
            {/* Chat Header */}
            <div className="chat-header p-3 border-bottom">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="position-relative">
                    <div className="avatar-sm">
                      <span className="text-white fw-bold">J</span>
                    </div>
                    <div className="online-indicator-sm"></div>
                  </div>
                  <div className="ms-3">
                    <h6 className="text-white mb-0">JUSTONCE</h6>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <button className="btn btn-icon me-2">
                    <FaPhone className="icon-sm" />
                  </button>
                  <button className="btn btn-icon me-2">
                    <FaVideo className="icon-sm" />
                  </button>
                  <button className="btn btn-icon">
                    <FaEllipsisH className="icon-sm" />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="chat-messages p-3">
              <div className="message-bubble">
                <p className="mb-1">Please add us to the USA DESI CPL group</p>
                <span className="message-time">Mar 13, 2024 • 2 days</span>
              </div>
            </div>

            {/* Message Input */}
            <div className="message-input p-3 border-top">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 position-relative me-3">
                  <input
                    type="text"
                    className="form-control message-input-field"
                    placeholder="Type your message here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button className="btn emoji-btn">
                    <FaSmile />
                  </button>
                </div>
                <button className="btn btn-primary btn-circle me-2">
                  <FaPaperPlane />
                </button>
                <button className="btn btn-secondary btn-circle me-2">
                  <FaMicrophone />
                </button>
                <button className="btn btn-danger btn-circle">
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </PageWrapper>
    </>
  );
};

export default Chat;