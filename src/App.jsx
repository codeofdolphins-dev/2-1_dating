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
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
