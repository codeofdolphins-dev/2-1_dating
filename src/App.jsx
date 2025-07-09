import { Route, BrowserRouter , Routes } from 'react-router-dom'
import './App.css'
import { Home } from './HomePage/Home'
import  Subscription  from './SubscriptionPage/Subscription'

// Bootstrap Link
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Login from './LoginPage/Login';
import Registration from './RegistrationPage/Registration';




function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/subscription" element={<Subscription/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registration" element={<Registration/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
