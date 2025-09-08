import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { useAuth } from '../context/AuthContextAPI';
import { FaPhone, FaVideo, FaEllipsisH, FaMicrophone, FaPlus } from 'react-icons/fa';
import { BsEmojiSmile, BsSend } from 'react-icons/bs';
import Form from 'react-bootstrap/Form';
import httpService from '../helper/httpService';

const ChatComponent = ({ receiverId, otherUserName,groupMessageId }) => {
  const { user, messagereceiverName, groupMessageName} = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const websocket = useWebSocket();
  const messagesEndRef = useRef(null); // 🔹 ref for auto-scroll

  const myUserId = user?.data?.user?._id;

  console.log("groupIdOnChatComponent",groupMessageId)

  /** 🔹 Load conversation initially */
  const fetchConversation = useCallback(async () => {
    if (!receiverId) return;
    try {
      const data = await httpService(`/personal-messages/conversations/${receiverId}`, 'GET');
      setMessages(data?.data || []);
    } catch (err) {
      console.error('❌ Failed to load conversation:', err);
    }
  }, [receiverId]);

  useEffect(() => {
    if (!receiverId || !myUserId) return;

    websocket.joinConversation(receiverId);
    fetchConversation();

    const handleNewMessage = (message) => {
      const senderId =
        typeof message.senderId === 'object' ? message.senderId._id : message.senderId;
      const receiverIdFromMsg =
        typeof message.receiverId === 'object' ? message.receiverId._id : message.receiverId;

      if (
        (senderId === myUserId && receiverIdFromMsg === receiverId) ||
        (senderId === receiverId && receiverIdFromMsg === myUserId)
      ) {
        setMessages((prev) => {
          const alreadyExists = prev.some(
            (msg) =>
              msg._id === message._id ||
              (msg.content === message.content &&
                msg.senderId === senderId &&
                new Date(msg.createdAt).getTime() === new Date(message.createdAt).getTime())
          );
          if (alreadyExists) return prev;
          return [...prev, message];
        });
      }
    };

    const handleUserTyping = (data) => {
      if (data.userId === receiverId) {
        setIsTyping(data.isTyping);
      }
    };

    websocket.socket?.on('new_personal_message', handleNewMessage);
    websocket.socket?.on('user_typing', handleUserTyping);

    return () => {
      websocket.leaveConversation(receiverId);
      websocket.socket?.off('new_personal_message', handleNewMessage);
      websocket.socket?.off('user_typing', handleUserTyping);
    };
  }, [receiverId, myUserId, websocket, fetchConversation]);

  /** 🔹 Auto scroll when messages change */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /** 🔹 Send message */
  const sendMessage = () => {
    if (newMessage.trim()) {
      const tempMessage = {
        _id: Date.now(),
        senderId: myUserId,
        receiverId: receiverId,
        content: newMessage,
        createdAt: new Date().toISOString(),
        isRead: false,
      };

      setMessages((prev) => [...prev, tempMessage]);
      websocket.sendPersonalMessage(receiverId, newMessage);

      setNewMessage('');
      websocket.stopTyping(receiverId);
    }
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

  return (
    <div className="col-md-8 col-lg-9 chat-area d-flex flex-column h-100 px-3 py-5 position-relative">
      {/* Chat Header */}
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
              <h6 className="text-white mb-0">{messagereceiverName || groupMessageName|| 'User'}</h6>
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
          const senderId =
            typeof message.senderId === 'object' ? message.senderId._id : message.senderId;

          return (
            <div
              key={message._id || index}
              className={`p-3 d-flex align-items-center ${senderId === myUserId ? 'justify-content-end gap-2' : 'gap-2'}`}
            >
              {senderId !== myUserId && (
                <FaEllipsisH className="icon-sm" style={{ transform: 'rotate(90deg)' }} />
              )}
              <div
                className={`message-bubble px-4 py-2 rounded-pill ${
                  senderId === myUserId ? 'bg-primary text-white' : 'bg-success text-dark'
                }`}
                style={{ maxWidth: '60%' }}
              >
                <p className="mb-0">{message.content}</p>
                <span className="message-time small text-light">
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                {message.isRead && <span className="ms-1 small">✓✓</span>}
              </div>
              {senderId === myUserId && (
                <FaEllipsisH className="icon-sm" style={{ transform: 'rotate(90deg)' }} />
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="px-3 small fst-italic text-white">
            {otherUserName} is typing...
          </div>
        )}

        {/* 🔹 Scroll target */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
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
          <button className="btn btn-secondary btn-circle mx-2">
            <FaMicrophone />
          </button>
          <button className="btn btn-danger btn-circle">
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;








// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useWebSocket } from '../hooks/useWebSocket';
// import { useAuth } from '../context/AuthContextAPI';
// import { FaPhone, FaVideo, FaEllipsisH, FaMicrophone, FaPlus } from 'react-icons/fa';
// import { BsEmojiSmile, BsSend } from 'react-icons/bs';
// import Form from 'react-bootstrap/Form';
// import httpService from '../helper/httpService';

// const ChatComponent = ({ receiverId, otherUserName }) => {
//   const { user, messagereceiverName, groupMessageName, groupMessageId } = useAuth();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [typingTimeout, setTypingTimeout] = useState(null);
//   const websocket = useWebSocket();
//   const messagesEndRef = useRef(null);

//   const myUserId = user?.data?.user?._id;

//   /** 🔹 Load conversation */
//   const fetchConversation = useCallback(async () => {
//     if (receiverId) {
//       try {
//         const data = await httpService(`/personal-messages/conversations/${receiverId}`, 'GET');
//         setMessages(data?.data || []);
//       } catch (err) {
//         console.error('❌ Failed to load personal chat:', err);
//       }
//     }
//     if (groupMessageId) {
//       try {
//         const data = await httpService(`/group-messages/conversations/${groupMessageId}`, 'GET');
//         setMessages(data?.data || []);
//       } catch (err) {
//         console.error('❌ Failed to load group chat:', err);
//       }
//     }
//   }, [receiverId, groupMessageId]);

//   useEffect(() => {
//     if (!myUserId) return;

//     if (receiverId) {
//       websocket.joinConversation(receiverId);
//     }
//     if (groupMessageId) {
//       websocket.joinChatroom(groupMessageId);
//     }

//     fetchConversation();

//     /** 🔹 Handle personal messages */
//     const handleNewPersonalMessage = (message) => {
//       const senderId =
//         typeof message.senderId === 'object' ? message.senderId._id : message.senderId;
//       const receiverIdFromMsg =
//         typeof message.receiverId === 'object' ? message.receiverId._id : message.receiverId;

//       if (
//         (senderId === myUserId && receiverIdFromMsg === receiverId) ||
//         (senderId === receiverId && receiverIdFromMsg === myUserId)
//       ) {
//         setMessages((prev) => [...prev, message]);
//       }
//     };

//     /** 🔹 Handle group messages */
//     const handleNewGroupMessage = (message) => {
//       if (message.roomId === groupMessageId) {
//         setMessages((prev) => [...prev, message]);
//       }
//     };

//     websocket.socket?.on('new_personal_message', handleNewPersonalMessage);
//     websocket.socket?.on('new_room_message', handleNewGroupMessage);

//     return () => {
//       if (receiverId) websocket.leaveConversation(receiverId);
//       if (groupMessageId) websocket.leaveChatroom(groupMessageId);

//       websocket.socket?.off('new_personal_message', handleNewPersonalMessage);
//       websocket.socket?.off('new_room_message', handleNewGroupMessage);
//     };
//   }, [receiverId, groupMessageId, myUserId, websocket, fetchConversation]);

//   /** 🔹 Auto scroll */
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   /** 🔹 Send message */
//   const sendMessage = () => {
//     if (!newMessage.trim()) return;

//     const tempMessage = {
//       _id: Date.now(),
//       senderId: myUserId,
//       receiverId: receiverId || null,
//       roomId: groupMessageId || null,
//       content: newMessage,
//       createdAt: new Date().toISOString(),
//       isRead: false,
//     };

//     setMessages((prev) => [...prev, tempMessage]);

//     if (receiverId) {
//       websocket.sendPersonalMessage(receiverId, newMessage);
//     } else if (groupMessageId) {
//       websocket.sendRoomMessage(groupMessageId, newMessage);
//     }

//     setNewMessage('');
//     if (receiverId) websocket.stopTyping(receiverId);
//   };

//   /** 🔹 Handle typing */
//   const handleInputTyping = () => {
//     if (receiverId) {
//       websocket.startTyping(receiverId);
//       if (typingTimeout) clearTimeout(typingTimeout);

//       const timeout = setTimeout(() => {
//         websocket.stopTyping(receiverId);
//       }, 1000);

//       setTypingTimeout(timeout);
//     }
//   };

//   return (
//     <div className="col-md-8 col-lg-9 chat-area d-flex flex-column h-100 px-3 py-5 position-relative">
//       {/* Chat Header */}
//       <div className="chat-header p-3 border-bottom">
//         <div className="d-flex align-items-center justify-content-between">
//           <div className="d-flex align-items-center">
//             <div className="position-relative">
//               <div className="avatar-sm">
//                 <span className="text-white fw-bold">
//                   {(groupMessageId ? groupMessageName : otherUserName)?.charAt(0) || 'U'}
//                 </span>
//               </div>
//               <div className="online-indicator-sm"></div>
//             </div>
//             <div className="ms-3">
//               <h6 className="text-white mb-0">
//                 {groupMessageId ? groupMessageName : messagereceiverName || 'User'}
//               </h6>
//             </div>
//           </div>
//           <div className="d-flex align-items-center">
//             <button className="btn btn-icon me-2"><FaPhone className="icon-sm" /></button>
//             <button className="btn btn-icon me-2"><FaVideo className="icon-sm" /></button>
//             <button className="btn btn-icon">
//               <FaEllipsisH className="icon-sm" style={{ transform: 'rotate(90deg)' }} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-grow-1 overflow-auto py-3">
//         {messages.map((message, index) => {
//           const senderId =
//             typeof message.senderId === 'object' ? message.senderId._id : message.senderId;
//           const isMine = senderId === myUserId;

//           return (
//             <div
//               key={message._id || index}
//               className={`p-3 d-flex align-items-center ${isMine ? 'justify-content-end gap-2' : 'gap-2'}`}
//             >
//               {!isMine && <strong className="me-2">{message.senderName || 'User'}:</strong>}
//               <div
//                 className={`message-bubble px-4 py-2 rounded-pill ${
//                   isMine ? 'bg-primary text-white' : 'bg-success text-dark'
//                 }`}
//                 style={{ maxWidth: '60%' }}
//               >
//                 <p className="mb-0">{message.content}</p>
//                 <span className="message-time small text-light">
//                   {new Date(message.createdAt).toLocaleTimeString([], {
//                     hour: '2-digit',
//                     minute: '2-digit',
//                   })}
//                 </span>
//                 {message.isRead && isMine && <span className="ms-1 small">✓✓</span>}
//               </div>
//             </div>
//           );
//         })}

//         {/* Typing indicator */}
//         {isTyping && receiverId && (
//           <div className="px-3 small fst-italic text-white">
//             {otherUserName} is typing...
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div className="message-input p-3 border-top">
//         <div className="d-flex align-items-center">
//           <div className="flex-grow-1">
//             <div className="d-flex align-items-center rounded-pill px-3 py-2 bg-light">
//               <Form.Control
//                 type="text"
//                 placeholder="Type your message here"
//                 className="border-0 bg-transparent flex-grow-1"
//                 value={newMessage}
//                 onChange={(e) => {
//                   setNewMessage(e.target.value);
//                   handleInputTyping();
//                 }}
//                 onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//               />
//               <BsEmojiSmile className="text-secondary me-3 fs-5" role="button" title="Emoji" />
//               <BsSend className="text-primary fs-5" role="button" title="Send" onClick={sendMessage} />
//             </div>
//           </div>
//           <button className="btn btn-secondary btn-circle mx-2">
//             <FaMicrophone />
//           </button>
//           <button className="btn btn-danger btn-circle">
//             <FaPlus />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatComponent;


