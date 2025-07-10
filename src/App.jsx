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
import Feed from './Pages/Front-screen/Feed/feed';




function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/subscription" element={<Subscription/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/second_registration" element={<SecondRegistrationPage/>}/>
        
        <Route path="/business_profile" element={<BusinessProfilePage/>}/>

        {/* Front-screen */}
        <Route path="/feed" element={<Feed/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
