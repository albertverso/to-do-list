import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router';
import { isTokenExpired, logout } from './services/authService';

function App() {
  useEffect(() => {
    if (isTokenExpired()) {
      logout();
    }
  }, []);

  return (
    <BrowserRouter>
        <AppRouter/>
    </BrowserRouter>
  )
}

export default App
