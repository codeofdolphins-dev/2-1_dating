import React, { useEffect, useState } from 'react';
import GlobalPageWrapper from '../../components/GlobalPageWrapper';
import FilterBar from '../../components/FilterBar/FilterBar';
import ChatroomCard from '../../components/ChatroomCard/ChatroomCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { showErrorToast } from '../../components/customToast/CustomToast';

// toast.configure(); // Only needed once, typically at the root of your app


const ChatroomGroupPageList = () => {
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState([]);

  const apiUrl = import.meta.env.VITE_BASE_URL;

  const handleToAnotherPage = () => {
    navigate("/create_chatroom");
  };

  const handlEtakeToChatRoom = async (card) => {
    const token = sessionStorage.getItem('jwtToken');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    try {
      // Try to join the chatroom
      await axios.post(`${apiUrl}/chatrooms/${card._id}/join`, {}, config);

      toast.success('User joined successfully', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });

      // Optimistically update participants
      setChatRooms(prevRooms =>
        prevRooms.map(room =>
          room._id === card._id
            ? { ...room, participants: [...room.participants, { _id: 'temp-user' }] }
            : room
        )
      );

      // Try fetching latest chatroom data
      const { data } = await axios.get(`${apiUrl}/chatrooms/${card._id}`, config);      

      // Navigate with updated chatroom info
      navigate('/chatroom', { state: data.data });

    } catch (error) {
      console.error('Chatroom Join or Fetch Failed:', error);
      // Navigate with fallback info
      navigate('/chatroom', { state: card });
    }
  };



  // ChatRooms fetch API (Get all Chatroom API)
  useEffect(() => {
    axios.get(`${apiUrl}/chatrooms`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
      }
    })
      .then(res => {
        if (res.status === 200) {
          console.log(res?.data?.data)
          setChatRooms(res?.data?.data);
        }
      })
      .catch(err => {
        console.error("Failed to fetch chatrooms:", err);
        showErrorToast(`Please login again. ${err?.response?.data?.message || "An error occurred."}`);
      });
  }, []);

  return (
    <GlobalPageWrapper>
      {/* <ToastContainer /> */}
      <FilterBar pageName={"Chatrooms"} navigationPageName2={"Chatroom"} navigationToAnotherPage2={handleToAnotherPage} />
      <div className="client-page-background mt-1 pb-4" style={{minHeight:"100vh"}}>
        <div className="container-fluid">
          <div className="row g-4 justify-content-left px-2">
            {chatRooms.map((room, index) => (
              <div
                className="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center"
                style={{ marginBottom: "-25px", padding: "5px" }}
                key={room._id}
              >
                <ChatroomCard
                  groupId={room._id}
                  title={room.name}
                  members={room.participants.length}
                  handlEtakeToChatRoom={() => handlEtakeToChatRoom(room)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer/>
    </GlobalPageWrapper>
  );
};

export default ChatroomGroupPageList;

