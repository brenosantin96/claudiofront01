import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginPage from './pages/LoginPage';
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from "./pages/MainPage";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='/main' element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
