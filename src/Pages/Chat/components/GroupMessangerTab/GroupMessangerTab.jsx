import React, { useEffect, useState } from 'react'
import { FaPhone, FaVideo, FaEllipsisH, FaSlack } from 'react-icons/fa'
import { useAuth } from '../../../../context/AuthContextAPI';


const GroupMessangerTab = () => {
    const {setGroupMessageId,setGroupMessageName} = useAuth()

    const [selectedChat, setSelectedChat] = useState("");

    const [contacts, setContacts] = useState([
        {
            id: "64f3c1e7a9d8c2a5f1b9e301",
            name: "Travel Buddies",
            message: "Who’s ready for the next trip? 🏖️",
            time: "10min",
            online: true,
            unread: true,
            pin: true,
            mute: false
        },
        {
            id: "64f3c1e7a9d8c2a5f1b9e302",
            name: "Foodies Club",
            message: "Pizza party tonight! 🍕",
            time: "25min",
            online: false,
            unread: false,
            pin: false,
            mute: false
        },
        {
            id: "64f3c1e7a9d8c2a5f1b9e303",
            name: "Gym Squad",
            message: "Leg day tomorrow 💪",
            time: "1h",
            online: true,
            unread: false,
            pin: false,
            mute: true
        },
        {
            id: "64f3c1e7a9d8c2a5f1b9e304",
            name: "Study Group",
            message: "Assignment deadline coming soon 📚",
            time: "2h",
            online: true,
            unread: true,
            pin: false,
            mute: false
        },
        {
            id: "64f3c1e7a9d8c2a5f1b9e305",
            name: "Music Lovers",
            message: "Check out this new playlist 🎶",
            time: "5h",
            online: false,
            unread: false,
            pin: false,
            mute: false
        },
        {
            id: "64f3c1e7a9d8c2a5f1b9e306",
            name: "Movie Nights",
            message: "Which movie this weekend? 🎬",
            time: "1d",
            online: true,
            unread: false,
            pin: false,
            mute: false
        }
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

    setGroupMessageId(selectedChat)


    return (
        <>
            <div className="chat-list flex-grow-1 overflow-auto">
                {contacts.map((contact, index) => (
                    <div
                        key={contact.id}
                        className={`chat-item p-3 ${selectedChat === index ? "active" : ""}`}
                        onClick={() => {
                        setSelectedChat(contact?.id)
                        setGroupMessageName(contact?.name)
                        }}
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