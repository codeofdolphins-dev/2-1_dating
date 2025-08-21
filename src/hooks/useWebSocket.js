// hooks/useWebSocket.js
import { useEffect } from 'react';
import WebSocketService from '../services/websocket';
import { useAuth } from '../context/AuthContextAPI';

export const useWebSocket = () => {
  const { user,token } = useAuth();
  console.log("current user Id",user?.data?.user?._id)

  useEffect(() => {
    if (token && user) {
      // Connect when user is authenticated
      WebSocketService.connect(token);

      return () => {
        // Cleanup on unmount
        WebSocketService.disconnect();
      };
    }
  }, [token, user]);

  return WebSocketService;
};
