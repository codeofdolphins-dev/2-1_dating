import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useWebSocket } from '../hooks/useWebSocket';
import { useAuth } from '../context/AuthContextAPI';
import { FaPhone, FaVideo, FaEllipsisH, FaMicrophone, FaPlus } from 'react-icons/fa';
import { BsEmojiSmile, BsSend } from 'react-icons/bs';
import Form from 'react-bootstrap/Form';
import httpService from '../helper/httpService';

const ChatComponent = ({ receiverId, otherUserName, websocket }) => {
  const { user, messagereceiverName } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [typingUser, setTypingUser] = useState(false); // ✅ show typing username
  const [typingTimeout, setTypingTimeout] = useState(null);
  const typingClearRef = useRef(null); // auto-clear safeguard
  // const websocket = useWebSocket();
  const messagesEndRef = useRef(null);

  const myUserId = user?.data?.user?._id;

  /** 🔹 Fetch personal chat history */
  useEffect(() => {
    try {
      if (receiverId) {
        // console.log(receiverId);        
        httpService(`/personal-messages/conversations/${receiverId}`, 'GET')
          .then(data => {
            // console.log(data);
            setMessages(data?.data || []);
          })
      }
    } catch (err) {
      console.error('❌ Failed to load conversation:', err);
    }
  }, [receiverId, otherUserName]);

  /** 🔹 WebSocket setup */

  /** Handle new personal message */
  const handleNewPersonalMessage = useCallback((message) => {
    const senderId = typeof message.senderId === 'object' ? message.senderId._id : message.senderId;
    const receiverIdFromMsg = typeof message.receiverId === 'object' ? message.receiverId._id : message.receiverId;

    if (
      (senderId === myUserId && receiverIdFromMsg === receiverId) ||
      (senderId === receiverId && receiverIdFromMsg === myUserId)
    ) {
      setMessages((prev) => [...prev, message]);
    }
  }, [myUserId, receiverId]);

  const handleUserTypingStart = useCallback((data) => {

    console.log(data);    

    // Try to identify the user who triggered the typing event
    const senderId = data?.userId || data?.senderId || data?.from || data?.user?._id || data?.user?.id;

    // Attempt to extract username from various fallbacks
    const username = data?.username || data?.sender?.username || otherUserName || messagereceiverName;

    // Check if it's the expected other user (not self)
    const isOtherUser = senderId &&
      String(senderId) === String(receiverId) &&
      String(senderId) !== String(myUserId);

    if (isOtherUser) {
      // Set the typing user display name
      setTypingUser(true);

      // Clear any existing timeout
      if (typingClearRef.current) clearTimeout(typingClearRef.current);

      // Auto-clear after 3 seconds
      typingClearRef.current = setTimeout(() => {
        setTypingUser(false);
        typingClearRef.current = null;
      }, 3000);
    }
  }, [receiverId, myUserId, otherUserName, messagereceiverName]);


  const handleUserTypingStop = useCallback((data) => {
    setTypingUser(false);

    const senderId =
      data?.userId || data?.senderId || data?.from ||
      (data?.user && (data.user._id || data.user.id));

    if (senderId && String(senderId) === String(receiverId) && String(senderId) !== String(myUserId)) {
      setTypingUser(false);
      if (typingClearRef.current) {
        clearTimeout(typingClearRef.current);
        typingClearRef.current = null;
      }
    }
  });


  useEffect(() => {
    if (!myUserId || !receiverId) return;

    const socket = websocket.getSocket ? websocket.getSocket() : websocket.socket;
    if (!socket) {
      console.warn('Socket not initialized yet');
      return;
    }

    socket.on('new_personal_message', handleNewPersonalMessage);
    socket.on('typing_start', handleUserTypingStart);
    socket.on('typing_stop', handleUserTypingStop);

    websocket.joinConversation(receiverId);

    return () => {
      websocket.leaveConversation(receiverId);
      socket.off('new_personal_message', handleNewPersonalMessage);
      socket.off('typing_start', handleUserTypingStart);
      socket.off('typing_stop', handleUserTypingStop);

      if (typingClearRef.current) {
        clearTimeout(typingClearRef.current);
        typingClearRef.current = null;
      }
    };
  }, [receiverId, myUserId, websocket, otherUserName, messagereceiverName, handleNewPersonalMessage]);

  /** 🔹 Auto scroll */
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages]);

  /** 🔹 Send personal message */
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const tempMessage = {
      senderId: myUserId,
      receiverId,
      content: newMessage,
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    setMessages((prev) => [...prev, tempMessage]);

    try {
      websocket.sendPersonalMessage(receiverId, { content: newMessage });
      // await httpService(`/personal-messages/conversations/${receiverId}`, 'POST', { content: newMessage });
    } catch (err) {
      console.error("❌ Failed to send message:", err);
    }

    setNewMessage('');
    websocket.stopTyping(receiverId);
  };

  /** 🔹 Handle typing */
  const handleInputTyping = () => {
    websocket.startTyping(receiverId);

    receiverId == myUserId ? setTypingUser(true) : setTypingUser(false);
    
    if (typingClearRef.current) clearTimeout(typingClearRef.current);
    typingClearRef.current = setTimeout(() => {
      websocket.stopTyping(receiverId);
      setTypingUser(false);
    }, 1000);

    // setTypingTimeout(timeout);
  };

  return (
    <div className="col-md-8 col-lg-9 chat-area d-flex flex-column h-100 px-3 py-5 position-relative">
      {/* Header */}

      {receiverId ? (
        <>
          <div className="chat-header p-3 border-bottom">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div className="position-relative">
                  <div className="avatar-sm">
                    <span className="text-white fw-bold">{otherUserName?.charAt(0) || 'U'}</span>
                  </div>
                  <div className="online-indicator-sm"></div>
                </div>
                <div className="ms-3">
                  <h6 className="text-white mb-0">{messagereceiverName || 'User'}</h6>
                  {typingUser && (
                    <div className="px-3 small fst-italic text-white">
                      typing...
                    </div>
                  )}
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
        </>
      ) : (
        <div className="d-flex align-items-center justify-content-center flex-grow-1">
          <h4 className="text-white">Please select a group to start messaging</h4>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;



