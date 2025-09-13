import { Route, BrowserRouter, Routes } from 'react-router-dom'
// Bootstrap Link
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Home } from './Pages/HomePage/Home'
import Subscription from './Pages/SubscriptionPage/Subscription'
import Login from './Pages/LoginPage/Login';
import Registration from './Pages/RegistrationPage/Registration';
import SecondRegistrationPage from './Pages/ScondRegistrationPage/SecondRegistrationPage';
import BusinessProfilePage from './Pages/BusinessProfilePage/BusinessProfilePage';
import Feed from './Pages/Front-screen-feed/Feed/Feed';
// import Chat from './Pages/Chat/Chat';

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
import CreateTravelDatePage from './Pages/CreateTravelDatePage/CreateTravelPage';
import CertificationPage from './Pages/certificationPage/CertificationPage';
import LiveStreamCard from './components/Video Card/VideoCard';
import Videos from './Pages/videos/Videos';
import AddVideo from './Pages/Add Video/AddVideo';
import WallOfFramePage from './Pages/WallOfFramePage/WallOfFramePage';
import ProfilePage from './Pages/profilePage/ProfilePage';
import GroupsPage from './Pages/GroupsPage/GroupsPage';
import MyGroupsPage from './Pages/MyGroupsPage/MyGroupsPage';
import FeaturedMembers from './Pages/Featured-Members/FeaturedMembers';
import AddmePage from './Pages/FeaturedMembers-add-me-page/AddmePage';
import Contests from './Pages/Contests/Contests';
import VacationRentalPage from './Pages/VacationRental/VacationRentalPage';
import { ToastContainer } from 'react-toastify';
import CreateTravelPlan from './Pages/Create Travel Plan/CreateTravelPlan';
import PartiesEventsClub from './Pages/Parties&EventsClub/PartiesEventsClub';
import './App.css'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import VacationsRentalDetails from './Pages/VacationsRentalDetails/VacationsRentalDetails';
import TwoPlusOne from './Pages/2+1/TwoPlusOne';
import InviteFriend from './Pages/InviteFriend/InviteFriend';
import CurrentUserProfile from './Pages/CurrentUserProfile/CurrentUserProfile';
import ProfileAccount from './Pages/Profile Account/ProfileAccount';
import NotFoundPage from './Pages/404NotFound/NotFoundPage';
import ProfileFriendsPage from './Pages/profileFriends/ProfileFriendsPage';
import WhoIViewedPage from './Pages/whoIViewed/WhoIViewedPage';
import ProfileLocation from './Pages/profileLocation/ProfileLocation';
import ProfileBlocklist from './Pages/ProfileBlocklist/ProfileBlocklist';
import Notes from './Pages/Notes/Notes';
import ProfileRecomended from './Pages/ProfileRemembered/ProfileRemembered';
import Privacy from './Pages/Privacy/Privacy';
import LikeDislike from './Pages/LikeDislike/LikeDislike';
import ProfileMemberService from './Pages/ProfileMemberService/ProfileMemberService';
import BugReport from './Pages/BugReport/BugReport';
import HideProfile from './Pages/HideProfile/HideProfile';
import ContactAndHelp from './Pages/ContactAndHelp/ContactAndHelp';
import ChatComponent from './services/ChatComponent';
import CreatePrivateParty from './Pages/CreatePrivateParty/CreatePrivateParty';
import ProfileRemembered from './Pages/ProfileRemembered/ProfileRemembered';
import OtherUserFriendListpage from './Pages/OtherUserFriendListpage/OtherUserFriendListpage';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContextAPI';
import WebSocketService from './services/websocket';
import IndividualGroup from './Pages/IndividualGroup/IndividualGroup';
import Chat from './Pages/Chat/Chat';








function App() {
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      WebSocketService.connect(token);
    }

    return () => {
      WebSocketService.disconnect();
    };
  }, [token]);


  return (
    <>
      

      {/* basename="/2-1_dating" */}

      {/* Secure route now removed later it will be added */}
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/second_registration" element={<SecondRegistrationPage />} />
          <Route path="/chat" element={<Chat />} />

          <Route path="/business_profile" element={<BusinessProfilePage />} />

          {/* Front-screen */}
          <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
          <Route path="/profile/:userId" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/view" element={<ProtectedRoute><ViewsPage /></ProtectedRoute>} />
          <Route path="/online" element={<ProtectedRoute><OnlinePage /></ProtectedRoute>} />
          <Route path="/hotdate" element={<ProtectedRoute><HotDatePage /></ProtectedRoute>} />
          <Route path="/create-speeddate" element={<ProtectedRoute><CreateSpeeddatepage /></ProtectedRoute>} />
          <Route path="/livestream" element={<ProtectedRoute><LiveStreamPage /></ProtectedRoute>} />
          <Route path="/liveandchatroom" element={<ProtectedRoute><LiveAndChatroomPage /></ProtectedRoute>} />
          <Route path="/chatrooms" element={<ProtectedRoute><ChatroomGroupPageList /></ProtectedRoute>} />
          <Route path="/chatroom" element={<ProtectedRoute><Chatroom /></ProtectedRoute>} />
          <Route path="/create_chatroom" element={<ProtectedRoute><CreateChatroomPage /></ProtectedRoute>} />
          <Route path="/new-members" element={<ProtectedRoute><NewmembersPage /></ProtectedRoute>} />
          <Route path="/messages" element={<ProtectedRoute > <Chat /> </ProtectedRoute>} />
          <Route path="/events" element={<ProtectedRoute > <PartiesAndEventPage /> </ProtectedRoute>} />
          <Route path="/event-info" element={<ProtectedRoute><PartiesAndEventInfo /> </ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><Search /> </ProtectedRoute>} />
          <Route path="/advance-search" element={<ProtectedRoute><AdvanceMemberSearch /> </ProtectedRoute>} />
          <Route path="/traveldate" element={<ProtectedRoute><TravelDatespage /> </ProtectedRoute>} />
          <Route path="/createtraveldate" element={<ProtectedRoute ><CreateTravelDatePage /> </ProtectedRoute>} />
          <Route path="/certifications" element={<ProtectedRoute><CertificationPage /> </ProtectedRoute>} />
          <Route path="/videos" element={<ProtectedRoute><Videos /> </ProtectedRoute>} />
          <Route path="/add-video" element={<ProtectedRoute><AddVideo /> </ProtectedRoute>} />
          <Route path="/wall-of-fame" element={<ProtectedRoute><WallOfFramePage /></ProtectedRoute>} />
          <Route path="/groups" element={<ProtectedRoute><GroupsPage /></ProtectedRoute>} />
          <Route path="/my-groups" element={<ProtectedRoute><MyGroupsPage /></ProtectedRoute>} />
          <Route path="/featured-members" element={<ProtectedRoute><FeaturedMembers /></ProtectedRoute>} />
          <Route path="/add-me" element={<ProtectedRoute><AddmePage /></ProtectedRoute>} />
          <Route path="/contests" element={<ProtectedRoute><Contests /></ProtectedRoute>} />
          <Route path="/add-vacations-rental" element={<ProtectedRoute><VacationRentalPage /></ProtectedRoute>} />
          <Route path="/create-travel-plan" element={<ProtectedRoute><CreateTravelPlan /></ProtectedRoute>} />
          <Route path="/parties-events-club" element={<PartiesEventsClub />} />
          <Route path="/vacations-rental-details" element={<VacationsRentalDetails />} />
          <Route path="/two-plus-one" element={<TwoPlusOne />} />
          <Route path="/invite-friend" element={<ProtectedRoute><InviteFriend /></ProtectedRoute>} />
          <Route path="/profile-account" element={<ProtectedRoute> <ProfileAccount /> </ProtectedRoute>} />
          <Route path="/profile-friends" element={<ProtectedRoute> <ProfileFriendsPage /> </ProtectedRoute>} />
          <Route path="/profile-views" element={<ProtectedRoute> <WhoIViewedPage /> </ProtectedRoute>} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/location" element={<ProtectedRoute> <ProfileLocation /> </ProtectedRoute>} />
          <Route path="/current-user-profile" element={<ProtectedRoute> <CurrentUserProfile /> </ProtectedRoute>} />

          <Route path="/blocklist" element={<ProtectedRoute> <ProfileBlocklist /> </ProtectedRoute>} />
          <Route path="/notes" element={<ProtectedRoute> <Notes /> </ProtectedRoute>} />
          <Route path="/remembered" element={<ProtectedRoute> <ProfileRemembered /> </ProtectedRoute>} />


          <Route path="/privacy" element={<ProtectedRoute> <Privacy /> </ProtectedRoute>} />
          <Route path="/profile-like-dislike" element={<ProtectedRoute> <LikeDislike /> </ProtectedRoute>} />
          <Route path="/profile-member-service" element={<ProtectedRoute> <ProfileMemberService /> </ProtectedRoute>} />
          <Route path="/bug-report" element={<ProtectedRoute> <BugReport /> </ProtectedRoute>} />
          <Route path="/hide-profile" element={<ProtectedRoute> <HideProfile /> </ProtectedRoute>} />
          <Route path="/contact-and-help" element={<ProtectedRoute> <ContactAndHelp /> </ProtectedRoute>} />
          <Route path="/test-chat" element={<ProtectedRoute> <ChatComponent /> </ProtectedRoute>} />

          <Route path="/create-private-party" element={<ProtectedRoute> <CreatePrivateParty /> </ProtectedRoute>} />
          <Route path="/other-user-friendlist" element={<ProtectedRoute> <OtherUserFriendListpage /> </ProtectedRoute>} />
          <Route path="/individual-group" element={<ProtectedRoute> <IndividualGroup /> </ProtectedRoute>} />

        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
  )
}

export default App
