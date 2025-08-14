import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GlobalPageWrapper from '../../components/GlobalPageWrapper';
import ChatRoomPersoncard from '../../components/ChatroomCard/ChatRoomPersoncard';

import coupleImg1 from "../../assets/cardImgs/Images/Img.png"
import ChatroomChatBox from '../../components/ChatroomChatBox/ChatroomChatBox';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showErrorToast, showSuccessToast } from '../../components/customToast/CustomToast';



const Chatroom = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_BASE_URL;


    const [chatRoom, setChatRoom] = useState("");
    const [stateChanger, setStateChanger] = useState(false)

    const room_id = location?.state?._id

    useEffect(() => {
        axios({
            method: 'get',
            url: `${apiUrl}/chatrooms/${room_id}`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
            },
        })
            .then((res) => {
                setChatRoom(res.data.data)
            })
            .catch((error) => { })

    }, [room_id, stateChanger, apiUrl]);


    const nagigatePrevPage = () => {
        navigate("/chatrooms");
    };

    const handleLeave = () => {
        axios({
            method: "post",
            url: `${apiUrl}/chatrooms/${room_id}/leave`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
            }
        })
            .then(res => {
                if (res.data.success) {
                    showSuccessToast(res.data.message || "You left the room");

                    // Small delay so toast is visible before redirect
                    setTimeout(() => {
                        navigate("/chatrooms");
                    }, 500);

                    setStateChanger(false); // ✅ Correct state update
                }
            })
            .catch((err) => {
                showErrorToast("Failed to leave the room");
            });

        //remove live status 
        axios({
            method: "post",
            url: `${apiUrl}/chatrooms/${room_id}/live`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
            },
            data: {
                "action": "end"
            }
        })
            .then(res => {
                if (res.data.success) {
                    console.log("chatroom live status", res)
                    showSuccessToast("Chatroom lived")
                    setStateChanger(!stateChanger)
                }
            })
            .catch((err) => {
                console.log("chatroom live status", err)
                showErrorToast("Chatroom lived")
                setStateChanger(!stateChanger)
            })
    };


    const handleChatRoomLive = () => {
        axios({
            method: "post",
            url: `${apiUrl}/chatrooms/${room_id}/live`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
            },
            data: {
                "action": "start"
            }
        })
            .then(res => {
                if (res.data.success) {
                    console.log("chatroom live status", res)
                    showSuccessToast("Chatroom lived")
                    setStateChanger(!stateChanger)
                }
            })
            .catch((err) => {
                console.log("chatroom live status", err)
                showErrorToast("Chatroom lived")
                setStateChanger(!stateChanger)
            })
    }

    console.log(chatRoom)
    return (
        <div className='mt-5' style={{ backgroundColor: "var(--color-border)", minHeight: "100vh" }}>
            <ToastContainer />
            <GlobalPageWrapper />

            <div className='container-fluid'>
                <div className='row'>
                    <div className="col-lg-8 mt-5">
                        <div className="d-flex justify-content-between align-items-center">
                            {/* Left section: Back + Title + Members */}
                            <div className="d-flex align-items-center gap-2 text-white">
                                <i
                                    className="bi bi-chevron-left fs-3"
                                    style={{ cursor: "pointer" }}
                                    onClick={nagigatePrevPage}
                                ></i>
                                <div className="fs-4 fw-semibold text-uppercase">{chatRoom?.name} <span className="fw-normal" style={{ color: "var(--color-primary-green)" }}>| {chatRoom?.participants?.length}</span>
                                </div>
                            </div>

                            {/* Right section: Buttons */}
                            <div className="d-flex align-items-center gap-3">
                                <button
                                    className="btn bg-white text-danger btn-sm rounded-pill px-3"
                                    onClick={handleLeave}
                                >
                                    Leave Room
                                </button>
                                {
                                    chatRoom.isLive === false && <button className="btn btn-danger btn-sm rounded-pill px-3" onClick={handleChatRoomLive}>
                                        Go Live Now
                                    </button>
                                }

                                <div className="d-flex align-items-center gap-1">
                                    <label className="text-white small me-1">Sort by:</label>
                                    <select className="form-select form-select-sm text-white" style={{ width: "120px", backgroundColor: "var(--color-border)", border: "2px solid white" }}>
                                        <option>Distance</option>
                                        <option>Newest</option>
                                        <option>Popular</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between mt-3'>
                            <div className='text-white fs-5 pl-5'>
                                &nbsp; &nbsp; &nbsp; &nbsp; {chatRoom?.createdBy?.username}
                            </div>
                            <button className="btn btn-outline-light btn-sm rounded-pill px-3">
                                Report
                            </button>
                        </div>
                        <div className='mt-5'>
                            <div className="container-fluid client-page-background overflow-auto" style={{ height: "555px" }}>
                                <div className="row g-2 py-2 d-flex ">
                                    {
                                        chatRoom?.participants?.map((card, index) => (
                                            <div className="col-12 col-sm-6 col-lg-6 col-xl-3 d-flex justify-content-center mb-2" key={index}>
                                                <ChatRoomPersoncard image={coupleImg1} code={card.username} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 mt-5'>
                        <ChatroomChatBox room_id={room_id}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatroom;
