import { Route, BrowserRouter , Routes } from 'react-router-dom'
import './App.css'
import { Home } from './HomePage/Home'

// Bootstrap Link
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';



function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
