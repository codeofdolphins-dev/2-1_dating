import React, { useState, useEffect } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { useAuth } from '../context/AuthContextAPI';

const ChatComponent = ({ otherUserId, otherUserName }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const websocket = useWebSocket();

  const myUserId = user?.data?.user?._id; // ✅ senderId
  console.log("other userId from chatcomponent",otherUserId)

  useEffect(() => {
    if (!otherUserId || !myUserId) return;

    // Join conversation with receiver
    websocket.joinConversation(otherUserId);

    // Listen for new messages
    const handleNewMessage = (message) => {
      if (
        (message.senderId === myUserId && message.receiverId === otherUserId) ||
        (message.senderId === otherUserId && message.receiverId === myUserId)
      ) {
        setMessages(prev => [...prev, message]);
      }
    };

    const handleTyping = (data) => {
      if (data.userId === otherUserId) {
        setIsTyping(data.isTyping);
      }
    };

    websocket.socket?.on('new_personal_message', handleNewMessage);
    websocket.socket?.on('user_typing', handleTyping);

    return () => {
      websocket.leaveConversation(otherUserId);
      websocket.socket?.off('new_personal_message', handleNewMessage);
      websocket.socket?.off('user_typing', handleTyping);
    };
  }, [otherUserId, myUserId, websocket]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      websocket.sendPersonalMessage(otherUserId, newMessage); // ✅ receiverId
      setNewMessage('');
      websocket.stopTyping(otherUserId);
    }
  };

  const handleTyping = () => {
    websocket.startTyping(otherUserId);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      websocket.stopTyping(otherUserId);
    }, 1000);

    setTypingTimeout(timeout);
  };

  return (
    <div className="personal-chat">
      <div className="messages">
        {messages.map((message) => (
          <div
            key={message._id || Math.random()}
            className={`message ${message.senderId === myUserId ? 'sent' : 'received'}`}
          >
            <span>{message.content}</span>
            {message.isRead && <span className="read-indicator">✓✓</span>}
          </div>
        ))}
        {isTyping && <div className="typing-indicator">{otherUserName} is typing...</div>}
      </div>

      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            handleTyping();
          }}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
