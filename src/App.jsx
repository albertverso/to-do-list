import React from 'react'
import router from './router';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router';

function App() {
  return (
    <BrowserRouter>
        <AppRouter/>
    </BrowserRouter>
  )
}

export default App
