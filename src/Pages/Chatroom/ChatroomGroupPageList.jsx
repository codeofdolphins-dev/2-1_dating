import React from 'react';
import GlobalPageWrapper from '../../components/GlobalPageWrapper';
import FilterBar from '../../components/FilterBar/FilterBar';
import ChatroomCard from '../../components/ChatroomCard/ChatroomCard';
import { useNavigate } from 'react-router-dom';

const cards = [
  { title: "General Chat", members: 74 },
  { title: "Music Lovers", members: 58 },
  { title: "Tech Talk", members: 91 },
  { title: "Gaming Room", members: 112 },
  { title: "Study Buddies", members: 45 },
  { title: "Movie Night", members: 67 },
  { title: "Fitness Freaks", members: 36 },
  { title: "Travel Stories", members: 28 },
  { title: "Book Club", members: 52 },
  { title: "Anime Zone", members: 86 },
  { title: "Pet Lovers", members: 33 },
  { title: "Mental Health", members: 49 },
  { title: "Photography Club", members: 60 },
  { title: "Crypto Crew", members: 39 },
  { title: "Startup Hub", members: 71 },
];



const ChatroomGroupPageList = () => {
  const navigate = useNavigate()
   const handlEtakeToChatRoom=(card)=>{
     navigate("/chatroom",{state:card})
  }
  return (
    <GlobalPageWrapper>
      <FilterBar pageName={"Chatroom"} filterName1={"chatroom"}/>
      <div className="client-page-background mt-1 pb-4">
        <div className="container-fluid">
          <div className="row g-4 justify-content-left px-2">
            {cards.map((card, index) => (
              <div className="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center" style={{marginBottom:"-25px",padding:" 5px"}} key={index}>
                <ChatroomCard title={card.title} members={card.members} handlEtakeToChatRoom={()=>handlEtakeToChatRoom(card)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlobalPageWrapper>
  );
};

export default ChatroomGroupPageList;
