import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./context/AuthContextAPI.jsx";

createRoot(document.getElementById('root')).render(
    <AuthProvider>
    <App />
    </AuthProvider>
)
