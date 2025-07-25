import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import GlobalPageWrapper from '../../components/GlobalPageWrapper';
import FilterBar from '../../components/FilterBar/FilterBar';

const CreateChatroomPage = () => {
    const [chatType, setChatType] = useState("");
    const [goingliveType, setGoingliveType] = useState("");
    const navigate = useNavigate();

    const nagigatePrevPage = () => {
        navigate("/chatroom");
    };

    const handleChange = (e) => {
        setChatType(e.target.value);
    };

    const handleGoingLiveType = (e) => {
        setGoingliveType(e.target.value)
    }

    return (
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
                                        label="Public Chatroom"
                                        name="chatroomType"
                                        value="public"
                                        onChange={handleChange}
                                        checked={chatType === "public"}
                                        className="text-white"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Private Chatroom"
                                        name="chatroomType"
                                        value="private"
                                        onChange={handleChange}
                                        checked={chatType === "private"}
                                        className="text-white"
                                    />
                                    <Form.Check
                                        type="radio"
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

                    <div className='mt-5'>
                        <p className='fw-semibold'>Title</p>
                        <div className=' ' style={{ backgroundColor: "var(--color-border)" }}>
                            <input type="text" className='w-50 rounded-pill p-2 border border-white text-white ' style={{ backgroundColor: "var(--color-border)" }} placeholder='Chatroom Title, max 30 Characters' />
                        </div>
                    </div>

                    <div className='d-flex gap-3 mt-4'>
                        <div>
                            <input type="checkbox" name="male-blocked" id="" height={20} />
                        </div>
                        <div>
                            <p>Block Single Males from entering the chatroom</p>
                        </div>
                    </div>

                    <div className='mt-5'>
                        <p className='fw-semibold'>Going Live</p>
                        <Form.Group>
                            <div className="d-flex gap-4 mt-2">
                                <Form.Check
                                    type="radio"
                                    label="ChatNow"
                                    name="ChatNow"
                                    value="Chat now"
                                    onChange={handleGoingLiveType}
                                    checked={goingliveType === "Chat now"}
                                    className="text-white"
                                />
                                <Form.Check
                                    type="radio"
                                    label="Chat later"
                                    name="ChatLater"
                                    value="Chat later"
                                    onChange={handleGoingLiveType}
                                    checked={goingliveType === "Chat later"}
                                    className="text-white"
                                />
                            </div>
                        </Form.Group>
                    </div>

                    <div className='mt-5'>
                        <button className="border-0 custom-button  rounded-pill py-2 px-4">
                            Create Chatroom
                        </button>
                    </div>

                </div>
            </GlobalPageWrapper>
        </div>
    );
};

export default CreateChatroomPage;
