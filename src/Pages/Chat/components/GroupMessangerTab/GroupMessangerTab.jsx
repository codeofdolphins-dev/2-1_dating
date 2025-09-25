import React, { useEffect, useState } from 'react'
import { FaPhone, FaVideo, FaEllipsisH, FaSlack } from 'react-icons/fa'
import { useAuth } from '../../../../context/AuthContextAPI';
import httpService from '../../../../helper/httpService';


const GroupMessangerTab = () => {
    const {setGroupMessageId,groupMessageId,setGroupMessageName} = useAuth()

    const [selectedChat, setSelectedChat] = useState("");

    const [groups, setGroups] = useState([]);


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

    useState(()=>{
      httpService("/groups/my-groups","GET")
      .then((res)=>{
          console.log("groups",res?.data?.groups?.name)
          setGroups(res?.data?.groups)
      })
      .catch((err)=>{
        console.log(err)
      })
    },[])

  console.log("groupIdpppppppppppp",selectedChat)
    return (
        <>
            <div className="chat-list flex-grow-1 overflow-auto">
                {groups.map((contact, index) => (
                    <div
                        key={contact.id}
                        className={`chat-item p-3 ${selectedChat === index ? "active" : ""}`}
                        onClick={() => {
                        setSelectedChat(contact?.group?._id)
                        
                        setGroupMessageName(contact?.group?.name)
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
                                    <h6 className="text-white mb-0">{contact?.group?.name}</h6>
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
                                    <p className="message-preview mb-0">{contact.message || "Click to start message"}</p>

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