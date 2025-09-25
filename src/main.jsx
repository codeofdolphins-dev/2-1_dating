import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContextAPI.jsx";
import { ChatSocketProvider } from "./context/ChatSocketContext.jsx";


createRoot(document.getElementById("root")).render(
   <>
    <AuthProvider>
        <ChatSocketProvider>
        <App />
        </ChatSocketProvider>
    </AuthProvider>
   </>
  
);
