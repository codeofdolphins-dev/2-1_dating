// hooks/useWebSocket.js
import { useEffect, useContext } from 'react';
import WebSocketService from '../services/websocket';
import { AuthContext } from '../contexts/AuthContext';

export const useWebSocket = () => {
  const { token, user } = useContext(AuthContext);

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
