import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginPage from './pages/LoginPage';
import './index.css'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  </React.StrictMode>
)
