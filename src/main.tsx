import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginPage from './pages/LoginPage';
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from "./pages/MainPage";
import { ObrasPage } from './pages/ObrasPage';
import { FacturasPage } from './pages/FacturasPage';
import { ProvedoresPage } from './pages/ProvedoresPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='/main' element={<Main />}></Route>
        <Route path='/obras' element={<ObrasPage />}></Route>
        <Route path='/facturas' element={<FacturasPage />}></Route>
        <Route path='/provedores' element={<ProvedoresPage />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
