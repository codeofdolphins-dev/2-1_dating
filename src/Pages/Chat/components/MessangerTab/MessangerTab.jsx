import React, { useState } from 'react'
import { FaPhone, FaVideo, FaEllipsisH } from 'react-icons/fa'

const MessangerTab = () => {

    const [selectedChat, setSelectedChat] = useState(0);
    const contacts = [
        { id: 1, name: "JUSTONCE", message: "Hello guys. We are an easy going couple", time: "40min", online: true, unread: false },
        { id: 2, name: "JUSTONCE", message: "Hello guys. We are an easy going couple", time: "40min", online: true, unread: false },
        { id: 3, name: "JUSTONCE", message: "Hello guys. We are an easy going couple", time: "40min", online: true, unread: false },
        { id: 4, name: "JUSTONCE", message: "Hello guys. We are an easy going couple", time: "40min", online: true, unread: false },
        { id: 5, name: "JUSTONCE", message: "Hello guys. We are an easy going couple", time: "40min", online: true, unread: false },
        { id: 6, name: "JUSTONCE", message: "Hello guys. We are an easy going couple", time: "40min", online: true, unread: false }
    ];

    return (
        <>
            <div className="chat-list flex-grow-1 overflow-auto">
                {contacts.map((contact, index) => (
                    <div
                        key={contact.id}
                        className={`chat-item p-3 ${selectedChat === index ? "active" : ""}`}
                        onClick={() => setSelectedChat(index)}
                    >
                        <div className="d-flex align-items-center">
                            <div className="position-relative">
                                <div className="avatar">
                                    <span className="text-white fw-bold">J</span>
                                </div>
                                {contact.online && <div className="online-indicator"></div>}
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
        </>
    )
}

export default MessangerTab