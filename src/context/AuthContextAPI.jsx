// contexts/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import WebSocketService from "../services/websocket";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [showNotification, setShowNotification] = useState("feed");
  const [userNameFromFriendListPage, setUserNameFromFriendListPage] = useState("");
  const [userNameFromFriendList, setUserNameFromFriendList] = useState([]);
  const [filterOption, setFilterOption] = useState("");
  const [messagereceiverId, setMessageReceiverId] = useState("")
  const [messagereceiverName, setMessageReceiverName] = useState("")
  const [groupMessageId, setGroupMessageId] = useState("")
  const [groupMessageName, setGroupMessageName] = useState("")
  const [globalToggle,setGlobalToggle] = useState(false)
  const [razorPayInfo,setResorPayInfo]=useState({})
  const [messageSenderName,setMessageSenderName] = useState("")

  // Restore from localStorage on reload
  useEffect(() => {
    const savedToken = localStorage.getItem("jwtToken");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  

  // Login
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("jwtToken", jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Registration
  const registration = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("jwtToken", jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
    console.log("authcontext registration user", userData, jwtToken);
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
  };

  const setNotificationHandler = () => {
    setShowNotification("notification");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        showNotification,
        login,
        registration,
        logout,
        setNotificationHandler,
        filterOption,
        setFilterOption,
        userNameFromFriendListPage,
        setUserNameFromFriendListPage,
        userNameFromFriendList,
        setUserNameFromFriendList,

        setMessageReceiverId,
        messagereceiverId,

        setMessageReceiverName,
        messagereceiverName,

        setMessageSenderName,
        messageSenderName,

        groupMessageId,
        setGroupMessageId,

        groupMessageName,
        setGroupMessageName,

        globalToggle,
        setGlobalToggle,

        razorPayInfo,
        setResorPayInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}



// Custom Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
