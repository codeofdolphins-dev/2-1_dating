import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { useAuth } from '../context/AuthContextAPI';
import { FaPhone, FaVideo, FaEllipsisH, FaMicrophone, FaPlus } from 'react-icons/fa';
import { BsEmojiSmile, BsSend } from 'react-icons/bs';
import Form from 'react-bootstrap/Form';
import httpService from '../helper/httpService';

const ChatComponent = ({ receiverId, otherUserName }) => {
  const { user, messagereceiverName,messageSenderName } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const websocket = useWebSocket();
  const messagesEndRef = useRef(null);

  const myUserId = user?.data?.user?._id;

  /** 🔹 Fetch personal chat history */
  const fetchConversation = useCallback(async () => {
    try {
      if (receiverId) {
        const data = await httpService(`/personal-messages/conversations/${receiverId}`, 'GET');
        setMessages(data?.data || []);
      }
    } catch (err) {
      console.error('❌ Failed to load conversation:', err);
    }
  }, [receiverId]);

  /** 🔹 WebSocket setup */
  useEffect(() => {
    if (!myUserId || !receiverId) return;

    websocket.joinConversation(receiverId);
    fetchConversation();

    /** Handle new personal message */
    const handleNewPersonalMessage = (message) => {
      const senderId = typeof message.senderId === 'object' ? message.senderId._id : message.senderId;
      const receiverIdFromMsg =
        typeof message.receiverId === 'object' ? message.receiverId._id : message.receiverId;

      if (
        (senderId === myUserId && receiverIdFromMsg === receiverId) ||
        (senderId === receiverId && receiverIdFromMsg === myUserId)
      ) {
        setMessages((prev) => [...prev, message]);
      }
    };

    /** Handle typing */
    const handleUserTyping = (data) => {
      if (data.userId === receiverId) setIsTyping(data.isTyping);
    };

    websocket.socket?.on('new_personal_message', handleNewPersonalMessage);
    websocket.socket?.on('user_typing', handleUserTyping);

    return () => {
      websocket.leaveConversation(receiverId);
      websocket.socket?.off('new_personal_message', handleNewPersonalMessage);
      websocket.socket?.off('user_typing', handleUserTyping);
    };
  }, [receiverId, myUserId, websocket, fetchConversation]);

  /** 🔹 Auto scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /** 🔹 Send personal message */
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const tempMessage = {
      _id: Date.now(),
      senderId: myUserId,
      receiverId: receiverId,
      content: newMessage,
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    setMessages((prev) => [...prev, tempMessage]);

    try {
      websocket.sendPersonalMessage(receiverId, newMessage);
      // persist to DB
      await httpService(`/personal-messages/conversations/${receiverId}`, 'POST', { content: newMessage });
    } catch (err) {
      console.error("❌ Failed to send message:", err);
    }

    setNewMessage('');
    websocket.stopTyping(receiverId);
  };

  /** 🔹 Handle typing */
  const handleInputTyping = () => {
    websocket.startTyping(receiverId);

    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      websocket.stopTyping(receiverId);
    }, 1000);

    setTypingTimeout(timeout);
  };

  console.log("aaaa",messages)

  return (
    <div className="col-md-8 col-lg-9 chat-area d-flex flex-column h-100 px-3 py-5 position-relative">
      {/* Header */}
      <div className="chat-header p-3 border-bottom">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="position-relative">
              <div className="avatar-sm">
                <span className="text-white fw-bold">
                  {otherUserName?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="online-indicator-sm"></div>
            </div>
            <div className="ms-3">
              <h6 className="text-white mb-0">
                {messagereceiverName || 'User'}
              </h6>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <button className="btn btn-icon me-2"><FaPhone className="icon-sm" /></button>
            <button className="btn btn-icon me-2"><FaVideo className="icon-sm" /></button>
            <button className="btn btn-icon">
              <FaEllipsisH className="icon-sm" style={{ transform: 'rotate(90deg)' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow-1 overflow-auto py-3">
        {messages.map((message, index) => {
          const senderId = typeof message.senderId === 'object' ? message.senderId._id : message.senderId;
          const isMine = senderId === myUserId;

          return (
            <div
              key={message._id || index}
              className={`p-3 d-flex align-items-center ${isMine ? 'justify-content-end gap-2' : 'gap-2'}`}
            >
              {!isMine && <strong className="me-2">{message?.senderId?.username || 'User'}:</strong>}
              <div
                className={`message-bubble px-4 py-2 rounded-pill ${isMine ? 'bg-primary text-white' : 'bg-success text-dark'}`}
                style={{ maxWidth: '60%' }}
              >
                <p className="mb-0">{message.content}</p>
                <span className="message-time small text-light">
                  {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {message.isRead && isMine && <span className="ms-1 small">✓✓</span>}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="px-3 small fst-italic text-white">
            {messageSenderName} is typing...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="message-input p-3 border-top">
        <div className="d-flex align-items-center">
          <div className="flex-grow-1">
            <div className="d-flex align-items-center rounded-pill px-3 py-2 bg-light">
              <Form.Control
                type="text"
                placeholder="Type your message here"
                className="border-0 bg-transparent flex-grow-1"
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  handleInputTyping();
                }}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <BsEmojiSmile className="text-secondary me-3 fs-5" role="button" title="Emoji" />
              <BsSend className="text-primary fs-5" role="button" title="Send" onClick={sendMessage} />
            </div>
          </div>
          <button className="btn btn-secondary btn-circle mx-2"><FaMicrophone /></button>
          <button className="btn btn-danger btn-circle"><FaPlus /></button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
