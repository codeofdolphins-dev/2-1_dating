// contexts/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from "react";

// Create Context
const AuthContext = createContext();

// Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Restore from localStorage when page reloads
  useEffect(() => {
    const savedToken = localStorage.getItem("jwtToken");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // for logIn data
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("jwtToken", jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  //For registration data
   const registration = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("jwtToken", jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
    console.log("authcontext regsitartion user",user,token)
  };

  //For logout data
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
  };

  const dataSend = () =>{
    return user,token
  }

  return (
    <AuthContext.Provider value={{ user, token,dataSend, login,registration, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook (must be outside the component)
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
