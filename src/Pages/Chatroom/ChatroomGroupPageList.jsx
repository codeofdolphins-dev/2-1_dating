import React, { useEffect, useState } from 'react';
import GlobalPageWrapper from '../../components/GlobalPageWrapper';
import FilterBar from '../../components/FilterBar/FilterBar';
import ChatroomCard from '../../components/ChatroomCard/ChatroomCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// toast.configure(); // Only needed once, typically at the root of your app


const ChatroomGroupPageList = () => {
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState([]);

  const apiUrl = import.meta.env.VITE_BASE_URL;

  const handleToAnotherPage = () => {
    navigate("/create_chatroom");
  };

  const handlEtakeToChatRoom = (card) => {
    axios.post(`${apiUrl}/chatrooms/${card._id}/join`, {}, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        toast.success('User joined successfully', {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });

        // Update participants locally by adding a dummy user (or ideally fetch from API)
        setChatRooms(prevRooms =>
          prevRooms.map(room =>
            room._id === card._id
              ? { ...room, participants: [...room.participants, { _id: 'temp-user' }] }
              : room
          )
        );

        navigate("/chatroom", { state: card });
      })
      .catch((err) => {
        // const message = err?.response?.data?.message || 'Failed to join chatroom';

        console.log(err);
        toast.error("message error", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });

        // alert(message);
        // toast.success('Failed to join chatroom', {
        //   position: "top-right",
        //   autoClose: 3000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   theme: "colored",
        // });
        setTimeout(() => {
          navigate("/chatroom", { state: card });
        }, [200])
      });
  };

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
      });
  }, []);

  return (
    <GlobalPageWrapper>
      {/* <ToastContainer /> */}
      <FilterBar navigationPageName2={"Chatroom"} navigationToAnotherPage2={handleToAnotherPage} />
      <div className="client-page-background mt-1 pb-4">
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
    </GlobalPageWrapper>
  );
};

export default ChatroomGroupPageList;

