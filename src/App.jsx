import { Route, BrowserRouter , Routes } from 'react-router-dom'
import './App.css'
// Bootstrap Link
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Home } from './Pages/HomePage/Home'
import  Subscription  from './Pages/SubscriptionPage/Subscription'
import Login from './Pages/LoginPage/Login';
import Registration from './Pages/RegistrationPage/Registration';
import SecondRegistrationPage from './Pages/ScondRegistrationPage/SecondRegistrationPage';
import BusinessProfilePage from './Pages/BusinessProfilePage/BusinessProfilePage';
import Feed from './Pages/Front-screen-feed/Feed/Feed';
import Chat from './Pages/Chat/chat';
import ProfilePage from './Pages/profilePage/profilePage';

// Swiper js Css
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ViewsPage from './Pages/viewsPage/ViewsPage';
import OnlinePage from './Pages/Online/OnlinePage';
import HotDatePage from './Pages/HotDate/HotDatePage';
import CreateSpeeddatepage from './Pages/CreateSpeeddatepage/CreateSpeeddatepage';
import LiveStreamPage from './Pages/LiveStreamPage/LiveStreamPage';
import LiveAndChatroomPage from './Pages/LiveAndChatroomPage/LiveAndChatroomPage';
import ChatroomGroupPageList from './Pages/Chatroom/ChatroomGroupPageList';
import Chatroom from './Pages/Chatroom/Chatroom';
import CreateChatroomPage from './Pages/CreateChatroom/CreateChatroomPage';
import NewmembersPage from './Pages/NewmembersPage/NewmembersPage';
import PartiesAndEventPage from './Pages/PartiesAndEventPage/PartiesAndEventPage';
import PartiesAndEventInfo from './Pages/PartiesAndEventInfo/PartiesAndEventInfo';
import Search from './Pages/search/Search';
import AdvanceMemberSearch from './Pages/advance member search/AdvanceMemberSearch';
import TravelDatespage from './Pages/TravelDatespage/TravelDatespage';
// import CreateTravelDatePage from './Pages/CreateTravelDatePage/CreateTravelPage';
import LiveStreamCard from './components/Video Card/VideoCard';
import Videos from './Pages/videos/Videos';
import AddVideo from './Pages/Add Video/AddVideo';






function App() {


  return (
    <>
    {/* basename="/2-1_dating" */}
      <BrowserRouter >
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/subscription" element={<Subscription/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/second_registration" element={<SecondRegistrationPage/>}/>
        <Route path="/chat" element={<Chat/>}/>
        
        <Route path="/business_profile" element={<BusinessProfilePage/>}/>

        {/* Front-screen */}
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/view" element={<ViewsPage/>}/>
        <Route path="/online" element={<OnlinePage/>}/>
        <Route path="/hotdate" element={<HotDatePage/>}/>
        <Route path="/create-speeddate" element={<CreateSpeeddatepage/>}/>
        <Route path="/livestream" element={<LiveStreamPage/>}/>
        <Route path="/liveandchatroom" element={<LiveAndChatroomPage/>}/>
        <Route path="/chatrooms" element={<ChatroomGroupPageList/>}/>
        <Route path="/chatroom" element={<Chatroom/>}/>
        <Route path="/create_chatroom" element={<CreateChatroomPage/>}/>
        <Route path="/new-members" element={<NewmembersPage/>}/>
        <Route path="/messages" element={<Chat/>}/>
        <Route path="/events" element={<PartiesAndEventPage/>}/>
        <Route path="/event-info" element={<PartiesAndEventInfo/>}/>
        <Route path="/search" element={ <Search /> } />
        <Route path="/advance-search" element={<AdvanceMemberSearch />} />
        <Route path="/traveldate" element={<TravelDatespage />} />
        {/* <Route path="/createtraveldate" element={<CreateTravelDatePage />} /> */}
        
        <Route path="/videos" element={<Videos />} />

        <Route path="/add-video" element={ <AddVideo /> }/>

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
