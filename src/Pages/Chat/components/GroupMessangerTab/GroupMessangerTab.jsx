import React, { useEffect, useState } from 'react'
import { FaPhone, FaVideo, FaEllipsisH, FaSlack } from 'react-icons/fa'


const GroupMessangerTab = () => {

    const [selectedChat, setSelectedChat] = useState(0);

    const [contacts, setContacts] = useState([
        { id: 1, name: "JUSTONCE", message: "Hello guys. We are an easy going couple", time: "40min", online: false, unread: false, pin: false, mute: false },
        { id: 2, name: "JUSTONCE", message: "Hello guys. We are an easy going couple", time: "40min", online: true, unread: false, pin: false, mute: false },
        { id: 3, name: "JUSTONCE", message: "Hello guys. We are an easy going couple", time: "40min", online: false, unread: false, pin: false, mute: false },
        { id: 4, name: "JUSTONCE", message: "Hello guys. We are an easy going couple", time: "40min", online: true, unread: false, pin: false, mute: false },
        { id: 5, name: "JUSTONCE", message: "Hello guys. We are an easy going couple", time: "40min", online: true, unread: false, pin: false, mute: false },
        { id: 6, name: "JUSTONCE", message: "Hello guys. We are an easy going couple", time: "40min", online: true, unread: false, pin: false, mute: false }
    ]);

    const handelPin = (id) => {
        console.log(id);
        
        setContacts(prev => 
            prev.map(item => {
                return item.id === id ? { ...item, pin: !item.pin } : item;
            })
        )
    };
    
    const handelMute = (id) => {
        setContacts(prev => 
            prev.map(item =>
                item.id === id ? { ...item, mute: !item.mute } : item
            )
        )
    };

    
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
                            {/* left part dp */}
                            <div className="position-relative">
                                <div className="avatar">
                                    <span className="text-white fw-bold">J</span>
                                </div>
                                {contact.online && <div className="online-indicator"></div>}
                            </div>

                            {/* right part info */}
                            <div className="flex-grow-1 ms-3">
                                {/* name & time */}
                                <div className="d-flex justify-content-between align-items-center">
                                    <h6 className="text-white mb-0">{contact.name}</h6>
                                    <div className="d-flex justify-content-between align-items-center">
                                        {/* icons */}
                                        {(contact.pin || contact.mute) && (
                                            <div className="d-flex gap-1 me-2">
                                                {contact.pin && (
                                                    <div
                                                        className="bg-primary rounded-circle d-flex align-items-center justify-content-center"
                                                        style={{ width: "23px", height: "23px" }}
                                                    >
                                                        <i className="bi bi-pin-angle-fill" style={{ marginTop: "1px" }}></i>
                                                    </div>
                                                )}
                                                {contact.mute && (
                                                    <div
                                                        className="bg-secondary rounded-circle d-flex align-items-center justify-content-center"
                                                        style={{ width: "23px", height: "23px" }}
                                                    >
                                                        <i className="bi bi-volume-mute-fill" style={{ marginTop: "1px" }}></i>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        <span className="time-text">{contact.time}</span>
                                    </div>
                                </div>

                                {/* short msg & action */}
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="message-preview mb-0">{contact.message}</p>

                                    {/* Dropdown Trigger */}
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-icon-sm mb-1"
                                            type="button"
                                            id={`dropdownMenuButton-${contact.id}`}
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            onClick={(e) => e.stopPropagation()} // prevent parent click
                                        >
                                            <FaEllipsisH className="icon-xs" />
                                        </button>

                                        {/* Dropdown Menu */}
                                        <ul
                                            className="dropdown-menu dropdown-menu-dark"
                                            aria-labelledby={`dropdownMenuButton-${contact.id}`}
                                            style={{ backgroundColor: "var(--color-border)" }}
                                        >
                                            <li><button className="dropdown-item" onClick={() => handelPin(contact.id)}>Pin</button></li>
                                            <li><button className="dropdown-item" onClick={() => handelMute(contact.id)}>Mute</button></li>
                                            <li><button className="dropdown-item">Info Group</button></li>
                                            <li><button className="dropdown-item text-danger">Leave Group</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </>
    )
}

export default GroupMessangerTab