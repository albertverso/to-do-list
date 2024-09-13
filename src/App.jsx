import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router';
import { getWakeUp, isTokenExpired, logout } from './services/authService';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [clientId, setClientd] = useState("")
  
  const oauth = async () => {
    try {
      await getWakeUp();
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
      if (!clientId) {
        return null
      }
      setClientd(clientId)
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (isTokenExpired()) {
      logout();
    }

    oauth()
  }, []);

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={clientId}>
        <AppRouter />
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App
