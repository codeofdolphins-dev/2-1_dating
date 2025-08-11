import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import GlobalPageWrapper from '../../components/GlobalPageWrapper';
import FilterBar from '../../components/FilterBar/FilterBar';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showErrorToast, showSuccessToast } from '../../components/customToast/CustomToast';


const CreateChatroomPage = () => {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_BASE_URL;

    const [chatType, setChatType] = useState("");
    const [title, setTitle] = useState("");
    const [blockSingleMales, setBlockSingleMales] = useState(false);
    const [goingliveType, setGoingliveType] = useState("");



    const nagigatePrevPage = () => {
        navigate("/chatrooms");
    };
    const handleChange = (e) => {
        setChatType(e.target.value);
    };
    const handleGoingLiveType = (e) => {
        setGoingliveType(e.target.value);
    };

    const handleCreateChatroom = async () => {

        if (!chatType || !goingliveType || !title.trim()) {
            showErrorToast("Please fill in all required fields.");
            return;
        }

        try {
            const response = await axios.post(
                `${apiUrl}/chatrooms`,
                {
                    type: chatType,
                    name: title,
                    blockSingleMales: blockSingleMales,
                    goingLive: goingliveType
                },
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 201 || response.status === 200) {
                console.log(response)
                showSuccessToast(`${response?.data?.message}`);
                navigate("/chatrooms");
            }
        } catch (error) {
            console.error("Failed to create chatroom:", error);
            showErrorToast(`Please login again. ${error?.response?.data?.message || "An error occurred."}`);
        }

    };

    return (
        <>
            <ToastContainer />
            <div className='' style={{ backgroundColor: "var(--color-border)" }}>
                <GlobalPageWrapper>
                    <div className='container-fluid text-white' style={{ height: "100vh" }}>
                        {/* Header */}
                        <div className="d-flex align-items-center gap-2 text-white pt-5">
                            <i
                                className="bi bi-chevron-left fs-3"
                                style={{ cursor: "pointer" }}
                                onClick={nagigatePrevPage}
                            ></i>
                            <div className="fs-4 fw-semibold text-uppercase">
                                Personal Chatroom
                            </div>
                        </div>

                        {/* Description */}
                        <div className='mt-3'>
                            <p>
                                Create your own personal chatroom by choosing a topic of your liking or as a chatroom for a private event.
                                You can turn on or off the visibility of your chatroom and decide if your chatroom is accessible by anybody
                                or by invitation only. Once your chatroom is created you will receive a unique link to your chatroom to share
                                with other members (e.g. friends, group members, party guests). A chatroom will be closed 2 hours after the last
                                member has left or the chatroom being inactive.
                            </p>
                        </div>

                        {/* Type Selection */}
                        <div className="mt-5">
                            <p className="fw-semibold">Type</p>
                            <div className=" text-white  rounded">
                                <Form.Group>
                                    <div className="d-flex gap-4 mt-2">
                                        <Form.Check
                                            type="radio"
                                            id='public'
                                            label="Public Chatroom"
                                            name="chatroomType"
                                            value="public"
                                            onChange={handleChange}
                                            checked={chatType === "public"}
                                            className="text-white"
                                        />
                                        <Form.Check
                                            type="radio"
                                            id='private'
                                            label="Private Chatroom"
                                            name="chatroomType"
                                            value="private"
                                            onChange={handleChange}
                                            checked={chatType === "private"}
                                            className="text-white"
                                        />
                                        <Form.Check
                                            type="radio"
                                            id='secret'
                                            label="Secret Chatroom"
                                            name="chatroomType"
                                            value="secret"
                                            onChange={handleChange}
                                            checked={chatType === "secret"}
                                            className="text-white"
                                        />
                                    </div>
                                </Form.Group>
                            </div>
                        </div>

                        {/* Title Input */}
                        <div className='mt-5'>
                            <label className='fw-semibold mb-2' htmlFor='title'>Title</label>
                            <div className='' style={{ backgroundColor: "var(--color-border)" }}>
                                <input
                                    type="text"
                                    id='title'
                                    className='w-50 rounded-pill py-2 px-4 border border-white text-white'
                                    style={{ backgroundColor: "var(--color-border)" }}
                                    placeholder='Chatroom Title, max 30 Characters'
                                    maxLength={30}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Block Single Males */}
                        <div className='d-flex gap-3 mt-4'>
                            <div>
                                <input
                                    type="checkbox"
                                    id='blockM'
                                    name="male-blocked"
                                    checked={blockSingleMales}
                                    onChange={(e) => setBlockSingleMales(e.target.checked)}
                                />
                            </div>
                            <div>
                                <label htmlFor='blockM'>Block Single Males from entering the chatroom</label>
                            </div>
                        </div>

                        {/* Going Live */}
                        <div className='mt-5'>
                            <p className='fw-semibold'>Going Live</p>
                            <Form.Group>
                                <div className="d-flex gap-4 mt-2">
                                    <Form.Check
                                        type="radio"
                                        id='now'
                                        label="ChatNow"
                                        name="ChatNow"
                                        value="now"
                                        onChange={handleGoingLiveType}
                                        checked={goingliveType === "now"}
                                        className="text-white"
                                    />
                                    <Form.Check
                                        type="radio"
                                        id='later'
                                        label="Chat later"
                                        name="ChatLater"
                                        value="later"
                                        onChange={handleGoingLiveType}
                                        checked={goingliveType === "later"}
                                        className="text-white"
                                    />
                                </div>
                            </Form.Group>
                        </div>

                        {/* Create Button */}
                        <div className='mt-5'>
                            <button
                                className="border-0 custom-button  rounded-pill py-2 px-4"
                                onClick={handleCreateChatroom}
                            >
                                Create Chatroom
                            </button>
                        </div>

                    </div>
                </GlobalPageWrapper>
            </div>
        </>
    );
};

export default CreateChatroomPage;
